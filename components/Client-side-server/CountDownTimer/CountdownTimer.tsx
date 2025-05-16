"use client";

import React, { useEffect, useState } from "react";

const targetDate = new Date("2025-12-31T23:59:59").getTime();

export default function CountdownTimer() {
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
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((item, index, array) => (
        <div key={index} className="flex items-center gap-2 sm:gap-4">
          <div className="text-white text-center">
            <p className="text-3xl sm:text-4xl font-bold">{item.value}</p>
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
    </>
  );
}
