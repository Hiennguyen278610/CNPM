interface CometoPayment {
    totalPrice: number;
    onClick?: () => void;
}
export default function CartFooter({totalPrice, onClick }: CometoPayment) {
    return (
        <div className="w-full h-1/5 !p-2">
            <div className="w-full h-1/2">
                <div className="w-full h-2/3 flex justify-between text-primary select-none">
                    <p className="text-2xl">Total: </p>
                    <p className="text-accent text-2xl">${totalPrice.toFixed(2)}</p>
                </div>
            </div>
            <div className="w[-full h-1/2 !p-2 flex-nesw">
                <button className="bg-accent rounded-2xl !p-3 md:!p-1 w-full h-full text-light hoverBtn hover:animate-pulse" 
                onClick={onClick}>Order</button>
            </div>
        </div>
    );
}