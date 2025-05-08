'use client';
import { useState } from "react";
import OrderItem from "@/app/order/components/orderItem";
import OptionPage from "@/app/option/page";

const dishList = [
  { dishName: "Chocolate Lava Cake", dishPrice: 159.99, dishImage: "../product/cake1.png" },
  { dishName: "Strawberry Cheesecake", dishPrice: 189.50, dishImage: "../product/cake2.png" },
  { dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png" },
  { dishName: "Matcha Green Tea Cake", dishPrice: 212.25, dishImage: "../product/cake4.png" }
];

export default function GridProduct({onAddToCart,}: {onAddToCart: (item: any) => void;}) {
  const [showOption, setShowOption] = useState(false);
  const [selectedDish, setSelectedDish] = useState<{
    dishName: string;
    dishPrice: number;
    dishImage: string;
  } | null>(null);

  return (
    <>
      <div className="w-full h-auto !p-2 grid grid-cols-4">
        {dishList.map((dish, index) => (
          <OrderItem
            key={index}
            dishName={dish.dishName}
            dishPrice={dish.dishPrice}
            dishImage={dish.dishImage}
            onShowOption={() => {
              setSelectedDish(dish);
              setShowOption(true);
            }}
          />
        ))}
      </div>

      {showOption && selectedDish && (
        <OptionPage
          show={showOption}
          onClose={() => setShowOption(false)}
          dishName={selectedDish.dishName}
          dishPrice={selectedDish.dishPrice}
          dishImage={selectedDish.dishImage}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
