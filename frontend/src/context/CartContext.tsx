"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Dish } from "@/app/order/services/dish.service";
import { Option } from "@/app/order/services/option.service";

interface CartContextType {
  cartItems: CartItemProps[];
  addToCart: (item: CartItemProps) => void;
  increaseItem: (index: number) => void;
  decreaseItem: (index: number) => void;
  deleteItem: (index: number) => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);
export const useCart = () => useContext(CartContext);

export interface CartItemProps {
  dish: Dish;
  quantity: number;
  selectedOptions: Option[];
  totalPrice: number;
  maxQuantity: number;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  useEffect(() => {
    console.log("Cart items changed:", cartItems);
  }, [cartItems]);

  const normalizeOptions = (options: Option[]) =>
    JSON.stringify(
      [...options].sort((a, b) => a._id.localeCompare(b._id))
  );

  // Kiểm tra item giống nhau: same dish ID + same selected options
  function isSameCartItem(a: CartItemProps, b: CartItemProps) {
    if (!a.dish || !b.dish) return false;
    return (
      a.dish._id === b.dish._id &&
      normalizeOptions(a.selectedOptions) === normalizeOptions(b.selectedOptions)
    );
  }

  // Thêm món vào giỏ hàng
  const addToCart = (item: CartItemProps) => {
    const existedItemIndex = cartItems.findIndex(p => isSameCartItem(p, item));

    if (existedItemIndex !== -1) {
      const existedItem = cartItems[existedItemIndex];
      if (existedItem.quantity >= existedItem.maxQuantity) {
        alert(`Max quantity in stock : ${existedItem.maxQuantity}`);
        return;
      }
      const updatedCart = cartItems.map((p, i) => {
        if (i === existedItemIndex) {
      
          return {
            ...p,
            quantity: p.quantity + item.quantity, // cộng thêm số lượng đúng
            selectedOptions: item.selectedOptions,
            totalPrice: item.totalPrice, // cập nhật totalPrice nếu option khác
          };
        }
        return p;
      });
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item }]);
    }
  };

  // Tăng số lượng
  const increaseItem = (index: number) => {
    const newItems = [...cartItems];
    if(newItems[index].quantity >= newItems[index].maxQuantity) {
      alert(`Max quantity in stock : ${newItems[index].maxQuantity}`);
    }
    else{
      newItems[index].quantity += 1;
      setCartItems(newItems);
    }
  };

  // Giảm số lượng
  const decreaseItem = (index: number) => {
    const newItems = [...cartItems];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
      setCartItems(newItems);
    }
  };

  // Xoá món
  const deleteItem = (index: number) => {
    setCartItems(items => items.filter((_, i) => i !== index));
  };

  // Tổng giá
  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  };

  // Tổng số lượng
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseItem,
        decreaseItem,
        deleteItem,
        getTotalPrice,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
