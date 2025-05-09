import React from "react";

const cartList = [
  { dishName: "Chocolate Lava Cake", dishPrice: 159.99, dishQuantity: 2 },
  { dishName: "Seafood Paella", dishPrice: 199.99, dishQuantity: 1 },
  { dishName: "Grilled Salmon", dishPrice: 249.99, dishQuantity: 1 },
  { dishName: "Lobster Bisque", dishPrice: 299.99, dishQuantity: 1 },
  { dishName: "Crab Cakes", dishPrice: 349.99, dishQuantity: 1 },
  { dishName: "Shrimp Scampi", dishPrice: 399.99, dishQuantity: 1 },
  { dishName: "Tuna Tartare", dishPrice: 449.99, dishQuantity: 1 },
];

export default function MenuFooterListPayment() {
  const discount = 0; // Giả sử không có giảm giá
  const subTotal = cartList.reduce(
    (sum, item) => sum + item.dishPrice * item.dishQuantity,
    0
  );
  const total = subTotal - discount;

  const handleApplyPromo = () => {
    alert(`Chức năng này chưa được triển khai!`);
    // Nếu muốn set discount thì thêm logic ở đây
  };
  const handleCancel = () => {
    alert(`Hủy bỏ đơn hàng!`);
  };
  const handlePayNow = () => {
    alert(`Thanh toán đơn hàng!`);
  };

  return (
    <div className="w-full h-1/5 !p-2 gap-4 !py-5">
      <div className="w-full md:w-auto text-center md:text-left bg-white shadow-md rounded-lg border !p-4 ">
        <div className="flex justify-between items-center text-2xl font-semibold text-gray-700 mb-2">
          <p className="px-4">Subtotal:</p>
          <p className="px-4">{subTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center text-xl font-semibold text-gray-700 mb-2">
          <p className="px-4">Voucher: </p>
          <div className="flex gap-2 px-4">
            <p
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => handleApplyPromo()}
            >
              Add Promo Code
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center text-xl font-semibold text-gray-700 mb-2">
          <p className="px-4">Discount:</p>
          <p className="px-4">-{discount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center text-4xl font-bold text-red-600 mb-2">
          <p className="px-4">Total:</p>
          <p className="px-4">{total.toFixed(2)}</p>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold text-2xl !py-3 !px-10 rounded"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-2xl !py-3 !px-10 rounded"
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
