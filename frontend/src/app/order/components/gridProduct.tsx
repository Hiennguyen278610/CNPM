'use client';

import { useEffect, useState } from 'react';
import { Dish, dishService } from '../services/dish.service';
import OrderItem from '@/app/order/components/orderItem';
import OptionPage from '@/app/option/page';
import { useCart } from '@/context/CartContext';

interface GridProductProps {
    onAddToCart: (item: any) => void;
    selectedType?: string;
}

interface MenuCategory {
    dishType: string;
    List: Dish[];
}

export default function GridProduct({ onAddToCart, selectedType }: GridProductProps) {
    const { addToCart } = useCart();
    const [menuList, setMenuList] = useState<MenuCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showOption, setShowOption] = useState(false);
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                setLoading(true);
                setError(null);
                const dishes = await dishService.getAllDishes();
                console.log('Raw dishes from API:', dishes); // Log dữ liệu thô từ API
                // Lọc các món có _id hợp lệ
                const validDishes = dishes.filter(dish => dish._id && /^[0-9a-fA-F]{24}$/.test(dish._id));
                console.log('Valid dishes after filtering:', validDishes); // Log danh sách hợp lệ
                const groupedDishes = validDishes.reduce((acc, dish) => {
                    const category = acc.find(item => item.dishType === dish.dishType);
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

    const handleShowOption = (dish: Dish) => {
        console.log('Selected dish for options:', dish); // Log món được chọn
        if (!dish._id || !/^[0-9a-fA-F]{24}$/.test(dish._id)) {
            console.error('Cannot show options: invalid dish _id', dish);
            alert(`Không thể thêm món "${dish.dishName}" vì ID không hợp lệ: ${dish._id}`);
            return;
        }
        setSelectedDish(dish);
        setShowOption(true);
    };

    const filteredList =
        selectedType && selectedType !== 'All'
            ? menuList.filter(item => item.dishType === selectedType)
            : menuList;

    // Gộp tất cả món ăn thành một danh sách phẳng
    const allDishes = filteredList.flatMap(item => item.List);

    if (loading) return <div className="p-4">Đang tải...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (filteredList.length === 0) return <div className="p-4">Không có món ăn nào trong danh mục này</div>;

    return (
        <>
            {/* Xóa tiêu đề dư thừa, chỉ hiển thị lưới món ăn */}
            <div className="w-full h-auto p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {allDishes.map(dish => (
                    <OrderItem
                        key={dish._id || dish.dishName}
                        dishName={dish.dishName}
                        dishPrice={dish.dishPrice}
                        dishImg={dish.dishImg || 'placeholder.png'}
                        onShowOption={() => handleShowOption(dish)}
                    />
                ))}
            </div>

            {showOption && selectedDish && (
                <OptionPage
                    dishId={selectedDish._id}
                    show={showOption}
                    onClose={() => setShowOption(false)}
                    dishName={selectedDish.dishName}
                    dishPrice={selectedDish.dishPrice}
                    dishImage={selectedDish.dishImg || 'placeholder.png'}
                    _id={selectedDish._id}
                    onAddToCart={onAddToCart}
                />
            )}
        </>
    );
}