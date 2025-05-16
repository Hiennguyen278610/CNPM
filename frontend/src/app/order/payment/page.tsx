"use client";
import CartListPayment from "./components/cartListPayment";
import MenuLeftHeadPayment from "./components/menuHeaderListPayment";
import MenuFooterListPayment from "./components/menuFooterListPayment";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Payment() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50 px-0 lg:!px-10">
      {/* Sidebar - Shows on top on mobile, side on desktop */}
      <div className="w-full lg:w-[18%] bg-transparent flex flex-col sticky !top-0 !z-10 lg:relative">
        <MenuLeftHeadPayment onClick={() => router.push("/order")} />
      </div>

      {/* Main content */}
      <div className="flex-1 w-full lg:w-[68%] bg-white flex flex-col min-h-[calc(100vh-56px)] lg:min-h-screen">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto !p-4">
          <CartListPayment />
        </div>
        
        {/* Footer menu - sticks to bottom on mobile */}
        <div className="sticky bottom-0 bg-white border-t lg:static">
          <MenuFooterListPayment />
        </div>
      </div>
    </div>
  );
}