'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MenuSliderData = [
    {icon: "grid_on", title: "All", subtitle: "123 items"},
    {icon: "egg_alt", title: "Deep Fried", subtitle: "12 items"},
    {icon: "fastfood", title: "Fast Food", subtitle: "23 items"},
    {icon: "ramen_dining", title: "soup", subtitle: "8 items"},
    {icon: "rice_bowl", title: "Breakfast", subtitle: "13 items"},
    {icon: "kebab_dining", title: "Grilled", subtitle: "42 items"},
    {icon: "grocery", title: "Fruitjust", subtitle: "35 items"},
    {icon: "local_bar", title: "Soda", subtitle: "35 items"},
];

export default function MenuSlider() {
    return (
        <div className="w-full h-2/10 flex flex-col items-center justify-center">
            <Swiper
                spaceBetween={20}
                slidesPerView={6}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: false }}
                loop={false}
                className="w-[95%] h-full !p-2"
            >
                {MenuSliderData.map((item, index) => (
                    <SwiperSlide key={index} 
                        className="select-none text-light border-2 border-secondary rounded-2xl hover:border-red-500">
                        <div className="w-full h-full text-center flex-nesw flex-col text-primary hover:text-accent">
                            <span className="material-symbols-outlined !text-5xl ">{item.icon}</span>
                            <p className="text-xl">{item.title}</p>
                            <p className="text-lg text-zinc-400">{item.subtitle}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}