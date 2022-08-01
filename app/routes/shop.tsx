import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, NavLink } from "@remix-run/react";
import { fetchCategories } from "~/api/categories";

export const loader: LoaderFunction = async () => {
  return fetchCategories();
};

export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <div className="text-red-400">Error: Failed to product categories</div>
  );
}

export default function Shop() {
  const categories = useLoaderData<string[]>();

  return (
    <div>
      <div>
        <div className="flex gap-8">
          {categories.map((category) => (
            <div key={category} className="capitalize pb-2">
              <NavLink
                to={`${encodeURI(category)}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-bold "
                    : "text-gray-400 font-medium "
                }
              >
                {category}
              </NavLink>
            </div>
          ))}
        </div>
        <hr />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
