'use client';

import CartItem from '@/app/order/components/cartItem';
import { CartItemProps } from '@/context/CartContext';


interface CartListProps {
    items: CartItemProps[];
    onIncrement: (index: number) => void;
    onDecrement: (index: number) => void;
    onDelete: (index: number) => void;
}

export default function CartList({ items, onIncrement, onDecrement, onDelete }: CartListProps) {
    return (
        <div className="w-full h-7/10 overflow-y-scroll !p-2 flex flex-col gap-4">
            {
            items.map((item, index) => {
                const dishImage = item.dish.dishImg.startsWith('/product/')
                    ? item.dish.dishImg
                    : `/product/${item.dish.dishImg}`;
                

                return (
                    <CartItem
                        key={index}
                        item={{
                            ...item}}
                        onIncrement={() => onIncrement(index)}
                        onDecrement={() => onDecrement(index)}
                        onDelete={() => onDelete(index)}
                    />
                );
            })}
        </div>
    );
}