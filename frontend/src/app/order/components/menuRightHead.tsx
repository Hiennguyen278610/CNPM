
interface cartQuantity{
    cartItems: number;
    tableName : string;
}

export default function MenuRightHead({cartItems, tableName} : cartQuantity) {
    return (
        <div className="w-full h-1/10 !p-4 flex flex-row justify-between">
            <div className="w-max h-full flex-nesw flex-row select-none">   
                <span className="material-symbols-outlined !p-1 text-accent !text-5xl">shopping_cart</span>
                <p className="text-accent text-2xl">Your cart ({cartItems})</p>
            </div>
            <div className="w-max h-full bg-secondary flex-nesw !p-4 rounded-3xl">
                <p className="text-xl select-none">{tableName}</p>
            </div>
        </div>
    );
}