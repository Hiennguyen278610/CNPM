interface OrderItemProps {
    dishName: string;
    dishPrice: number;
    dishImage: string;
    onShowOption?: () => void;
}

function OrderItem( { dishName, dishPrice, dishImage, onShowOption }: OrderItemProps) {
    return (
        <div className=" border-2 !p-2 !m-1 rounded-2xl flex-nesw flex-col select-none hover:border-accent hover:border-3 border-secondary">
            <div className="w-full aspect-square">
                <div className="w-full h-full relative overflow-hidden">
                    <img 
                        src={dishImage}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover object-center z-0"
                    />
                </div>
            </div>

            <div className="flex flex-col w-full">
                <p className="w-full h-1/2 text-primary">{dishName}</p>
                <div className="w-full h-1/2 flex flex-row justify-between items-center">   
                    <span className="text-lg text-accent">${dishPrice.toFixed(2)}</span>
                    <span 
                        className="material-symbols-outlined !p-1 bg-accent text-light !text-1xl rounded-lg hoverBtn"
                        onClick={onShowOption}
                    >
                        shopping_cart
                    </span>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;