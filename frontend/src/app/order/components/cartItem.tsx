interface CartItemProps {
    dishName: string;
    dishPrice: number;
    dishImage: string;
<<<<<<< HEAD
    dishQuantity: number;
    dishOptions: {
        id: number;
        label: string;
        price: number;
    }[];
    onIncrement:() => void;
    onDecrement:() => void;
    onDelete: () => void;
}

export default function CartItem({ dishName, dishPrice, dishImage, dishQuantity, dishOptions=[],
     onIncrement, onDecrement, onDelete }: CartItemProps) {
    console.log(dishOptions)
=======
}

export default function CartItem({ dishName, dishPrice, dishImage }: CartItemProps) {
>>>>>>> main
    return (
        <div className="cart-item h-auto flex flex-r">
            <div className="w-1/5 aspect-square select-none">
                <div className="w-full h-full relative overflow-hidden">
                        <img 
                            src={dishImage}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover object-center z-0"
                        />
                </div>
            </div>
            <div className="w-4/5 h-full flex flex-col !p-2">
<<<<<<< HEAD
                <div className="w-full h-1/3 text-xl select-none flex justify-between" >
                    <p>{dishName}</p>
                    <span 
                        className="text-red-500 text-sm font-medium transition-all duration-200 ease-in-out hover:text-red-700 hover:font-semibold hover:scale-105"
                        onClick={onDelete}
                    >
                        Xóa
                    </span>
                </div>
                <span 
                    className="text-sml text-gray-400">
                        Add : {dishOptions.length === 0 ? "None" : dishOptions.map((option, index) => (
                            <span key={index}>
                                {option.label}
                                {index < dishOptions.length - 1 && ", "}
                            </span>
                        ))}
                </span>
                <div className="w-full h-2/3 flex flex-row justify-between items-center">
                    <span className="text-lg text-accent select-none">${dishPrice.toFixed(2)}</span>
                    <div className="flex flex-row gap-5">
                        <button 
                            className="w-8 h-8 text-accent hoverChangeBtn select-none"
                            onClick={onDecrement}
                        >
                            -
                        </button>
                        <span className="text-lg text-primary select-none">{dishQuantity}</span>
                        <button 
                            className="w-8 h-8 text-accent hoverChangeBtn select-none"
                            onClick={onIncrement}
                        >
                            + 
                        </button>
=======
                <div className="w-full h-1/3 text-xl select-none" >
                    <p>{dishName}</p>
                </div>
                <div className="w-full h-2/3 flex flex-row justify-between items-center">
                    <span className="text-lg text-accent select-none">${dishPrice.toFixed(2)}</span>
                    <div className="flex flex-row gap-5">
                        <button className="w-8 h-8 text-accent hoverChangeBtn select-none">-</button>
                        <span className="text-lg text-primary select-none">1</span>
                        <button className="w-8 h-8 text-accent hoverChangeBtn select-none">+ </button>
>>>>>>> main
                    </div>
                </div>
            </div>
        </div>
    );
}