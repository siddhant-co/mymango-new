import ProductClient from "./ProductClient"; // Import your client component
import { Product } from "@/types/Products";

interface Props {
  params: { slug: string };
}

export default async function ProductPage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/info/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-center text-red-500 mt-20">Error loading product.</div>;
  }

  const product: Product = await res.json();

  return <ProductClient product={product} />;
}
