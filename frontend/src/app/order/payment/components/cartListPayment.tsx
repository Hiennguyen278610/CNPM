import { useCart } from "@/context/CartContext";
import CartItemPayment from "./cartItemPayment";

export default function CartListPayment() {
  const { cartItems } = useCart();
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
        {cartItems.map((dish: any, index: number) => (
          <CartItemPayment
            key={index}
            dishName={dish.dishName}
            dishPrice={dish.dishPrice}
            dishQuantity={dish.quantity}
            dishOptions={dish.dishOptions}
            dishType={dish.dishType}
          />
        ))}
      </div>
    </div>
  );
}
