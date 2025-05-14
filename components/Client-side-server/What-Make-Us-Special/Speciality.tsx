"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Common-Components/Button";

type Props = {};

const Speciality = (props: Props) => {
  const targetDate = new Date("2025-12-31T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });

      if (distance < 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium text-center my-6 mb-14 tracking-widest px-4">
        DISCOVER ALL OUR PRODUCTS
      </h2>

      <section
        className="w-full overflow-hidden py-40 bg-cover sm:bg-center md:bg-center bg-no-repeat bg-left"
        style={{
          backgroundImage: `url('/WhatMakesSpecial.webp')`,
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-betn sm:justify-center gap-10 px-4 sm:px-6 md:px-0 text-white">
          {/* Left Side – Centered only for tablet and mobile */}
          <div className="w-full lg:w-1/2 flex justify-center sm:justify-center lg:justify-start"></div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 md:w-1/1 sm:w-1/2 lg:text-center md:text-center ">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-4">
              EARLY BIRD SPECIAL
            </h2>

            {/* Timer – Centered for tablet */}
            <div className="flex flex-wrap justify-center sm:justify-center md:justify-center gap-4 sm:gap-6 items-center">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index, array) => (
                <div key={index} className="flex items-center gap-2 sm:gap-4">
                  <div className="text-white text-center">
                    <p className="text-3xl sm:text-4xl font-bold">
                      {item.value}
                    </p>
                    <p className="text-xs sm:text-sm uppercase tracking-wide">
                      {item.label}
                    </p>
                  </div>
                  {index < array.length - 1 && (
                    <div className="px-2 sm:px-4">
                      <div className="h-6 w-px bg-white"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Button and Line – Centered for tablet */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-12">
              <Button
                text="Shop Now"
                className="bg-white text-black border border-black hover:bg-gray-100 px-6 py-2"
              />
              <div className="border-t border-white w-32 md:w-40 lg:w-52 mt-2 sm:mt-0"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Speciality;
