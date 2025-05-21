'use client';

import { CartItemProps } from '@/context/CartContext';
interface CartItem {
    item:CartItemProps
    onIncrement: () => void;
    onDecrement: () => void;
    onDelete: () => void;
}

export default function CartItem({
    item,
    onIncrement,
    onDecrement,
    onDelete,
}: CartItem) {
    const { dishName, dishPrice, dishImg } = item.dish;
    const dishOptions = item.selectedOptions.map((option) => ({
        _id: option._id,
        label: option.optionName,
        price: option.optionPrice,
    }));
    const {quantity, totalPrice} = item;
    const imageSrc = dishImg || '/product/placeholder.png';

    return (
        <div className="cart-item h-auto flex flex-row">
            <div className="w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/5 aspect-square select-none  md:hidden lg:block">
                <div className="relative w-full h-full overflow-hidden">
                    <img 
                    src={imageSrc}
                    alt="Dish Image"
                    className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>


            <div className="w-4/5 h-full flex flex-col !p-2 md:w-full lg:lg:w-4/5">
                <div className="w-full h-1/3 text-xl select-none flex justify-between items-center">
                    <p className="text-sm lg:text-xl">{dishName || 'Unknown Dish'}</p>
                    <span
                        className="material-symbols-outlined text-red-500 text-2xl cursor-pointer transition-all duration-200 ease-in-out hover:text-red-700 hover:scale-110"
                        onClick={onDelete}
                    >
                        delete
                    </span>
                </div>
                <span className="text-xs lg:text-sm text-gray-400">
                    Option:{' '}
                    {dishOptions.length === 0
                        ? 'None'
                        : dishOptions.map((option, index) => (
                              <span key={index}>
                                  {option.label || 'Unknown Option'}                          
                                  {index < dishOptions.length - 1 && ', '}
                              </span>
                          ))}
                </span>
                <div className="w-full h-2/3 flex flex-row justify-between items-center">
                    <span className="text-lg text-accent select-none">
                        ${totalPrice ? totalPrice.toFixed(2) : '0.00'}
                    </span>
                    <div className="flex flex-row gap-5">
                        <button
                            className="w-8 h-8 text-accent hoverChangeBtn select-none"
                            onClick={onDecrement}
                        >
                            -
                        </button>
                        <span className="text-lg text-primary select-none">{quantity || 0}</span>
                        <button
                            className="w-8 h-8 text-accent hoverChangeBtn select-none"
                            onClick={onIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}