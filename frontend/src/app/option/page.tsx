'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface OptionProps {
  dishName: string;
  dishPrice: number;
  dishImage: string;
  show: boolean;
  onClose: () => void;
  onAddToCart: (item: any) => void;
}

interface OptionItem {
  id: string;
  name: string;
  price: number; // from backend
}

export default function OptionPage({
  dishName,
  dishPrice,
  dishImage,
  show,
  onClose,
  onAddToCart,
}: OptionProps) {
  if (!show) return null;

  const [totalPrice, setTotalPrice] = useState(dishPrice);
  const [checked, setChecked] = useState<string[]>([]);
  const [options, setOptions] = useState<OptionItem[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:${process.env.NEXT_PUBLIC_PORT_BACK_END}/backend/api/option`)
      .then((res) => setOptions(res.data))
      .catch((err) => console.error('Error fetching options:', err));
  }, []);

  const handleCheck = (id: string, seasoningPrice: number) => {
    const isCheck = checked.includes(id);
    if (isCheck) {
      setTotalPrice((prev) => prev - seasoningPrice);
      setChecked((prev) => prev.filter((item) => item !== id));
    } else {
      setTotalPrice((prev) => prev + seasoningPrice);
      setChecked([...checked, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Modal content */}
      <div className="relative flex justify-center items-center w-full h-full !p-4">
        <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-start gap-4 !p-4">
            <img
              src={dishImage}
              alt={dishName}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
            />
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{dishName}</h2>
                <span className="text-lg sm:text-xl text-black">${dishPrice}</span>
              </div>
              <p className="text-sm text-gray-600 !mt-2 sm:mt-4">
                Optional accompaniments to make your meal more delicious.
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white !px-4 !pb-4">
            <h1 className="text-base sm:text-lg font-semibold !mb-3">Seasonings</h1>
            <div className="flex flex-col gap-1 px-2 sm:gap-5 sm:!p-2 md:gap-5 md:!p-3">
  {/*Thêm responsive vào dòng này khi width < 640px*/}
              {options.map((seasoning) => (
                <div key={seasoning.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="scale-125"
                      checked={checked.includes(seasoning.id)}
                      onChange={() => handleCheck(seasoning.id, seasoning.price)}
                    />
                    <span className="text-sm sm:text-base">{seasoning.name}</span>
                  </div>
                  <span className="text-sm text-black">${seasoning.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes & Total */}
          <div className="bg-white !p-4">
            <input
              type="text"
              placeholder="Note to the kitchen"
              className="bg-gray-100 w-full !p-2.5 rounded-md !mb-4"
            />
            <div className="flex justify-between items-center !mb-2">
              <h1 className="text-lg">Total:</h1>
              <h3 className="text-red-600 text-xl">${totalPrice.toFixed(2)}</h3>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 !mt-2">
              <button
                className="bg-gray-300 text-black rounded-2xl !px-5 !py-2 hover:bg-gray-400 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white rounded-2xl !px-5 !py-2 hover:bg-red-700 transition"
                onClick={() => {
                  const selectedOptions = checked.map((id) => options.find((s) => s.id === id));
                  onAddToCart({
                    dishName,
                    dishPrice: totalPrice,
                    dishImage,
                    options: selectedOptions,
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
  );
}
