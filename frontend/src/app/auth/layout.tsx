import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập / Đăng ký – Sea Food Restaurant",
};

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex flex-row h-screen w-screen overflow-hidden">
            <div className="w-2/5 h-full !p-5 flex items-center justify-center">
                <div className="w-full h-full rounded-4xl relative overflow-hidden">
                    <img 
                        src="/resource/bgImg.jpg"
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover object-center z-0"
                    />
                </div>
            </div>
            <div className="w-3/5 h-full !p-5">
                {children}
            </div>
        </div>
    );
}