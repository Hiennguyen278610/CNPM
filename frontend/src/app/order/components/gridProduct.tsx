'use client';
import { useState, useEffect } from "react";
import OrderItem from "@/app/order/components/orderItem";
import OptionPage from "@/app/option/page";
import { dishService, Dish } from "../services/dish.service";

export default function GridProduct({onAddToCart,}: {onAddToCart: (item: any) => void;}) {
  const [showOption, setShowOption] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const data = await dishService.getAllDishes(); // always fetch from API
        setDishes(data as Dish[]);
        setError(null);
      } catch (err) {
        console.error('Error fetching dishes:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch dishes');
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const handleCheck = (optionId: string, optionPrice: number) => {
    if (checked.includes(optionId)) {
      setChecked(checked.filter((id) => id !== optionId));
    } else {
      setChecked([...checked, optionId]);
    }
  };

  return (
    <>
      <div className="w-full h-auto !p-2 grid grid-cols-4">
        {dishes.map((dish, index) => (
          <OrderItem
            key={index}
            dishName={dish.dishName}
            dishPrice={dish.dishPrice}
            dishImg={dish.dishImg}
            onShowOption={() => {
              setSelectedDish(dish);
              setShowOption(true);
            }}
          />
        ))}
      </div>

      {showOption && selectedDish && (
        <OptionPage
          dishId={selectedDish._id}
          dishName={selectedDish.dishName}
          dishPrice={selectedDish.dishPrice}
          dishImage={selectedDish.dishImg}
          show={showOption}
          onClose={() => setShowOption(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}