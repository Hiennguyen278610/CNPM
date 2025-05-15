"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function MenuFooterListPayment() {
  const router = useRouter();
  const { cartItems, getTotalPrice } = useCart();

  const subTotal = getTotalPrice();
  const discount = 0;
  const total = subTotal - discount;

  const handleApplyPromo = () => {
    alert(`Chức năng này chưa được triển khai!`);
  };
  const handleCancel = () => {
    alert(`Hủy bỏ đơn hàng!`);
    router.push("/order");
  };
  const handlePayNow = () => {
    const orderId = uuidv4();
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    window.location.href = `${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/vnpay/vnpay-url?total=${total}&orderId=${orderId}`;
  };
  
  return (
    <div className="w-full !p-2 !py-5">
      <div className="w-full bg-white shadow-md rounded-lg border !p-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-lg md:text-2xl font-semibold text-gray-700 !mb-2">
          <p className="!px-2 md:!px-4">Subtotal:</p>
          <p className="!px-2 md:!px-4">{subTotal.toFixed(2)}</p>
        </div>
        
        {/* Voucher */}
        <div className="flex justify-between items-center text-base md:text-xl font-semibold text-gray-700 !mb-2">
          <p className="!px-2 md:!px-4">Voucher: </p>
          <div className="flex !gap-1 md:!gap-2 !px-2 md:!px-4">
            <p
              className="text-blue-600 cursor-pointer hover:underline text-sm md:text-base"
              onClick={() => handleApplyPromo()}
            >
              Add Promo Code
            </p>
          </div>
        </div>
        
        {/* Discount */}
        <div className="flex justify-between items-center text-base md:text-xl font-semibold text-gray-700 !mb-2">
          <p className="!px-2 md:!px-4">Discount:</p>
          <p className="!px-2 md:!px-4">-{discount.toFixed(2)}</p>
        </div>
        
        {/* Total */}
        <div className="flex justify-between items-center text-2xl md:text-4xl font-bold text-red-600 !mb-2">
          <p className="!px-2 md:!px-4">Total:</p>
          <p className="!px-2 md:!px-4">{total.toFixed(2)}</p>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end !gap-2 md:!gap-4 !mt-4">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold text-sm md:text-2xl !py-2 md:!py-3 !px-4 md:!px-10 rounded"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm md:text-2xl !py-2 md:!py-3 !px-4 md:!px-10 rounded"
            onClick={() => {
              handlePayNow();
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}