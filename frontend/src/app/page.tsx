"use client";

import React from "react";
import "@/app/globals.css";
import NavButton from "@/components/navButton";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getTableByQrToken, createCustomer } from "@/services/table.service";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qrToken = searchParams.get("q");

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col">
      {/* Header*/}
      <header className="w-full h-1/2 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary">
            Welcome to Seafood
          </h1>
          <p className="text-3xl mt-4 text-primary">Please choose an option:</p>
        </div>
      </header>

      {/* Container*/}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-3/10 h-4/15 bg-transparent shadow-lg flex items-center justify-center">
          <div className="flex flex-1 w-full h-full gap-6">
            <NavButton
              label="Come to order"
              spanName="shopping_cart"
              onClick={async () => {
                if (qrToken) {
                  const table = await getTableByQrToken(qrToken);
                  localStorage.setItem("currentTable", JSON.stringify(table));
                  if (table) {
                    const user = await createCustomer();
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    router.push(`/order/`);
                  } else {
                    alert("Table not found");
                  }
                } else {
                  alert("Can not find table");
                }
              }}
            />
            <NavButton
              label="Login"
              spanName="person"  
              onClick={() => router.push("/auth/login")}
            />
          </div>
        </div>
      </div>

      {/* Footer*/}
      <footer className="w-full h-1/2 relative">
        <img
          src="/resource/bgImg.jpg"
          alt="Restaurant background"
          className="absolute w-full h-full object-cover object-center"
        />
      </footer>
    </main>
  );
}
