'use client';

import CartItem from '@/app/order/components/cartItem';
import { Dish } from '@/app/order/services/dish.service';

interface CartListProps {
    items: {
        dish: Dish;
        dishName: string;
        dishPrice: number;
        dishImage: string;
        quantity: number;
        dishOptions: {
            id: number;
            label: string;
            price: number;
        }[];
    }[];
    onIncrement: (index: number) => void;
    onDecrement: (index: number) => void;
    onDelete: (index: number) => void;
}

export default function CartList({ items, onIncrement, onDecrement, onDelete }: CartListProps) {
    return (
        <div className="w-full h-7/10 overflow-y-scroll !p-2 flex flex-col gap-4">
            {items.map((dish, index) => {
                const dishImage = dish.dishImage.startsWith('/product/')
                    ? dish.dishImage
                    : `/product/${dish.dishImage}`;

                return (
                    <CartItem
                        key={index}
                        dish={dish.dish}
                        dishName={dish.dishName}
                        dishPrice={dish.dishPrice}
                        dishImage={dishImage}
                        dishQuantity={dish.quantity}
                        dishOptions={dish.dishOptions}
                        onIncrement={() => onIncrement(index)}
                        onDecrement={() => onDecrement(index)}
                        onDelete={() => onDelete(index)}
                    />
                );
            })}
        </div>
    );
}