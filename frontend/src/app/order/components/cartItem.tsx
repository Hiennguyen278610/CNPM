interface CartItemProps {
    dishName: string;
    dishPrice: number;
    dishImage: string;
}

export default function CartItem({ dishName, dishPrice, dishImage }: CartItemProps) {
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
                <div className="w-full h-1/3 text-xl select-none" >
                    <p>{dishName}</p>
                </div>
                <div className="w-full h-2/3 flex flex-row justify-between items-center">
                    <span className="text-lg text-accent select-none">${dishPrice.toFixed(2)}</span>
                    <div className="flex flex-row gap-5">
                        <button className="w-8 h-8 text-accent hoverChangeBtn select-none">-</button>
                        <span className="text-lg text-primary select-none">1</span>
                        <button className="w-8 h-8 text-accent hoverChangeBtn select-none">+ </button>
                    </div>
                </div>
            </div>
        </div>
    );
}