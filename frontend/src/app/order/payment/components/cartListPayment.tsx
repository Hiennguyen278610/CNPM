import { useCart } from "@/context/CartContext";
import CartItemPayment from "./cartItemPayment";

export default function CartListPayment() {
  const { cartItems } = useCart();

  // Chuyển đổi dữ liệu từ localStorage sang định dạng CartItemPayment
  const formattedCartItems = cartItems.map((item: any) => ({
    dishName: item.dish.dishName || "Unknown Dish",
    dishPrice: item.totalPrice / item.quantity,
    dishQuantity: item.quantity,
    dishOptions: item.selectedOptions?.map((opt: any) => ({
      id: opt._id || "",
      name: opt.optionName || "Unknown Option",
      price: opt.optionPrice || 0
    })) || [],
    dishType: item.dish.dishType || "Food"
  }));

  return (
    <div className="w-full h-full overflow-y-scroll !p-2 flex flex-col gap-4">
      <div className="w-full h-1/10 flex items-center !p-2">
        <div className="flex-1 h-px bg-dark"></div>
        <legend className="text-center !text-2xl text-primary !px-4 select-none whitespace-nowrap">
          Order List
        </legend>
        <div className="flex-1 h-px bg-dark"></div>
      </div>
      <div className="w-full h-full overflow-y-scroll !p-2 flex flex-col gap-4">
        {formattedCartItems.map((dish: any, index: number) => (
          <CartItemPayment
            key={index}
            dishName={dish.dishName}
            dishPrice={dish.dishPrice}
            dishQuantity={dish.dishQuantity}
            dishOptions={dish.dishOptions}
            dishType={dish.dishType}
          />
        ))}
      </div>
    </div>
  );
}
