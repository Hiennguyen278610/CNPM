"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MenuLeftHead from "@/app/order/components/menuLeftHead";
import GridProduct from "@/app/order/components/gridProduct";
import MenuSlider from "@/app/order/components/menuSlider";
import MenuRightHead from "@/app/order/components/menuRightHead";
import CartList from "@/app/order/components/cartList";
import CartFooter from "@/app/order/components/cartFooter";
import "@/app/globals.css";
import { useCart } from "@/context/CartContext";
import { deleteCustomer } from "@/services/table.service";

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
  const table = JSON.parse(localStorage.getItem("currentTable") || "{}");
  const tableNameLocal = table.tableName || "Bàn số 0";

  const [selectedType, setSelectedType] = useState("All");
  const [isDesktop, setIsDesktop] = useState(true);
  const [isBottomCartOpen, setIsBottomCartOpen] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);

    //Clean up function
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row relative">
      {/* Left Content */}
      <div className="w-full md:w-[65%] h-full bg-transparent flex flex-col">
        <MenuLeftHead
          onClick={() => {
            const currentCustomer = JSON.parse(
              localStorage.getItem("currentUser") || "{}"
            );
            if (currentCustomer) {
              deleteCustomer(currentCustomer.id);
              localStorage.removeItem("currentUser");
            }
            localStorage.removeItem("currentTable");
            router.push("/");
          }}
        />
        <div className="w-full flex-1 bg-transparent overflow-y-scroll">
          <MenuSlider onSelectType={setSelectedType} />
          <div className="w-full h-1/12 flex-nesw gap-4 !p-2">
            <fieldset className="w-full">
              <legend className="text-center text-2xl text-primary px-2 select-none">
                Menu
              </legend>
              <div className="h-px bg-dark flex-1"></div>
            </fieldset>
          </div>
          <GridProduct
            onAddToCart={addToCart}
            dishTypeFiltered={selectedType}
          />
        </div>
      </div>

      {/* Right Cart (desktop) */}
      {isDesktop && (
        <div className="w-full md:w-[35%] h-1/4 md:h-full bg-white flex flex-col z-40">
          <MenuRightHead
            cartItems={getTotalQuantity()}
            tableName={tableNameLocal}
          />
          <CartList
            items={cartItems}
            onIncrement={increaseItem}
            onDecrement={decreaseItem}
            onDelete={deleteItem}
          />
          <CartFooter
            onClick={() => {
              if (cartItems.length === 0) {
                alert("Giỏ hàng trống!");
                return;
              }
              router.push("/order/payment");
            }}
            totalPrice={getTotalPrice()}
          />
        </div>
      )}

      {/* Bottom Bar (mobile) */}
      {!isDesktop && (
        <div className="fixed bottom-0 w-full z-50">
          <button
            className="bg-accent text-white w-full !px-3 flex justify-between items-center text-lg rounded-md hover:bg-red-800"
            onClick={() => setIsBottomCartOpen(true)}
          >
            <span>Your Cart • {getTotalQuantity()} items</span>
            <span>${getTotalPrice().toFixed(2)}</span>
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
                  <p className="text-md select-none md:text-xs">
                    {tableNameLocal}
                  </p>
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
                onIncrement={increaseItem}
                onDecrement={decreaseItem}
                onDelete={deleteItem}
              />
            </div>
            <CartFooter
              onClick={() => {
                if (cartItems.length === 0) {
                  alert("Giỏ hàng trống!");
                  return;
                }
                router.push("/order/payment");
              }}
              totalPrice={getTotalPrice()}
            />
          </div>
        </>
      )}
    </div>
  );
}
