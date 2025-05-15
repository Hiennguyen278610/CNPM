"use client";
import CartListPayment from "./components/cartListPayment";
import MenuLeftHeadPayment from "./components/menuHeaderListPayment";
import MenuFooterListPayment from "./components/menuFooterListPayment";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Payment() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row justify-center bg-gray-50 md:!px-10">
      {/* Sidebar */}
      <div className="w-full md:w-[18%] h-auto md:h-screen bg-transparent flex flex-col">
        <MenuLeftHeadPayment onClick={() => router.push("/order")} />
      </div>
      {/* Main content */}
      <div className="w-full md:w-[68%] flex-1 h-auto md:h-screen bg-white flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <CartListPayment />
        </div>
        <MenuFooterListPayment />
      </div>
    </div>
  );
}
