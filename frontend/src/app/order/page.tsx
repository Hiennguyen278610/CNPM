'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MenuLeftHead from '@/app/order/components/menuLeftHead';
import GridProduct from '@/app/order/components/gridProduct';
import MenuSlider from '@/app/order/components/menuSlider';
import MenuRightHead from '@/app/order/components/menuRightHead';
import CartList from '@/app/order/components/cartList';
import CartFooter from '@/app/order/components/cartFooter';
import '@/app/globals.css';
import { CartItemProps, useCart } from '@/context/CartContext';

export default function OrderLayout() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isBottomCartOpen, setIsBottomCartOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [tableData, setTableData] = useState<{ tableName?: string; qrToken?: string }>({});
  const router = useRouter();

  // Responsive check
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Lấy thông tin bàn từ localStorage (chỉ client)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const table = JSON.parse(localStorage.getItem('currentTable') || '{}');
      setTableData(table);
    }
  }, []);

  const tableNameLocal = tableData.tableName || 'Bàn số 0';

  const { cartItems, addToCart, increaseItem, decreaseItem, deleteItem, getTotalPrice, getTotalQuantity } = useCart();

  const totalPrice = getTotalPrice();
  const cartQuantity = getTotalQuantity();

  const handleAddToCart = (item: CartItemProps) => {
    if (!item.dish || !item.dish._id) {
      alert('Invalid Dish!');
      return;
    }
    addToCart(item);
  };

  const handleIncrement = (index: number) => {
    if (cartItems[index].quantity >= 99) {
      alert('Max quantity is 99!');
      return;
    }
    increaseItem(index);
  };

  const handleDecrement = (index: number) => {
    if (cartItems[index].quantity <= 1) {
      alert('Min quantity is 1!');
    }
    decreaseItem(index);
  };

  const handleDelete = (index: number) => {
    console.log('Delete item at index:', index);
    deleteItem(index);
  };

  const handleOrder = async () => {
    if (!cartItems.length) {
      alert('Giỏ hàng trống!');
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    const customer = typeof window !== "undefined" ? localStorage.getItem('currentUser') : null;
    const table = typeof window !== "undefined" ? localStorage.getItem('currentTable') : null;
    const customerID = customer ? JSON.parse(customer)._id : null;
    const tableID = table ? JSON.parse(table)._id : null;
    try {
      // Bước 1: Tạo đơn hàng
      const orderBody = {
        customerID,
        tableID,
        orderStatus: 0,
        totalPrice: getTotalPrice(),
      };
      const orderRes = await fetch(
        `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/order`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderBody),
        },
      );

      if (!orderRes.ok) {
        const errText = await orderRes.text();
        alert(`Tạo đơn hàng thất bại! ${orderRes.status} - ${errText}`);
        return;
      }

      const orderResponse = await orderRes.json();
      const orderId = orderResponse.id || orderResponse._id;
      if (!orderId || !/^[0-9a-fA-F]{24}$/.test(orderId)) {
        alert('Không nhận được orderId hợp lệ từ server!');
        return;
      }

      // Bước 2: Tạo chi tiết đơn hàng
      const failedItems: string[] = [];
      for (const item of cartItems) {
        if (!item.dish._id || !/^[0-9a-fA-F]{24}$/.test(item.dish._id)) {
          failedItems.push(`${item.dish.dishName}: ID món ăn không hợp lệ`);
          continue;
        }

        const optionsArr = (item.selectedOptions || [])
          .map((opt: { _id: string }) => opt._id || '')
          .filter((id: string) => id) || [];
        const detailBody = {
          order: orderId,
          dish: item.dish._id,
          quantity: item.quantity,
          options: optionsArr,
        };

        console.log('Gửi order-detail với payload:', detailBody);
        try {
          const detailRes = await fetch(
            `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/order-detail`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(detailBody),
            },
          );

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
          failedItems.push(`${item.dish.dishName}: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`);
        }
      }

      if (failedItems.length > 0) {
        alert(`Có lỗi khi tạo chi tiết đơn hàng:\n${failedItems.join('\n')}`);
        return;
      }

      // Bước 4: Hoàn tất đơn hàng
      router.push('/order/payment');
    } catch (err) {
      alert(`Lỗi khi đặt hàng: ${err instanceof Error ? err.message : 'Lỗi không xác định'}`);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row relative">
      <div className="w-full md:w-[65%] h-full bg-transparent flex flex-col">
        <MenuLeftHead
          onClick={() => {
            if (typeof window !== "undefined") {
              const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
              if (user) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('currentTable');
              }
              router.push(`/?q=${tableData.qrToken}`);
            }
          }}
        />
        <div className="w-full flex-1 flex flex-col overflow-y-auto">
          <MenuSlider onSelectType={setSelectedType} />
          <fieldset className="w-full">
            <legend className="text-center text-3xl font-semibold text-black !py-2 select-none">Menu</legend>
            <div className="h-px bg-dark flex-1"></div>
          </fieldset>
          <GridProduct onAddToCart={handleAddToCart} selectedType={selectedType} />
        </div>
      </div>

      {/*Cart*/}
      {isDesktop && (
        <div className="w-full md:w-[35%] h-1/4 md:h-full bg-white flex flex-col z-40">
          <MenuRightHead cartItems={cartQuantity} tableName={tableNameLocal} />
          <CartList
            items={cartItems}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDelete={handleDelete}
          />
          <CartFooter onClick={handleOrder} totalPrice={totalPrice} />
        </div>
      )}

      {/* Bottom Bar (mobile) */}
      {!isDesktop && (
        <div className="fixed bottom-0 w-full z-50">
          <button
            className="bg-accent text-white w-full !p-2 flex justify-between items-center text-lg rounded-xl hover:bg-red-800"
            onClick={() => setIsBottomCartOpen(true)}
          >
            <span>Your Cart • {cartQuantity} items</span>
            <span>${totalPrice}</span>
          </button>
        </div>
      )}

      {/* Overlay + Bottom Sheet Cart (mobile) */}
      {isBottomCartOpen && !isDesktop && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsBottomCartOpen(false)}
          ></div>

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 w-full bg-white rounded-t-2xl shadow-xl z-50 max-h-[80%] flex flex-col animate-slide-up">
            <div className="flex justify-between items-center !p-4 border-b">
              <div className="flex flex-row justify-center items-center">
                <h2 className="text-xl font-bold !mr-3">Your Cart</h2>
                <div className="w-max h-full bg-secondary flex flex-row justify-center items-center !p-2 rounded-3xl">
                  <p className="text-md select-none md:text-xs">{tableNameLocal}</p>
                </div>
              </div>
              <button
                onClick={() => setIsBottomCartOpen(false)}
                className="text-gray-500 text-2xl hover:text-gray-900"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-y-auto !px-4">
              <CartList
                items={cartItems}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onDelete={handleDelete}
              />
            </div>
            <CartFooter onClick={handleOrder} totalPrice={totalPrice} />
          </div>
        </>
      )}
    </div>
  );
}