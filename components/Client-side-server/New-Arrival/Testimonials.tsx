'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useState } from 'react';
import Image from 'next/image';
import {ChevronLeft,ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  profile_picture: string;
  testimonial: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialSliderClient({ testimonials }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 3,
      spacing: 20,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div className="relative py-5  bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: "url('Vector.png')"
    }}>
      <h2 className="text-2xl md:text-[48px] mb-6 text-center font-playfair" style={{color:"#3E3E3E"}}>WHAT OUR USERS ARE SAYING</h2>

      <div ref={sliderRef} className="keen-slider">
        {testimonials.map((t) => (
          <div key={t.id} className="keen-slider__slide flex justify-center">
            <div className="bg-white p-6 rounded-xl text-center shadow w-[90%] max-w-md">

              <div className='flex items-center justify-center gap-2'>
              <div className="w-20 h-20  mb-4 rounded-full overflow-hidden border-2 border-orange-400">
                <Image
                  src={`https://nxadmin.consociate.co.in${t.profile_picture}`}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
                </div>

                <div>
                  <p className="font-semibold text-lg">{t.name}</p>
                  <div className="text-yellow-500 text-sm sm:text-base whitespace-nowrap">
                    ★★★★<span className="text-gray-300">★</span>
                  </div>
                </div>
          

              </div>
       
              <p className="text-gray-600 text-sm mb-4">"{t.testimonial}"</p>
           
              <p className="text-orange-500 text-sm">{t.designation}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6 items-center">
      <div className="h-px flex-1 bg-gray-300" />
        <button
          onClick={() => instanceRef.current?.prev()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white-200 shadow hover:bg-gray-300"
        >
                   <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white-200 shadow hover:bg-gray-300"
        >
             <ChevronRight size={24} />
        </button>
        <div className="h-px flex-1 bg-gray-300" />
      </div>
    </div>
  );
}
