import CartItem from "@/app/order/components/cartItem";

interface CartListProps {
    items: {
        dishName: string;
        dishPrice: number;
        dishImage: string;
        quantity: number;
        dishOptions: {
            id: string;
            name: string;
            price: number;
        }[];
        dishType: string;
    }[];
    onIncrement: (index:number) => void;
    onDecrement: (index:number) => void;
    onDelete: (item:any) => void;
}

export default function CartList({ items, onIncrement, onDecrement, onDelete }: CartListProps) {
    return (
        <div className="w-full h-7/10 overflow-y-scroll !p-2 flex flex-col gap-4">
            {items.map((dish, index) => (
                <CartItem
                    key={index}
                    dishName={dish.dishName}
                    dishPrice={dish.dishPrice}
                    dishImage={dish.dishImage}
                    dishQuantity={dish.quantity}
                    dishOptions={dish.dishOptions}
                    dishType={dish.dishType}
                    onIncrement={() => onIncrement(index)}
                    onDecrement={() => onDecrement(index)}
                    onDelete={() => onDelete(dish) }
                />
            ))}
        </div>
    );
}
