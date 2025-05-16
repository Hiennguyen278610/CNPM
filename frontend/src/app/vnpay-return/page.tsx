"use client";
import { useSearchParams } from "next/navigation";
import { getOrderByCustomerIdAndTableId, updateOrder } from "@/services/order.service";
import { useEffect } from "react";


export default function VnPayReturn() {
  const searchParams = useSearchParams();

  const vnp_Amount = searchParams.get("vnp_Amount"); // total
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef"); // order id

  const isSuccess = vnp_ResponseCode === "00" && vnp_TransactionStatus === "00";

  const tableData = JSON.parse(localStorage.getItem("currentTable") || "{}");

  // Format số tiền (chia cho 100 vì VNPAY trả về số tiền nhân 100)
  const formattedAmount = vnp_Amount ? parseInt(vnp_Amount) / 100 : 0;

  // Format ngày thanh toán từ định dạng yyyyMMddHHmmss
  const formatPayDate = (dateString: string | null) => {
    if (!dateString) return "N/A";

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
    const second = dateString.substring(12, 14);

    return `${hour}:${minute}:${second} ${day}/${month}/${year} `;
  };
  useEffect(() => {
    const fetchOrder = async () => {
      if (isSuccess) {
        const customer = localStorage.getItem("currentUser");
        const table = localStorage.getItem("currentTable");
        const customerID = customer ? JSON.parse(customer)._id : null;
        const tableID = table ? JSON.parse(table)._id : null;
        const order = await getOrderByCustomerIdAndTableId(customerID, tableID);
        await updateOrder(order._id, 1);
      }
    };
    fetchOrder();
  }, [isSuccess]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-gray-100 !p-4">
      <div className="bg-white shadow-xl rounded-2xl !p-6 w-full max-w-3xl">
        <div className="flex flex-col items-center !mb-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center !mb-4 ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <h1
            className={`text-3xl font-bold ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
          </h1>
          <p className="text-gray-500 mt-2">
            {isSuccess
              ? "Cảm ơn bạn đã sử dụng dịch vụ"
              : "Vui lòng thử lại hoặc liên hệ hỗ trợ"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 !gap-4">
          <div className="bg-gray-50 !p-4 rounded-lg">
            <h2 className="font-semibold text-lg !mb-3 text-gray-700">
              Thông tin giao dịch
            </h2>
            <InfoRow label="Mã giao dịch" value={vnp_TransactionNo} />
            <InfoRow label="Mã tham chiếu" value={vnp_TxnRef} />
            <InfoRow
              label="Ngày thanh toán"
              value={formatPayDate(vnp_PayDate)}
            />
            <InfoRow label="Mã phản hồi" value={vnp_ResponseCode} />
          </div>

          <div className="bg-gray-50 !p-4 rounded-lg">
            <h2 className="font-semibold text-lg !mb-3 text-gray-700">
              Thông tin thanh toán
            </h2>
            <InfoRow
              label="Số tiền"
              value={`${formattedAmount.toLocaleString()} VND`}
            />
            <InfoRow label="Ngân hàng" value={vnp_BankCode} />
            <InfoRow label="Loại thẻ" value={vnp_CardType} />
            <InfoRow label="Nội dung" value={vnp_OrderInfo} />
          </div>
        </div>

        <div className="!mt-6 flex justify-center">
          <button
            onClick={() => (window.location.href = `/?q=${tableData.qrToken}`)}
            className="!px-6 !py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

// Component phụ để hiển thị thông tin
function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="!mb-2 !last:mb-0">
      <span className="text-sm font-medium text-gray-500">{label}:</span>
      <p className="text-gray-800 font-medium">{value || "N/A"}</p>
    </div>
  );
}
