'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MenuLeftHead from "@/app/order/components/menuLeftHead";
import GridProduct from "@/app/order/components/gridProduct";
import MenuSlider from "@/app/order/components/menuSlider";
import MenuRightHead from "@/app/order/components/menuRightHead";
import CartList from "@/app/order/components/cartList";
import CartFooter from "@/app/order/components/cartFooter";
import "@/app/globals.css";
import { cartService } from "@/app/order/services/cart.service";

export default function OrderLayout() {
    const [, setUpdate] = useState(0);
    const router = useRouter();

    const getCartItems = () => cartService.getCart();

    const handleAddToCart = (item: any) => {
        const dish = item.dish || item;
        const quantity = item.quantity || 1;
        const selectedOptions = item.selectedOptions || item.options || [];
        console.log('Adding to cart:', { dish, quantity, selectedOptions });
        cartService.addToCart(dish, quantity, selectedOptions);
        setUpdate(u => u + 1);
    };

    const handleIncrement = (index: number) => {
        const cart = getCartItems();
        cartService.updateQuantity(index, cart[index].quantity + 1);
        setUpdate(u => u + 1);
    };

    const handleDecrement = (index: number) => {
        const cart = getCartItems();
        if (cart[index].quantity > 1) {
            cartService.updateQuantity(index, cart[index].quantity - 1);
            setUpdate(u => u + 1);
        }
    };

    const handleDelete = (item: any) => {
        const cart = getCartItems();
        const index = cart.findIndex(
            (cartItem) => cartItem.dish._id === item.dish._id && JSON.stringify(cartItem.selectedOptions) === JSON.stringify(item.selectedOptions)
        );
        if (index !== -1) {
            cartService.removeFromCart(index);
            setUpdate(u => u + 1);
        }
    };

    const handleOrder = async () => {
        const cartItems = getCartItems();
        console.log('Cart items:', cartItems);
        console.log('Total price:', cartService.getTotal());
        if (!cartItems.length || cartService.getTotal() <= 0) {
            alert('Giỏ hàng trống hoặc tổng giá trị không hợp lệ!');
            return;
        }

        const customerID = "681ce5d685a510c2b8897dd9";
        const tableID = "681ce60f85a510c2b8897ddb";
        try {
            const orderBody = {
                customerID,
                tableID,
                orderStatus: 0,
                totalPrice: cartService.getTotal()
            };
            console.log('Sending order:', orderBody);
            const orderRes = await fetch('http://localhost:5000/backend/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderBody)
            });

            if (!orderRes.ok) {
                const errText = await orderRes.text();
                console.error('Order POST failed:', orderRes.status, errText);
                alert(`Tạo order thất bại! Lỗi: ${orderRes.status} - ${errText}`);
                return;
            }

            const orderResponse = await orderRes.json();
            console.log('Order response:', orderResponse);
            const orderId = orderResponse.id || orderResponse;
            if (!orderId || !/^[0-9a-fA-F]{24}$/.test(orderId)) {
                console.error('Invalid orderId:', orderId);
                alert('Không nhận được orderId hợp lệ từ server!');
                return;
            }
            console.log('Order ID:', orderId);

            const failedItems: string[] = [];
            for (const item of cartItems) {
                const optionsArr = item.selectedOptions?.map(opt => opt._id).filter(id => id) || [];
                const detailBody = {
                    order: orderId,
                    dish: item.dish._id,
                    quantity: item.quantity,
                    options: optionsArr
                };
                console.log('Sending order detail:', detailBody);
                try {
                    const detailRes = await fetch('http://localhost:5000/backend/api/order-detail', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(detailBody)
                    });

                    if (!detailRes.ok) {
                        const errText = await detailRes.text();
                        console.error('OrderDetail POST failed:', detailRes.status, errText);
                        failedItems.push(`${item.dish.dishName}: ${errText}`);
                        continue;
                    }

                    const detailResponse = await detailRes.json();
                    console.log('Order detail response:', detailResponse);
                    if (!detailResponse.success || !detailResponse.data) {
                        console.error('Order detail not saved:', detailResponse);
                        failedItems.push(`${item.dish.dishName}: Phản hồi không hợp lệ - ${JSON.stringify(detailResponse)}`);
                        continue;
                    }
                } catch (err) {
                    console.error('Lỗi khi gửi order-detail:', err);
                    failedItems.push(`${item.dish.dishName}: ${err.message}`);
                }
            }

            if (failedItems.length > 0) {
                alert(`Có lỗi khi tạo order-detail:\n${failedItems.join('\n')}\nVui lòng kiểm tra và thử lại!`);
            } else {
                cartService.clearCart();
                setUpdate(u => u + 1);
                router.push('/order/payment');
            }
        } catch (err) {
            console.error('Lỗi xử lý order:', err);
            alert(`Có lỗi khi đặt hàng! Chi tiết: ${err.message}`);
        }
    };

    const cartItems = getCartItems();
    const totalPrice = cartService.getTotal();
    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    console.log({
        customerID: "681ce5d685a510c2b8897dd9",
        tableID: "681ce60f85a510c2b8897ddb",
        orderStatus: 0,
        totalPrice: cartService.getTotal()
    });

    return (
        <div className="h-screen w-screen bg-[#f7f8fa] flex flex-row items-stretch overflow-hidden p-2">
            <div className="w-[65%] h-full flex flex-col bg-white rounded-2xl shadow-lg mr-3 p-4">
                <MenuLeftHead onClick={() => router.push('/')} />
                <div className="w-full flex-1 flex flex-col overflow-y-auto">
                    <MenuSlider />
                    <div className="flex items-center gap-4 py-2">
                        <legend className="text-2xl text-primary px-2 select-none font-semibold">Sea Food</legend>
                        <div className="h-px bg-dark flex-1"></div>
                    </div>
                    <GridProduct onAddToCart={handleAddToCart} />
                </div>
            </div>
            <div className="w-[35%] h-full flex flex-col bg-white rounded-2xl shadow-lg p-4 border-l-2 border-[#e5e7eb]">
                <MenuRightHead cartItems={cartQuantity} />
                <div className="flex-1 overflow-y-auto">
                    <CartList 
                        items={cartItems.map(item => ({
                            dishName: item.dish.dishName,
                            dishPrice: item.dish.dishPrice,
                            dishImage: item.dish.dishImg,
                            quantity: item.quantity,
                            dishOptions: item.selectedOptions.map(opt => ({
                                id: parseInt(opt._id),
                                label: opt.optionName,
                                price: opt.optionPrice
                            }))
                        }))}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onDelete={handleDelete}
                    />
                </div>
                <CartFooter
                    onClick={handleOrder}
                    totalPrice={totalPrice}
                />
            </div>
        </div>
    );
}