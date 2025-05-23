"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { get } from "axios";
import { getOrderByCustomerIdAndTableId } from "@/services/order.service";

export default function MenuFooterListPayment() {
  const router = useRouter();
  const { cartItems, getTotalPrice } = useCart();

  const discount = 0;
  const total = getTotalPrice() - discount;

  const handleApplyPromo = () => {
    alert(`Chức năng này chưa được triển khai!`);
  };
  const handleCancel = () => {
    alert(`Hủy bỏ đơn hàng!`);
    router.push("/order");
  };
  const handlePayNow = async () => {
    const customer = localStorage.getItem('currentUser')
    const table = localStorage.getItem('currentTable')
    const customerID = customer ? JSON.parse(customer)._id : null
    const tableId = table ? JSON.parse(table)._id : null
    const order = await getOrderByCustomerIdAndTableId(customerID, tableId);
    const orderId = order._id
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    // window.location.href = `http://localhost:${process.env.NEXT_PUBLIC_PORT_BACK_END}/backend/api/vnpay/vnpay-url?total=${total}&orderId=${orderId}`;
    window.location.href = `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/vnpay/vnpay-url?total=${total}&orderId=${orderId}`;
  };
  return (
     <div className="w-full !px-2 !py-2 bg-white border-t shadow-lg lg:shadow-none lg:border-0">
      <div className="max-w-6xl mx-auto !space-y-2">
        {/* Price Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 !gap-2">
          <div className="flex justify-between md:flex-col">
            <span className="text-lg font-medium text-gray-700 !px-2">Subtotal:</span>
            <span className="text-lg font-semibold !px-2">{getTotalPrice().toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between md:flex-col">
            <div className="flex items-center !gap-2">
              <span className="text-lg font-medium text-gray-700 !px-2">Voucher:</span>
              <button 
                onClick={handleApplyPromo}
                className="text-blue-600 hover:underline text-sm md:text-base !p-1"
              >
                Add Promo Code
              </button>
            </div>
            <span className="text-lg font-semibold !px-2">-{discount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between md:flex-col">
            <span className="text-xl font-bold text-gray-800 !px-2">Total:</span>
            <span className="text-2xl font-bold text-red-600 !px-2">{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons - Full width on mobile, auto width on desktop */}
        <div className="flex flex-col-reverse sm:flex-row !gap-4 !pt-4 sm:justify-end">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold !py-3 !px-6 rounded-lg text-lg sm:text-xl w-full sm:w-auto"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold !py-3 !px-6 rounded-lg text-lg sm:text-xl w-full sm:w-auto"
            onClick={handlePayNow}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}