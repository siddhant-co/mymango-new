'use client';

import { useState,useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { toast } from "react-hot-toast";
import { getCategoryProducts } from "@/app/Function";
import ProductsPage from "@/components/Client-side-server/All-products/ProductsPage";




export default function ProductClient({ product }: { product: any }) {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);


  useEffect(() => {
    async function fetchRelated() {
      if (!product.category_slug) return;  // or fallback

      const related = await getCategoryProducts(product.category_slug);
      // Filter out current product
      setRelatedProducts(related.filter(p => p.id !== product.id));
    }

    fetchRelated();
  }, [product.category_slug, product.id]);
  
  

  const tabContent: Record<string, string> = {
    description: product.description || "No description available.",
    care: product.care_instruction || "Handle with care. Clean with dry cloth.",
    warranty: product.warranty || "1 year warranty included.",
    delivery: product.delivery_info || "Delivered in 3-5 days. Free installation included.",
    reviews: product.reviews || "No reviews yet.",
  };
  const displayImage = selectedVariant?.images?.[0] || product.images?.[0];

  return (

    <>
  
    
  <div className="flex flex-col md:flex-row  w-full container py-8 px-4 mt-30">
  {/* Left Column - Image and Tabs */}
  <div className="flex-[3] justify-center">
    <div className="bg-gray-400 flex justify-center w-10/12 mx-auto">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${displayImage}`}
        alt={product.name}
        width={600}
        height={600}
        className="object-contain rounded"
        priority
      />
    </div>

     </div>

  {/* Right Column - Product Details */}
  <div className="flex-[2] w-full flex flex-col gap-4">
    <h1 className="text-4xl md:text-lg font-medium text-orange-500">{product.category_name}</h1>
    <h1 className="text-4xl font-bold">{product.name}</h1>

    <div className="flex items-center gap-4">
      <span className="text-2xl font-bold text-red-600">
        ₹{selectedVariant?.selling_price || product.selling_price}
      </span>
      {(product.base_price !== product.selling_price) && (
        <span className="line-through text-gray-400 text-lg">
          ₹{product.base_price}
        </span>
      )}
    </div>

    <p className="text-green-600 text-2xl">In stock: {product.stock}</p>

    {/* Variant Selection */}
    <div className="text-[#4a5565] text-2xl">
      Colour: {selectedVariant ? selectedVariant.specification?.colour : "None selected"}
    </div>
    <div className="flex gap-2 flex-wrap">
      {product.variant_list?.map((variant: any) => (
        <div
          key={variant.id}
          className={`w-10 h-10 rounded-full overflow-hidden border cursor-pointer hover:border-blue-500 ${
            selectedVariant?.id === variant.id ? "ring-2 ring-orange-400" : ""
          }`}
          title={variant.specification?.colour}
          onClick={() => setSelectedVariant(variant)}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${variant.images?.[0]}`}
            alt={variant.specification?.colour}
            width={50}
            height={50}
            className="object-cover"
          />
        </div>
      ))}
          </div>
          
          {/* quantity Button */}

          <div className="items-center gap-4 mt-4">
  <h1 className="text-3xl ">Quantity:</h1>
  <div className="flex justify-around border max-w-max px-10 py-4 rounded overflow-hidden mt-2 w-3xl">
    <button
      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
      className="px-3 py-1 text-3xl font-bol"
    >
      -
    </button>
    <span className="px-4 py-1 text-2xl">{quantity}</span>
    <button
      onClick={() => setQuantity(prev => prev + 1)}
      className="px-3 py-1 text-3xl font-bol"
    >
      +
    </button>
  </div>
</div>


    {/* Add to Cart */}
    <button
  className="bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 w-full mt-4"
  onClick={() => {
    const variant = selectedVariant || product;
    dispatch(
      addToCart({
        id: variant.id,
        title: product.name,
        price: variant.selling_price || product.selling_price,
        quantity,
        image: displayImage,
      })
    );
    toast.success("Added to cart!");
  }}
>
  Add to Cart
</button>

          
<button
  className="border border-orange-500 text-orange-500 py-3 rounded hover:bg-pink-50 w-full mt-4"
  onClick={() => {
    const variant = selectedVariant || product;
    dispatch(
      addToCart({
        id: variant.id,
        title: product.name,
        price: variant.selling_price || product.selling_price,
        quantity,
        image: displayImage,
      })
    );
    toast.success("Added to cart!");
    // optionally, navigate to cart or checkout page
  }}
>
  Buy Now
</button>

  </div>
</div>

      
      <div className="w-10/12 md:w-3/5 " >
      <div className="mt-5 p-7">
  <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm font-medium text-gray-600">
    <button
      onClick={() => setActiveTab("description")}
      className={`${
        activeTab === "description" ? "text-orange-500 font-bold underline" : ""
      }`}
    >
      DESCRIPTION
    </button>
    <button
      onClick={() => setActiveTab("care")}
      className={`${
        activeTab === "care" ? "text-orange-500 font-bold underline" : ""
      }`}
    >
      CARE INSTRUCTION
    </button>
    <button
      onClick={() => setActiveTab("warranty")}
      className={`${
        activeTab === "warranty" ? "text-orange-500 font-bold underline" : ""
      }`}
    >
      WARRANTY
    </button>
    <button
      onClick={() => setActiveTab("delivery")}
      className={`${
        activeTab === "delivery" ? "text-orange-500 font-bold underline" : ""
      }`}
    >
      DELIVERY, INSTALLATION AND DEMO
    </button>
    <button
      onClick={() => setActiveTab("reviews")}
      className={`${
        activeTab === "reviews" ? "text-orange-500 font-bold underline" : ""
      }`}
    >
      REVIEWS
    </button>
  </div>

  <div className="mt-4 p-4 border rounded bg-gray-50 text-gray-700 text-sm leading-relaxed">
    {tabContent[activeTab]}
  </div>
</div>
   </div>


      <div>
        
      <div className="w-full text-center">
        <h2 className="text-4xl font-semibold mb-6 ">
          More products from <span className="text-orange-500">{product.category_name}</span> Category
        </h2>
        {relatedProducts.length === 0 ? (
          <p>No related products found.</p>
        ) : (
          <ProductsPage products={relatedProducts} />
        )}
      </div>
  </div>

      </>   
  );
}
