'use client';
import { Dish } from '../services/dish.service';

interface OrderItemProps {
  dish: Dish & { outOfStock?: boolean }; // Extend Dish to include outOfStock
  onShowOption?: () => void;
}

export default function OrderItem({ dish, onShowOption }: OrderItemProps) {
  const { dishName, dishPrice, dishImg, outOfStock } = dish;
  const imageSrc = dishImg ? `/product/${dishImg}` : '/product/placeholder.png';

  return (
    <div className="border-2 !p-2 !m-1 rounded-2xl flex flex-col select-none hover:border-accent hover:border-3 border-secondary relative overflow-hidden">
      {/* Overlay "Hết hàng" */}
      {outOfStock && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <span className="text-red-700 text-2xl font-bold rotate-10" style={{ textShadow: '0 0 2px white, 0 0 2px white' }}>
            OUT OF STOCK
          </span>
        </div>
      )}

      <div className="w-full aspect-square">
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={imageSrc}
            alt={dishName}
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
        </div>

      </div>
      <p className="w-full h-1/2 text-primary !py-2">{dishName}</p>
      <div className="flex flex-col w-full">
        
        <div className="w-full h-1/2 flex flex-row justify-between items-center">
          <span className="text-lg text-accent">${dishPrice.toFixed(2)}</span>
          {onShowOption && !outOfStock && (
            <span
              className="material-symbols-outlined !p-1 bg-accent text-light !text-1xl rounded-lg hoverBtn"
              onClick={onShowOption}
            >
              shopping_cart
            </span>
          )}
        </div>
      </div>
    </div>
  );
}