import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { fetchCategories } from "~/api/categories";

export const loader: LoaderFunction = async () => {
  return fetchCategories();
};

export default function Shop() {
  const categories = useLoaderData<string[]>();

  console.log(categories);

  return (
    <div>
      <div>
        <h2>Shop</h2>
        {categories.map((category) => (
          <div key={category}>{category}</div>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
