'use client';

import React, { useState, useEffect } from 'react';
import { optionService, GroupOption, Option } from '../order/services/option.service';

interface OptionProps {
  dishId: string; // Giữ dishId để khớp với logic hiện tại
  dishName: string;
  dishPrice: number;
  dishImage: string;
  show: boolean;
  onClose: () => void;
  onAddToCart: (item: any) => void;
  _id: string; // Thêm _id để khớp với props từ GridProduct.tsx
}

interface OptionItem {
  id: string;
  name: string;
  price: number; // từ backend đang là string
}

export default function OptionPage({
  dishId,
  dishName,
  dishPrice,
  dishImage,
  show,
  onClose,
  onAddToCart,
  _id, // Sử dụng _id từ props
}: OptionProps) {
  if (!show) return null;

  const [totalPrice, setTotalPrice] = useState(dishPrice);
  const [checked, setChecked] = useState<string[]>([]);
  const [groupOptions, setGroupOptions] = useState<GroupOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const groupOptions: GroupOption[] = await optionService.getGroupOptionsByDishId(dishId);
        setGroupOptions(groupOptions);
      } catch (err) {
        setGroupOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, [dishId]);

  useEffect(() => {
    let base = Number(dishPrice) || 0;
    let optionsPrice = 0;
    groupOptions.forEach(group => {
      group.optionID.forEach(option => {
        if (checked.includes(option._id)) optionsPrice += Number(option.optionPrice) || 0;
      });
    });
    setTotalPrice((base + optionsPrice) * quantity);
  }, [checked, quantity, groupOptions, dishPrice]);

  const handleCheck = (id: string) => {
    const isCheck = checked.includes(id);
    if (isCheck) {
      setChecked(prev => prev.filter(item => item !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-4 rounded-lg">Loading options...</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Modal content */}
      <div className="relative flex justify-center items-center w-full h-full">
        {/* Modal body */}
        <div className="bg-blue-100 rounded-lg shadow-lg">
          {/* Modal inner */}
          <div>
            {/* Option form */}
            <div>
              {/* Option form header */}
              <div className="flex items-start !p-3 !mt-6 bg-white shadow-sm w-full max-w-xl">               
                <img
                  src={`/product/${dishImage}`} 
                  alt="Hamburger"
                  className="w-24 h-24 !mr-4 object-cover rounded-md"
                />
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 !mr-5">{dishName}</h2>
                    <span className="text-xl text-black">${dishPrice}</span>
                  </div>
                  <p className="text-sm text-gray-600 !mt-6">
                    Optional accompaniments to make your meal become more delicious
                  </p>
                </div>
              </div>

              {/* Option form body */}
              <div className="flex flex-col bg-white !p-3 !mt-3">
                {groupOptions.length === 0 ? (
                  <div className="text-gray-400 italic text-center">Không có lựa chọn thêm cho món này</div>
                ) : (
                  groupOptions.map((group) => {
                    const uniqueOptions = group.optionID.filter((opt, idx, arr) => arr.findIndex(o => o._id === opt._id) === idx);
                    return (
                      <div key={group._id} className="mb-4">
                        <h1 className="text-lg font-semibold !mb-2">{group.optionGroupName}</h1>
                        <div className="flex flex-col">
                          {uniqueOptions.map((option, index) => (
                            <div key={option._id} className="flex justify-between items-center">
                              <div className="flex items-center !my-1.5">
                                <input 
                                  type="checkbox" 
                                  className='scale-125' 
                                  checked={checked.includes(option._id)}
                                  onChange={() => handleCheck(option._id)}
                                />
                                <span className="!ml-2">{option.optionName}</span>
                              </div>
                              <span className="text-sm text-black">${option.optionPrice}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className='!mt-3 !p-3 bg-white flex flex-col rounded-lg shadow-lg'>
                <div className='flex justify-center items-center !mb-4'> 
                  <input type='text' placeholder='Note to the kitchen' className='bg-blue-50 w-full !p-2.5 rounded-md' />
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
                      // Lấy đúng Option[] đã chọn
                      const selectedOptions: Option[] = [];
                      groupOptions.forEach(group => {
                        group.optionID.forEach(option => {
                          if (checked.includes(option._id)) selectedOptions.push(option);
                        });
                      });
                      onAddToCart({
                        dish: {
                          _id: _id, // Sử dụng _id từ props thay vì dishId
                          dishName,
                          dishPrice,
                          dishImg: dishImage
                        },
                        quantity,
                        selectedOptions
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
  );
}