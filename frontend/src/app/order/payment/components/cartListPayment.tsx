import CartItemPayment from "./cartItemPayment";
const cartList = [
  { dishName: "Chocolate Lava Cake", dishPrice: 159.99, dishQuantity: 2 },
  { dishName: "Seafood Paella", dishPrice: 199.99, dishQuantity: 1 },
  { dishName: "Grilled Salmon", dishPrice: 249.99, dishQuantity: 1 },
  { dishName: "Lobster Bisque", dishPrice: 299.99, dishQuantity: 1 },
  { dishName: "Crab Cakes", dishPrice: 349.99, dishQuantity: 1 },
  { dishName: "Shrimp Scampi", dishPrice: 399.99, dishQuantity: 1 },
  { dishName: "Tuna Tartare", dishPrice: 449.99, dishQuantity: 1 },
];

export default function CartListPayment() {
  return (
    <div className="w-full h-13/20 overflow-y-scroll !p-2 flex flex-col gap-4">
      <div className="w-full h-1/10 flex items-center !p-2">
        <div className="flex-1 h-px bg-dark"></div>
        <legend className="text-center !text-2xl text-primary px-4 select-none whitespace-nowrap">
          Order List
        </legend>
        <div className="flex-1 h-px bg-dark"></div>
      </div>
      <div className="w-full h-full overflow-y-scroll !p-2 flex flex-col gap-4">
        {cartList.map((dish, index) => (
          <CartItemPayment
            key={index}
            dishName={dish.dishName}
            dishPrice={dish.dishPrice}
            dishQuantity={dish.dishQuantity}
          />
        ))}
      </div>
    </div>
  );
}
