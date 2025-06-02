import { fetchProductBySlug } from "@/app/Function";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient"; // 👈 Create this file below

export default async function ProductPage(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const product = await fetchProductBySlug(id);

  if (!product) return notFound();

  return <ProductClient product={product} />;
}
