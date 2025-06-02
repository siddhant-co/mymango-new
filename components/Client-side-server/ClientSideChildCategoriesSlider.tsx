
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface ChildCategory {
  id: number;
  image: string;
  heading: string;
  description: string;
  product_count: number;
  title: string;
  slug: string;
}

interface Props {
  childCategories: ChildCategory[];
}

export default function ClientSideChildCategoriesSlider({ childCategories }: Props) {
  return (
    <Swiper slidesPerView={3} spaceBetween={10}>
      {childCategories.map((child) => (
        <SwiperSlide key={child.id}>
          <div>
            <img src={child.image} alt={child.heading} />
            <h3>{child.heading}</h3>
            <p>{child.description.slice(0, 100)}...</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}