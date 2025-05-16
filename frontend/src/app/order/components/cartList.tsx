'use client';

import CartItem from '@/app/order/components/cartItem';
import { CartItemProps } from '@/context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';

interface CartListProps {
    items: CartItemProps[];
    onIncrement: (index: number) => void;
    onDecrement: (index: number) => void;
    onDelete: (index: number) => void;
}

export default function CartList({ items, onIncrement, onDecrement, onDelete }: CartListProps) {
    return (
        <div className="w-full h-7/10 overflow-y-scroll !p-2 flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
                {items.map((item, index) => {
                    const dishImage = item.dish.dishImg.startsWith('/product/')
                        ? item.dish.dishImg
                        : `/product/${item.dish.dishImg}`;

                    return (
                        <motion.div
                            key={item.dish._id + JSON.stringify(item.selectedOptions)}
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CartItem
                                item={{ ...item }}
                                onIncrement={() => onIncrement(index)}
                                onDecrement={() => onDecrement(index)}
                                onDelete={() => onDelete(index)}
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
