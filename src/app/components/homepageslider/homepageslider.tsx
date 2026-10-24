"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./homepageslider.css";

import type { SlideData, HomepageSliderProps } from "./homepageslider.types";

export type { SlideData, HomepageSliderProps } from "./homepageslider.types";


const HomepageSlider:React.FC<HomepageSliderProps> = ({
  slides = [],
  autoplayDelay = 3000,
  speed = 600,
}) => {
  return (
    <div className="homepage-slider-wrapper">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        navigation
        loop
        speed={speed}
        className="homepage-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-image-container max-w-[649px] lg:max-w-[100%] hidden lg:block">
              <Image
                src={slide.image}
                alt={slide.alt}
                sizes="649px"
                width={1920}
                height={900}
                priority={slide.id === 1}
                loading={slide.id === 1 ? "eager" : "lazy"}
                className="slide-image"
              />
            </div>
            <div className="slide-image-container max-w-[649px] lg:max-w-[100%] lg:hidden">
              <Image
                src={slide.mobileimage}
                alt={slide.alt}
                sizes="649px"
                width={649}
                height={832}
                priority={slide.id === 1}
                loading={slide.id === 1 ? "eager" : "lazy"}
                className="slide-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomepageSlider;
