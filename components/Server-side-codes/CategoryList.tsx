// No "use client" here

interface Category {
  id: string;
  name: string;
  slug:string
}

const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <li
          key={category.id}
          className="p-4 border rounded hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">{category.name}</h2>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
