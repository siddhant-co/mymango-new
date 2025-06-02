'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';

interface PriceRangeSliderWrapperProps {
  min: number;
  max: number;
}

export default function PriceRangeSliderWrapper({ min, max }: PriceRangeSliderWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentMin = parseInt(searchParams.get('min_price') || `${min}`, 10);
  const currentMax = parseInt(searchParams.get('max_price') || `${max}`, 10);
  const [range, setRange] = useState<[number, number]>([currentMin, currentMax]);

  // Update URL when range changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      params.set('min_price', range[0].toString());
      params.set('max_price', range[1].toString());
      params.set('page', '1'); // Reset to first page when filtering

      router.push(`?${params.toString()}`);
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [range]);

  return (
    <PriceRangeSlider
      min={min}
      max={max}
      value={range}
      onValueChange={(newRange) => setRange(newRange as [number, number])}
    />
  );
}
