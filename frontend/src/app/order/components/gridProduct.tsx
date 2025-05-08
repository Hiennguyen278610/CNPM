import OrderItem from "@/app/order/components/orderItem";

const dishList = [
    {dishName: "Chocolate Lava Cake", dishPrice: 159.99, dishImage: "../product/cake1.png"},
    {dishName: "Strawberry Cheesecake", dishPrice: 189.50, dishImage: "../product/cake2.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Tiramisu Delight", dishPrice: 145.75, dishImage: "../product/cake3.png"},
    {dishName: "Matcha Green Tea Cake", dishPrice: 212.25, dishImage: "../product/cake4.png"}
]

export default function gridProduct() {
    return (
        <div className="w-full h-auto !p-2 grid grid-cols-4">
                {dishList.map((dish, index) => (
                    <OrderItem key={index} dishName={dish.dishName} dishPrice={dish.dishPrice} dishImage={dish.dishImage} />
                ))}
        </div>
    );
}