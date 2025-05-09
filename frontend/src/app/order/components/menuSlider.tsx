'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface MenuSliderProps {
  onSelectType: (type: string) => void;
}

const MenuSliderData = [
  { icon: "grid_on", title: "All", subtitle: "123 items", dishType: "All" },
  { icon: "fastfood", title: "Fast Food", subtitle: "23 items", dishType: "FastFood" },
  { icon: "ramen_dining", title: "Soup", subtitle: "8 items", dishType: "Soup" },
  { icon: "rice_bowl", title: "Breakfast", subtitle: "13 items", dishType: "FastFood" },
  { icon: "kebab_dining", title: "Grilled", subtitle: "42 items", dishType: "Grilled" },
  { icon: "grocery", title: "Juice", subtitle: "35 items", dishType: "Juice" },
  { icon: "local_bar", title: "Soda", subtitle: "35 items", dishType: "Soda" },
];

export default function MenuSlider({ onSelectType }: MenuSliderProps) {
  return (
    <div className="w-full h-2/10 flex flex-col items-center justify-center">
      <Swiper
        spaceBetween={20}
        slidesPerView={2} // Default for mobile
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
        pagination={{ clickable: true }}
        scrollbar={{ draggable: false }}
        loop={false}
        className="w-[95%] h-full !p-2"
      >
        {MenuSliderData.map((item, index) => (
          <SwiperSlide
            key={index}
            className="select-none text-light border-2 border-secondary rounded-2xl hover:border-red-500"
            onClick={() => onSelectType(item.dishType)}
          >
            <div className="w-full h-full text-center flex-nesw flex-col text-primary hover:text-accent">
              <span className="material-symbols-outlined text-3xl md:text-4xl lg:text-5xl">
                {item.icon}
              </span>
              <p className="text-base md:text-lg lg:text-xl">{item.title}</p>
              <p className="text-sm md:text-base text-zinc-400">{item.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
