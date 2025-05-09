'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MenuLeftHead from "@/app/order/components/menuLeftHead";
import GridProduct from "@/app/order/components/gridProduct";
import MenuSlider from "@/app/order/components/menuSlider";
import MenuRightHead from "@/app/order/components/menuRightHead";
import CartList from "@/app/order/components/cartList";
import CartFooter from "@/app/order/components/cartFooter";
import "@/app/globals.css";

export default function OrderLayout() {

    const [cartItems, setCartItems] = useState<any[]>([]);
    const router = useRouter();

    //Hàm kiểm tra xem dish (gồm các options) đã tồn tại trong Cart chưa :
    function isSameCartItem(a: any, b: any) {
        return (
          a.dishName === b.dishName &&
          a.dishImage === b.dishImage &&
          JSON.stringify(a.options) === JSON.stringify(b.options) 
        );
      }

      //Xử lý thêm vào giỏ hàng 
      const handleAddToCart = (item: any) => {
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
      const handleIncrement = (index: number) => {
        const newItems = [...cartItems];
        newItems[index].quantity += 1;
        setCartItems(newItems);
      };
      
      //Hàm xử lý nút giảm số lượng :
      const handleDecrement = (index: number) => {
        const newItems = [...cartItems];
        if (newItems[index].quantity > 1) {
          newItems[index].quantity -= 1;
          setCartItems(newItems);
        }
      };
      

      //Hàm xử lý xóa món khỏi giỏ hàng :
      const handleDelete = (item:any) => {
        const updatedCart = cartItems.filter( cartItem => {
            return !isSameCartItem(item, cartItem)
        })
        setCartItems(updatedCart)
      }
      
      const totalPrice = cartItems.reduce((sum, dish) => {
        const optionsPrice = dish.options?.reduce( (optionSum: number, option : any)=> {
          return optionSum + option.price
        },0) || 0
        return sum + (dish.dishPrice + optionsPrice)* dish.quantity;
      }, 0);

      const cartQuantity = cartItems.reduce((totalQuantity, dish) => {
        return totalQuantity + dish.quantity
      },0)


    return (
        <div className="h-screen w-screen overflow-hidden flex flex-row">
            <div className="w-[65%] h-full bg-transparent flex flex-col">
                <MenuLeftHead onClick={() => router.push('/')}/>

                <div className="w-full h-9/10 bg-transparent overflow-y-scroll ">
                    <MenuSlider />

                    <div className="w-full h-1/12 flex-nesw gap-4 !p-2">
                        <legend className="text-center !text-2xl text-primary px-2 select-none">Sea Food</legend>
                        <div className="h-px bg-dark flex-1"></div>
                    </div>

                    <GridProduct onAddToCart={handleAddToCart} />
                </div>

            </div>
            <div className="w-[35%] h-full bg-white flex flex-col">
                <MenuRightHead cartItems={cartQuantity}/>
                <CartList 
                    items={cartItems}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onDelete={handleDelete}
                />

                <CartFooter
                    onClick={() => router.push('/order/payment')}
                    totalPrice={totalPrice}
                />
            </div>
        </div>
    );
}