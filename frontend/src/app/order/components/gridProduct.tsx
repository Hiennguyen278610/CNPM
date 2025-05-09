'use client';
import { useState } from "react";
import OrderItem from "@/app/order/components/orderItem";
import OptionPage from "@/app/option/page";
import { useCart } from "@/context/CartContext";

interface gridProductsList{
  dishTypeFiltered: string
  onAddToCart: (item: any) => void;
}


const menuList = [
  {
    dishType : "Soda",
    List: [
      { dishName: "Strawberry Soda", dishPrice: 159.99, dishImage: "../product/cake4.png", dishType :"Soda"},
      { dishName: "Guava Soda", dishPrice: 189.50, dishImage: "../product/cake4.png", dishType :"Soda" },
      { dishName: "Lemon Soda", dishPrice: 145.75, dishImage: "../product/cake4.png", dishType :"Soda" },
      { dishName: "Grape Soda", dishPrice: 212.25, dishImage: "../product/cake4.png", dishType :"Soda" },
      { dishName: "Raspberry Soda", dishPrice: 212.25, dishImage: "../product/cake4.png", dishType :"Soda" },
    ]
  },

  {
    dishType : "Grilled",
    List: [
      { dishName: "Beef Steak", dishPrice: 159.99, dishImage: "../product/cake3.png", dishType :"Grilled"},
      { dishName: "Omelete dish", dishPrice: 189.50, dishImage: "../product/cake3.png", dishType :"Grilled" },
      { dishName: "Grill set 1", dishPrice: 145.75, dishImage: "../product/cake3.png", dishType :"Grilled" },
      { dishName: "Grill set 2", dishPrice: 212.25, dishImage: "../product/cake3.png", dishType :"Grilled" },
    ]
  },

  {
    dishType: "FastFood",
    List: [
      { dishName: "Hamburger ", dishPrice: 159.99, dishImage: "../product/cake1.png", dishType: "FastFood" },
      { dishName: "Taco cake", dishPrice: 189.50, dishImage: "../product/cake1.png", dishType: "FastFood"  },
      { dishName: "Pizza Company", dishPrice: 145.75, dishImage: "../product/cake1.png", dishType: "FastFood" },
      { dishName: "Chicken pizza", dishPrice: 212.25, dishImage: "../product/cake1.png", dishType: "FastFood" },
    ]
  },

  {
    dishType: "Soup",
    List: [
      { dishName: "Sanuki Udon", dishPrice: 159.99, dishImage: "../product/cake2.png", dishType :"Soup" },
      { dishName: "Soy Sauce Ramen", dishPrice: 189.50, dishImage: "../product/cake2.png", dishType :"Soup"},
      { dishName: "Suki Ramen", dishPrice: 145.75, dishImage: "../product/cake2.png", dishType :"Soup" },
      { dishName: "Shoyu Ramen", dishPrice: 212.25, dishImage: "../product/cake2.png", dishType :"Soup" },
    ]
  }
]

export default function GridProduct({onAddToCart, dishTypeFiltered}: gridProductsList ) {
  const {addToCart}= useCart()
  const handleShowOption = (dish: any) => {
  if (dish.dishType === "Soda") {
    addToCart(dish); 
  } else {
    setSelectedDish(dish);
    setShowOption(true); 
  }
};

  const [showOption, setShowOption] = useState(false);
  const [selectedDish, setSelectedDish] = useState<{
    dishName: string;
    dishPrice: number;
    dishImage: string;
    dishType: string;
  } | null>(null);

  const filteredList = dishTypeFiltered === "All" ? menuList : menuList.filter((item) => item.dishType === dishTypeFiltered)

  return (
    <>
      {filteredList.map((item) => (
        <div key={item.dishType} className="w-full !mb-6">
          <div className="flex items-center w-full !my-2 !px-2">
            <span className="text-2xl font-semibold text-black whitespace-nowrap !mr-4">
              {item.dishType}
            </span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>
          <div className="w-full h-auto p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {item.List.map((dish, index) => (
              <OrderItem
                key={index}
                dishName={dish.dishName}
                dishPrice={dish.dishPrice}
                dishImage={dish.dishImage}
                onShowOption={() => {
                  handleShowOption(dish)
                }}
              />
            ))}
          </div>
        </div>
      ))}
    
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
