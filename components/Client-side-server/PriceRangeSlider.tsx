"use client";

import * as Slider from "@radix-ui/react-slider";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: number[];
  onValueChange: (value: number[]) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max, value, onValueChange }) => {
  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-semibold">
        Price Range: ₹{value[0]} - ₹{value[1]}
      </label>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={10}
        value={value}
        onValueChange={onValueChange}
      >
        <Slider.Track className="bg-gray-300 relative grow rounded-full h-[4px]">
          <Slider.Range className="absolute bg-orange-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
        <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
      </Slider.Root>
    </div>
  );
};

export default PriceRangeSlider;
