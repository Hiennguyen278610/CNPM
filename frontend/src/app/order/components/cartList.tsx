import CartItem from "@/app/order/components/cartItem";

const cartList = [
    {dishName: "Chocolate Lava Cake", dishPrice: 159.99, dishImage: "../product/cake1.png"},
    {dishName: "Strawberry Cheesecake", dishPrice: 189.50, dishImage: "../product/cake2.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Matcha Green Tea Cake", dishPrice: 212.25, dishImage: "../product/cake4.png"}
]

export default function CartList() {
    return (
        <div className="w-full h-7/10 overflow-y-scroll !p-2 flex flex-col gap-4">
            {cartList.map((dish, index) => (
                <CartItem key={index} dishName={dish.dishName} dishPrice={dish.dishPrice} dishImage={dish.dishImage} />
            ))}
        </div>
    );
}