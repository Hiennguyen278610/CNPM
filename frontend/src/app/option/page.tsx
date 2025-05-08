'use client';
import React, { useState } from 'react';

const seasonings = [
    {id:1,label:"Spicy", price:0.0},
    {id:2,label:"Cheese", price: 0.2},
    {id:3,label:"Egg", price: 0.3},
    {id:4,label:"Sausage", price: 0.8},
    {id:5,label:"Baecon", price: 0.5}
]


interface OptionProps {
  dishName: string;
  dishPrice: number;
  dishImage: string
  show:boolean;
  onClose: () => void
  onAddToCart: (item:any) => void
}

export default function OptionPage({
    dishName,
    dishPrice,
    dishImage,
    show,
    onClose,
    onAddToCart
  }: OptionProps) {

  if(!show) return null;
  const [totalPrice, setTotalPrice] = useState(dishPrice);
  const [checked, setChecked] = useState<number[]>([]);

  const handleCheck = (id:number ,seasoningPrice: number) => {
    const isCheck = checked.includes(id)

    if(isCheck){
      setTotalPrice(prev => prev-seasoningPrice)
      setChecked(prev => prev.filter(item => item !== id))
    }
    else{
      setTotalPrice(prev => prev+seasoningPrice)
      setChecked([...checked, id])
    }
  }
  

  return (
        <div className="fixed inset-0 z-50">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      
        {/* Modal content  */}
        <div className="relative flex justify-center items-center w-full h-full">
            {/*Modal body */}
          <div className= "bg-blue-100 rounded-lg shadow-lg">
            {/*Modal inner*/}
            <div>
                
                {/* Option form */}
                <div>
                    {/*Option form header*/}
                    <div className="flex items-start !p-3 !mt-6 bg-white shadow-sm w-full max-w-xl">               
                        <img
                            src={dishImage} 
                            alt="Hamburger"
                            className="w-24 h-24 !mr-4 object-cover rounded-md"
                        />
                        <div className="flex flex-col flex-grow">
                            <div className="flex justify-between items-start">
                                <h2 className="text-2xl font-semibold text-gray-800">{dishName}</h2>
                                <span className="text-lg font-semibold text-gray-700">${dishPrice}</span>
                            </div>
                            <p className="text-sm text-gray-600 !mt-6">
                                Hambuger so harm for you, let anti hambuger, please hambuger so boring, hambuger áo so hot
                            </p>
                        </div>
                    </div>

                    {/*Option form body */}
                    <div className="flex flex-col bg-white !p-3 !mt-3">
                        <h1 className="text-lg font-semibold !mb-4">Seasonings</h1>

                        <div className="flex flex-col">
                            {seasonings.map((seasoning, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center !my-1.5">
                                    <input 
                                      type="checkbox" className='scale-125' 
                                      checked={checked.includes(seasoning.id)}
                                      onChange={()=>handleCheck(seasoning.id ,seasoning.price)}
                                    />
                                    <span className="!ml-2">{seasoning.label}</span>
                                </div>
                                <span className="text-sm text-black">${seasoning.price}</span>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className='!mt-3 !p-3 bg-white flex flex-col rounded-lg shadow-lg'>

                        <div className='flex justify-center items-center !mb-4'> 
                            <input type='text' placeholder='Note to the kitchen'  className='bg-blue-50 w-full !p-2.5 rounded-md' />
                        </div>

                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl'>Total : </h1>
                            <h3 className='text-red-600 text-2xl'>${totalPrice.toFixed(2)}</h3>
                        </div>

                        <div className='flex flex-row justify-end item !mt-2 !p-1'>
                            <button 
                                className='bg-gray-300 text-black rounded-2xl w-[160px] !py-1 !mx-1 hover:bg-gray-400 transition'
                                onClick={onClose}    
                            >
                                    Cancel
                            </button>
                            <button 
                              className='bg-red-500 text-white rounded-2xl w-[160px] !py-1 !ml-1 hover:bg-red-800 transition'
                              onClick={() => {
                                const selectedOptions = checked.map(id => seasonings.find(s => s.id === id));
                                onAddToCart({
                                  dishName,
                                  dishPrice: totalPrice,
                                  dishImage,
                                  options: selectedOptions
                                });
                                onClose();
                              }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

            </div>

          </div>
        </div>
      </div>
)}

