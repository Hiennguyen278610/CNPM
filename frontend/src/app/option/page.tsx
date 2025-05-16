"use client";

import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import {
  optionService,
  GroupOption,
  Option,
} from "../order/services/option.service";

import { inventoryService } from "../order/services/inventory.service";

interface Dish {
    _id: string;
    dishName: string;
    dishPrice: number;
    dishImg: string;
    dishType: string;
}

interface OptionProps {
  dish: Dish
  onClose: () => void;
  onAddToCart: (item: any) => void;
  _id: string; // Thêm _id để khớp với props từ GridProduct.tsx
}

interface OptionItem {
  id: string;
  name: string;
  price: number; // from backend
}

export default function OptionPage({
  dish,
  onClose,
  onAddToCart,
}: OptionProps) {

  const { _id: dishId, dishName, dishPrice, dishImg, dishType } = dish;

  const [totalPrice, setTotalPrice] = useState(dishPrice);
  const [checked, setChecked] = useState<string[]>([]);
  const [groupOptions, setGroupOptions] = useState<GroupOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);


  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const groupOptions: GroupOption[] =
          await optionService.getGroupOptionsByDishId(dishId);
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
    groupOptions.forEach((group) => {
      group.optionID.forEach((option) => {
        if (checked.includes(option._id))
          optionsPrice += Number(option.optionPrice) || 0;
      });
    });
    setTotalPrice((base + optionsPrice));
  }, [checked]);

  const handleCheck = (id: string) => {
    const isCheck = checked.includes(id);
    if (isCheck) {
      setChecked((prev) => prev.filter((item) => item !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  useEffect(() => {
    // Fetch maxQuantity khi mở OptionPage
    const fetchMaxQuantity = async () => {
      try {
        const qty = await inventoryService.getMaxDishQuantity(dish._id);
        setMaxQuantity(qty);
      } catch (error) {
        setMaxQuantity(1);
      }
    };
    fetchMaxQuantity();
  }, [dish._id]);

  useEffect(() => {
  if (!loading && groupOptions.length === 0 && maxQuantity > 0) {
    onAddToCart({
      dish,
      quantity: 1,
      selectedOptions: [],
      totalPrice: totalPrice,
      maxQuantity
    });
    onClose();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [groupOptions, loading, maxQuantity]);

  // if (loading)
  //   return (
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
  //       <div className="bg-white p-4 rounded-lg">Loading options...</div>
  //     </div>
  //   );

  if(groupOptions.length === 0) return null;
  return (
    
    <div className="fixed inset-0 z-[100] ">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Modal content */}
      <div className="relative flex justify-center items-center w-full h-full">
        {/* Modal body */}
        <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-blue-100 rounded-lg shadow-lg"
        >
        <div className="bg-blue-100 rounded-lg shadow-lg">
          {/* Modal inner */}
          <div>
            {/* Option form */}
            <div>
              {/* Option form header */}
              <div className="flex items-start !p-3 !mt-6 bg-white shadow-sm w-full max-w-xl">
                <img
                  src={`/product/${dishImg}`}
                  alt="Hamburger"
                  className="w-24 h-24 !mr-4 object-cover rounded-md"
                />
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 !mr-5">
                      {dishName}
                    </h2>
                    <span className="text-xl text-black">${dishPrice}</span>
                  </div>
                  <p className="text-sm text-gray-600 !mt-3 md:block ">
                    Please select the accompaniments to make your dish more delicious.
                  </p>
                </div>
              </div>

              {/* Option form body */}
              <div className="flex flex-col bg-white !p-4 !mt-2 md:!mt-3">
                {groupOptions.length === 0 ? (
                  <div className="text-gray-400 italic text-center">
                    Không có lựa chọn thêm cho món này
                  </div>
                ) : (
                  groupOptions.map((group) => {
                    const uniqueOptions = group.optionID.filter(
                      (opt, idx, arr) =>
                        arr.findIndex((o) => o._id === opt._id) === idx
                    );
                    return (
                      <div key={group._id} className="!mb-1">
                        <h1 className="text-lg font-semibold !mb-1">
                          Seasonings
                        </h1>
                        <div className="flex flex-col">
                          {uniqueOptions.map((option) => (
                            <div
                              key={option._id}
                              className="flex justify-between items-center"
                            >
                              <div className="flex items-center !my-1">
                                <input
                                  type="checkbox"
                                  className="scale-125"
                                  checked={checked.includes(option._id)}
                                  onChange={() => handleCheck(option._id)}
                                />
                                <span className="!ml-2 text-sm md:text-lg">
                                  {option.optionName}
                                </span>
                              </div>
                              <span className="text-sm text-black">
                                ${option.optionPrice}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="!mt-2 !p-2 bg-white flex flex-col rounded-lg shadow-lg">
                <div className="flex justify-center items-center !mb-2">
                  <input
                    type="text"
                    placeholder="Note to the kitchen"
                    className="bg-blue-50 w-full !p-2.5 rounded-md"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <h1 className="text-xl">Total : </h1>
                  <h3 className="text-red-600 text-xl">
                    ${totalPrice.toFixed(2)}
                  </h3>
                </div>

                <div className="flex flex-row justify-center item !mt-0.5 !p-1 ">
                  <button
                    className="bg-gray-300 text-black rounded-2xl w-[160px] !py-1 !mx-1 hover:bg-gray-400 transition"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white rounded-2xl w-[160px] !py-1 !ml-1 hover:bg-red-800 transition"
                    onClick={() => {
                      // Lấy đúng Option[] đã chọn
                      const selectedOptions: Option[] = [];
                      groupOptions.forEach((group) => {
                        group.optionID.forEach((option) => {
                          if (checked.includes(option._id))
                            selectedOptions.push(option);
                        });
                      });
                      onAddToCart({
                        dish: dish,
                        quantity:1,
                        selectedOptions,
                        totalPrice : totalPrice,
                        maxQuantity
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
        </motion.div>
      </div>
    </div>
  );
}
