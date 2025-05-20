'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { dishService, Dish } from '../services/dish.service';

interface MenuSliderProps {
    onSelectType: (type: string) => void;
}

interface MenuSliderItem {
    icon: string;
    title: string;
    subtitle: string;
    dishType: string;
}

export default function MenuSlider({ onSelectType }: MenuSliderProps) {
    const [menuSliderData, setMenuSliderData] = useState<MenuSliderItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDishTypes = async () => {
            try {
                setLoading(true);
                const dishes = await dishService.getAllDishes();
                // Lấy danh sách dishType duy nhất và đếm số món
                const dishTypes = Array.from(new Set(dishes.map(dish => dish.dishType)));
                const sliderData: MenuSliderItem[] = [
                    {
                        icon: 'grid_on',
                        title: 'All',
                        subtitle: `${dishes.length} items`,
                        dishType: 'All',
                    },
                    ...dishTypes.map(type => {
                        const count = dishes.filter(dish => dish.dishType === type).length;
                        return {
                            icon: getIconForType(type), // Hàm ánh xạ icon
                            title: type,
                            subtitle: `${count} items`,
                            dishType: type,
                        };
                    }),
                ];
                setMenuSliderData(sliderData);
            } catch (err) {
                console.error('Lỗi khi lấy danh sách loại món:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDishTypes();
    }, []);

    // Hàm ánh xạ icon cho từng dishType (có thể tùy chỉnh theo nhu cầu)
    const getIconForType = (type: string): string => {
        const iconMap: { [key: string]: string } = {
            FastFood: 'fastfood',
            Soup: 'ramen_dining',
            Grilled: 'kebab_dining',
            Drink: 'grocery',
            // Thêm các ánh xạ khác nếu cần
        };
        return iconMap[type] || 'restaurant_menu'; // Icon mặc định
    };

    if (loading) return <div className="p-4">Đang tải danh sách loại món...</div>;

    return (
        <div className="w-full h-2/10 flex flex-col items-center justify-center md:flex-wrap">
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: false }}
                loop={false}
                className="w-[95%] h-full !p-2"
                breakpoints={{
                    640: {
                        slidesPerView: 3, // ≥ sm
                    },
                    768: {
                        slidesPerView: 4, // ≥ md
                    },
                    1024: {
                        slidesPerView: 6, // ≥ lg
                    },
                }}
            >
                {menuSliderData.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className="select-none text-light border-2 border-secondary rounded-2xl hover:border-red-500"
                        onClick={() => onSelectType(item.dishType)}
                    >
                        <div className="w-full h-full text-center flex flex-col items-center justify-center text-primary hover:text-accent">
                            <span className="material-symbols-outlined !text-5xl">{item.icon}</span>
                            <p className="text-xl">{item.title}</p>
                            <p className="text-lg text-zinc-400">{item.subtitle}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
