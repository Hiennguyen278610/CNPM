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

export default function OrderLayout() {
    const router = useRouter();
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-row">
            <div className="w-[65%] h-full bg-transparent flex flex-col">
                <MenuLeftHead onClick={() => router.push('/')}/>

                <div className="w-full h-9/10 bg-transparent overflow-y-scroll ">
                    <MenuSlider />

                    <div className="w-full h-1/12 flex-nesw gap-4 !p-2">
                        <legend className="text-center !text-2xl text-primary px-2 select-none">Sea Food</legend>
                        <div className="h-px bg-dark flex-1"></div>
                    </div>

                    <GridProduct />
                </div>

            </div>
            <div className="w-[35%] h-full bg-white flex flex-col">
                <MenuRightHead/>
                <CartList />
                <CartFooter onClick={() => router.push('/order/payment')}/>
            </div>
        </div>
    );
}