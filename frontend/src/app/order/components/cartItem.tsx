'use client';

interface CartItemProps {
    dish: any; // Dish với _id
    dishName: string;
    dishPrice: number;
    dishImage: string;
    dishQuantity: number;
    dishOptions: {
        id: number;
        label: string;
        price: number;
    }[];
    onIncrement: () => void;
    onDecrement: () => void;
    onDelete: () => void;
}

export default function CartItem({
    dish,
    dishName,
    dishPrice,
    dishImage,
    dishQuantity,
    dishOptions = [],
    onIncrement,
    onDecrement,
    onDelete,
}: CartItemProps) {
    const imageSrc = dishImage || '/product/placeholder.png';

    return (
        <div className="cart-item h-auto flex flex-row">
            <div className="w-1/5 aspect-square select-none">
                <div className="w-full h-full relative overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={dishName || 'Dish Image'}
                        className="absolute inset-0 w-full h-full object-cover object-center z-0"
                    />
                </div>
            </div>
            <div className="w-4/5 h-full flex flex-col !p-2">
                <div className="w-full h-1/3 text-xl select-none flex justify-between items-center">
                    <p>{dishName || 'Unknown Dish'}</p>
                    <span
                        className="material-symbols-outlined text-red-500 text-2xl cursor-pointer transition-all duration-200 ease-in-out hover:text-red-700 hover:scale-110"
                        onClick={onDelete}
                    >
                        delete
                    </span>
                </div>
                <span className="text-sm text-gray-400">
                    Add:{' '}
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
                        ${dishPrice ? dishPrice.toFixed(2) : '0.00'}
                    </span>
                    <div className="flex flex-row gap-5">
                        <button
                            className="w-8 h-8 text-accent hoverChangeBtn select-none"
                            onClick={onDecrement}
                        >
                            -
                        </button>
                        <span className="text-lg text-primary select-none">{dishQuantity || 0}</span>
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