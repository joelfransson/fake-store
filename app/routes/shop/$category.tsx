import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useParams,
  Link,
  useOutlet,
} from "@remix-run/react";
import { fetchProducts, Product } from "~/api/products";

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  if (!params?.category) {
    return [];
  }
  return fetchProducts(params.category);
};

export function ErrorBoundary({ error }: any) {
  console.error(error);
  return <div className="text-red-400">Error: Failed to load product list</div>;
}

export default function Category() {
  const params = useParams();
  const products = useLoaderData<Product[]>();
  const outlet = useOutlet();

  return (
    <div className="pt-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <ul className="">
            {products.map((product) => (
              <li key={product.id}>
                <div className="flex justify-between">
                  <div className="font-semibold">
                    <Link to={`product/${product.id}`}>{product.title}</Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {outlet ?? <div className="text-gray-400">No product selected</div>}
        </div>
      </div>
    </div>
  );
}
