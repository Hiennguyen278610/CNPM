'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuLeftHead from '@/app/order/components/menuLeftHead';
import GridProduct from '@/app/order/components/gridProduct';
import MenuSlider from '@/app/order/components/menuSlider';
import MenuRightHead from '@/app/order/components/menuRightHead';
import CartList from '@/app/order/components/cartList';
import CartFooter from '@/app/order/components/cartFooter';
import '@/app/globals.css';
import { cartService } from '@/app/order/services/cart.service';

export default function OrderLayout() {
    const router = useRouter();
    const [update, setUpdate] = useState(0);
    const [selectedType, setSelectedType] = useState('All');

    const table = JSON.parse(localStorage.getItem('currentTable') || '{}');
    const tableNameLocal = table.tableName || 'Bàn số 0';

    const cartItems = cartService.getCart();
    const totalPrice = cartService.getTotal();
    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleAddToCart = (item: any) => {
        const dish = item.dish || item;
        const quantity = item.quantity || 1;
        const selectedOptions = item.selectedOptions || [];
        console.log('Handling add to cart:', { dish, quantity, selectedOptions });
        try {
            cartService.addToCart(dish, quantity, selectedOptions);
            setUpdate(u => u + 1);
        } catch (err) {
            console.error('Error adding to cart:', err);
            alert(`Lỗi khi thêm món vào giỏ hàng: err`);
        }
    };

    const handleIncrement = (index: number) => {
        const cart = cartService.getCart();
        if (index >= 0 && index < cart.length) {
            cartService.updateQuantity(index, cart[index].quantity + 1);
            setUpdate(u => u + 1);
        }
    };

    const handleDecrement = (index: number) => {
        const cart = cartService.getCart();
        if (index >= 0 && index < cart.length) {
            if (cart[index].quantity > 1) {
                cartService.updateQuantity(index, cart[index].quantity - 1);
            } else {
                cartService.removeFromCart(index);
            }
            setUpdate(u => u + 1);
        }
    };

    const handleDelete = (index: number) => {
        const cart = cartService.getCart();
        if (index >= 0 && index < cart.length) {
            cartService.removeFromCart(index);
            setUpdate(u => u + 1);
        }
    };

    const handleOrder = async () => {
        const cartItems = cartService.getCart();
        if (!cartItems.length || cartService.getTotal() <= 0) {
            alert('Giỏ hàng trống hoặc tổng giá trị không hợp lệ!');
            return;
        }

        const customerID = '681ce5d685a510c2b8897dd9';
        const tableID = '681ce60f85a510c2b8897ddb';

        try {
            const orderBody = {
                customerID,
                tableID,
                orderStatus: 0,
                totalPrice: cartService.getTotal(),
            };
            // const orderRes = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_PORT_BACK_END}/backend/api/order`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(orderBody),
            // });
            const orderRes = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderBody),
            });

            if (!orderRes.ok) {
                const errText = await orderRes.text();
                alert(`Tạo order thất bại! ${orderRes.status} - ${errText}`);
                return;
            }

            const orderResponse = await orderRes.json();
            const orderId = orderResponse.id || orderResponse._id;
            if (!orderId || !/^[0-9a-fA-F]{24}$/.test(orderId)) {
                alert('Không nhận được orderId hợp lệ từ server!');
                return;
            }

            const failedItems: string[] = [];
            for (const item of cartItems) {
                if (!item.dish._id || !/^[0-9a-fA-F]{24}$/.test(item.dish._id)) {
                    failedItems.push(`${item.dish.dishName}: Invalid dish ID`);
                    continue;
                }

                const optionsArr = item.selectedOptions.map(opt => opt._id || '').filter(id => id) || [];
                const detailBody = {
                    order: orderId,
                    dish: item.dish._id,
                    quantity: item.quantity,
                    options: optionsArr,
                };

                console.log('Gửi order-detail với payload:', detailBody);
                try {
                    // const detailRes = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_PORT_BACK_END}/backend/api/order-detail`, {
                    //     method: 'POST',
                    //     headers: { 'Content-Type': 'application/json' },
                    //     body: JSON.stringify(detailBody),
                    // });
                    const detailRes = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/order-detail`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(detailBody),
                    });

                    if (!detailRes.ok) {
                        const errText = await detailRes.text();
                        failedItems.push(`${item.dish.dishName}: ${errText}`);
                        continue;
                    }

                    const detailResponse = await detailRes.json();
                    if (!detailResponse.success || !detailResponse.data) {
                        failedItems.push(`${item.dish.dishName}: Phản hồi không hợp lệ`);
                        continue;
                    }
                } catch (err) {
                    failedItems.push(`${item.dish.dishName}: ${err instanceof Error ? err.message : 'Unknown error'}`);
                }
            }

            if (failedItems.length > 0) {
                alert(`Có lỗi khi tạo order-detail:\n${failedItems.join('\n')}`);
            } else {
                cartService.clearCart();
                setUpdate(u => u + 1);
                router.push('/order/payment');
            }
        } catch (err) {
            alert(`Lỗi khi đặt hàng: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    const itemsForCartList = cartItems.reduce((acc, item) => {
        const existing = acc.find(i =>
            i.dish._id === item.dish._id &&
            i.dishOptions.map((opt: { id: any; }) => opt.id).sort().join() === item.selectedOptions.map(opt => opt._id || opt.optionName).sort().join()
        );
        if (existing) {
            existing.quantity += item.quantity;
            existing.dishPrice = item.totalPrice / item.quantity;
        } else {
            acc.push({
                dish: item.dish,
                dishName: item.dish.dishName || 'Unknown Dish',
                dishPrice: item.totalPrice / item.quantity,
                dishImage: item.dish.dishImg || 'placeholder.png',
                quantity: item.quantity,
                dishOptions: item.selectedOptions.map((opt: any, idx: number) => ({
                    id: opt._id || opt.optionName || idx,
                    label: opt.optionName || 'Unknown Option',
                    price: opt.optionPrice || 0,
                })),
            });
        }
        return acc;
    }, [] as any[]);

    return (
        <div className="h-screen w-screen bg-[#f7f8fa] flex flex-row items-stretch overflow-hidden p-2">
            <div className="w-[65%] h-full flex flex-col bg-white rounded-2xl shadow-lg mr-3 p-4">
                <MenuLeftHead onClick={() => {
                  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
                  if (user) {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('currentTable');
                  }
                  router.push('/')}} />
                <div className="w-full flex-1 flex flex-col overflow-y-auto">
                    <MenuSlider onSelectType={setSelectedType} />
                    <div className="flex items-center gap-4 py-2">
                        <legend className="text-2xl text-primary px-2 select-none font-semibold">
                            {selectedType === 'All' ? 'Tất cả món ăn' : selectedType}
                        </legend>
                        <div className="h-px bg-dark flex-1"></div>
                    </div>
                    <GridProduct onAddToCart={handleAddToCart} selectedType={selectedType} />
                </div>
            </div>
            <div className="w-[35%] h-full flex flex-col bg-white rounded-2xl shadow-lg p-4 border-l-2 border-[#e5e7eb]">
                <MenuRightHead cartItems={cartQuantity} tableName={tableNameLocal} />
                <div className="flex-1 overflow-y-auto">
                    <CartList
                        items={itemsForCartList}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onDelete={handleDelete}
                    />
                </div>
                <CartFooter onClick={handleOrder} totalPrice={totalPrice} />
            </div>
        </div>
    );
}
