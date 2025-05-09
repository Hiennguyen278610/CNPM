interface CartItemProps {
  dishName: string;
  dishPrice: number;
  dishQuantity: number;
  dishOptions: {
    id: number;
    label: string;
    price: number;
  }[];
}
export default function CartItemPayment({
  dishName,
  dishPrice,
  dishQuantity,
  dishOptions = [],
}: CartItemProps) {
  return (
    <div className="cart-item h-auto flex flex-r !border-2 rounded-3xl bg-light shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
      <div className="w-full h-full flex flex-col !px-5 !py-2 !mb-2">
        <div className="w-full h-1/3 text-xl select-none flex justify-between">
          <span>{dishName}</span>
          <span className="text-accent text-lg select-none">
            {" "}
            [ x{dishQuantity} ]
          </span>
        </div>
        <span className="text-sml text-gray-400">
          Add :{" "}
          {dishOptions.length === 0
            ? "None"
            : dishOptions.map((option, index) => (
                <span key={index}>
                  {option.label}
                  {index < dishOptions.length - 1 && ", "}
                </span>
              ))}
        </span>
        <div className="w-full h-2/3 flex flex-row justify-between items-center">
          <span className="text-lg select-none">
            price: ${dishPrice.toFixed(2)}
          </span>
          <div className="flex flex-row gap-2">
            <span className="text-accent text-lg select-none">
              ${(dishPrice * dishQuantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
