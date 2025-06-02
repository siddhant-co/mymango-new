"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

interface Props {
  id: number;
  title: string;
  price: number;
  image: string;  // Add this prop
}

export default function AddToCartButton({ id, title, price, image }: Props) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ id, title, price, quantity: 1, image }));
  };

  return <button onClick={handleAdd}>Add to Cart</button>;
}
