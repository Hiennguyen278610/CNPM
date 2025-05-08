"use client";
import CartListPayment from "./components/cartListPayment";
import MenuLeftHeadPayment from "./components/menuHeaderListPayment";
import MenuFooterListPayment from "./components/menuFooterListPayment";
import { useRouter } from "next/navigation";

export default function Payment() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row justify-center">
      <div className="w-[18%] h-full bg-transparent flex flex-col">
        <MenuLeftHeadPayment onClick={() => router.push("/order")} />
      </div>
      <div className="w-[68%] h-full bg-white flex flex-col">
        <CartListPayment />
        <MenuFooterListPayment />
      </div>
    </div>
  );
}
