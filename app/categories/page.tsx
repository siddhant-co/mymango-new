import Image from 'next/image';
import Link from 'next/link';  // Import Link

import type { ApiResponse, Category } from '@/types/Category';

export default async function CategoriesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/frontend/categories/`, {
    next: { revalidate: 60 },
  });
  const data: ApiResponse = await res.json();

  const categories = data.product_categories;

  return (
    <div className="p-4 mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
      {categories.map((cat: Category) => (
        <Link key={cat.id} href={`/categories/${cat.slug}`} passHref>
          <a className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}`}
                alt={cat.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{cat.heading}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {cat.description.slice(0, 100)}...
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
