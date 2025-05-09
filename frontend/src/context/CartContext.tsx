'use client';
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [cartItems, setCartItems] = useState<any[]>([]);

    
        //Hàm kiểm tra xem dish (gồm các options) đã tồn tại trong Cart chưa :
        function isSameCartItem(a: any, b: any) {
            return (
              a.dishName === b.dishName &&
              a.dishImage === b.dishImage &&
              JSON.stringify(a.options) === JSON.stringify(b.options) 
            );
          }
    
          //Xử lý thêm vào giỏ hàng 
        const addToCart = (item: any) => {
            console.log(item.options);
            const existingItemIndex = cartItems.findIndex(p => isSameCartItem(p, item));
            
            if (existingItemIndex !== -1) {
                const updatedCart = cartItems.map((p, i) => {
                  if (i === existingItemIndex) {
                    return { 
                      ...p, 
                      quantity: p.quantity + 1, 
                      dishOptions: item.options 
                    };
                  }
                  return p;
                });
              setCartItems(updatedCart);
            } else {
              setCartItems([...cartItems, { ...item, quantity: 1, dishOptions: item.options }]);
            }
          };
    
          //Hàm xử lý nút tăng số lượng :
        const increaseItem = (index: number) => {
            const newItems = [...cartItems];
            newItems[index].quantity += 1;
            setCartItems(newItems);
          };
          
          //Hàm xử lý nút giảm số lượng :
        const decreaseItem = (index: number) => {
            const newItems = [...cartItems];
            if (newItems[index].quantity > 1) {
              newItems[index].quantity -= 1;
              setCartItems(newItems);
            }
          };
          
    
          //Hàm xử lý xóa món khỏi giỏ hàng :
        const deleteItem = (item:any) => {
            const updatedCart = cartItems.filter( cartItem => {
                return !isSameCartItem(item, cartItem)
            })
            setCartItems(updatedCart)
          }
          
        const getTotalPrice = () => {
          return cartItems.reduce((sum, dish) => {
            return sum + dish.dishPrice * dish.quantity;
          }, 0);
        };

        const getTotalQuantity = () => {
            return cartItems.reduce((total, dish) => total + dish.quantity, 0);
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
        getTotalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
