'use client';
import React from "react";
import { useRouter } from "next/navigation";
import MenuLeftHead from "@/app/order/components/menuLeftHead";
import GridProduct from "@/app/order/components/gridProduct";
import MenuSlider from "@/app/order/components/menuSlider";
import MenuRightHead from "@/app/order/components/menuRightHead";
import CartList from "@/app/order/components/cartList";
import CartFooter from "@/app/order/components/cartFooter";
import "@/app/globals.css";
import { useCart } from "@/context/CartContext";

export default function OrderLayout() {
  const router = useRouter();
  const {
    cartItems,
    addToCart,
    increaseItem,
    decreaseItem,
    deleteItem,
    getTotalPrice,
    getTotalQuantity,
  } = useCart();
  const table = JSON.parse(localStorage.getItem("table") || '{}');
  const tableNameLocal = table.tableName || "Bàn số 0";

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row">
      {/* Left Content */}
      <div className="w-[65%] h-full bg-transparent flex flex-col">
        <MenuLeftHead onClick={() => router.push('/')} />

        <div className="w-full h-9/10 bg-transparent overflow-y-scroll ">
          <MenuSlider />
          <div className="w-full h-1/12 flex-nesw gap-4 !p-2">
            <legend className="text-center !text-2xl text-primary px-2 select-none">Sea Food</legend>
            <div className="h-px bg-dark flex-1"></div>
          </div>
          <GridProduct onAddToCart={addToCart} />
        </div>
      </div>

      {/* Right Cart */}
      <div className="w-[35%] h-full bg-white flex flex-col">
        <MenuRightHead cartItems={getTotalQuantity()} tableName={tableNameLocal} />
        <CartList 
          items={cartItems}
          onIncrement={increaseItem}
          onDecrement={decreaseItem}
          onDelete={deleteItem}
        />
        <CartFooter
          onClick={() => 
            { if (cartItems.length === 0) {
              alert("Giỏ hàng trống!");
              return;
            } 
              router.push('/order/payment')}}
          totalPrice={getTotalPrice()}
        />
      </div>
    </div>
  );
}
