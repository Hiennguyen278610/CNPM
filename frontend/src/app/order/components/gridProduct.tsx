'use client';

import { useEffect, useState } from 'react';
import { Dish, dishService } from '../services/dish.service';
import { inventoryService } from '../services/inventory.service';
import OrderItem from '@/app/order/components/orderItem';
import OptionPage from '@/app/option/page';
import { CartItemProps, useCart } from '@/context/CartContext';
import { AnimatePresence } from 'framer-motion';


interface ExtendedDish extends Dish {
  outOfStock: boolean;
}

interface MenuCategory {
  dishType: string;
  List: ExtendedDish[];
}

interface GridProductProps {
  onAddToCart: (item: CartItemProps) => void;
  selectedType?: string;
}


export default function GridProduct({ onAddToCart, selectedType }: GridProductProps) {
  const [menuList, setMenuList] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOption, setShowOption] = useState(false);
  const [selectedDish, setSelectedDish] = useState<ExtendedDish | null>(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        setError(null);
        const dishes = await dishService.getAllDishes();
        console.log('Raw dishes from API:', dishes);

        // Lọc các món có _id hợp lệ
        const validDishes = dishes.filter(
          (dish) => dish._id && /^[0-9a-fA-F]{24}$/.test(dish._id)
        );
        console.log('Valid dishes after filtering:', validDishes);

        // Kiểm tra tồn kho cho từng món
        const dishesWithStockStatus = await Promise.all(
          validDishes.map(async (dish) => {
            try {
              const issues = await inventoryService.checkDishStock(dish._id, 1);
              return { ...dish, outOfStock: issues.length > 0 };
            } catch (err) {
              console.error(`Lỗi kiểm tra tồn kho cho món ${dish.dishName}:`, err);
              return { ...dish, outOfStock: true }; // Giả sử hết hàng nếu kiểm tra thất bại
            }
          })
        );

        // Nhóm các món theo danh mục
        const groupedDishes = dishesWithStockStatus.reduce((acc, dish) => {
          const category = acc.find((item) => item.dishType === dish.dishType);
          if (category) {
            category.List.push(dish);
          } else {
            acc.push({ dishType: dish.dishType, List: [dish] });
          }
          return acc;
        }, [] as MenuCategory[]);

        setMenuList(groupedDishes);
      } catch (err: any) {
        console.error('Lỗi khi lấy món ăn:', err);
        setError(`Không thể tải danh sách món ăn: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const handleShowOption = (dish: ExtendedDish) => {
    console.log('Selected dish for options:', dish);
    if (!dish._id || !/^[0-9a-fA-F]{24}$/.test(dish._id)) {
      console.error('Cannot show options: invalid dish _id', dish);
      alert(`Không thể thêm món "${dish.dishName}" vì ID không hợp lệ: ${dish._id}`);
      return;
    }
    if (dish.outOfStock) {
      alert(`Món "${dish.dishName}" hiện đã hết nguyên liệu. Vui lòng chọn món khác.`);
      return;
    }
    setSelectedDish(dish);
    setShowOption(true);
  };

  const filteredList =
    selectedType && selectedType !== 'All'
      ? menuList.filter((item) => item.dishType === selectedType)
      : menuList;

  if (loading) return <div className="!p-4">Đang tải...</div>;
  if (error) return <div className="!p-4 text-red-500">{error}</div>;
  if (filteredList.length === 0) return <div className="!p-4">Không có món ăn nào trong danh mục này</div>;

  return (
    <>
      {filteredList.map((item) => (
        <div key={item.dishType} className="w-full !mb-6">
          {/* Tiêu đề loại món ăn */}
          <div className="flex items-center w-full !my-2 !px-2">
            <span className="text-2xl font-semibold text-black whitespace-nowrap !mr-4">
              {item.dishType}
            </span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>

          {/* Grid các món ăn trong loại đó */}
          <div className="w-full h-auto !p-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {item.List.map((dish) => (
              <OrderItem
                key={dish._id}
                dish={dish}
                onShowOption={() => handleShowOption(dish)}
              />
            ))}
          </div>
        </div>
      ))}

      <AnimatePresence>
      {/* Hiển thị form chọn option */}
      {showOption && selectedDish && (
        <OptionPage
          dish={selectedDish}
          _id={selectedDish._id}
          onClose={() => setShowOption(false)}
          onAddToCart={onAddToCart}
        />
      )}
      </AnimatePresence>
    </>
  );
}