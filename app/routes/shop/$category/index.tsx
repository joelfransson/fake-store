import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
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

  return (
    <div className="pt-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <ul className="">
            {products.map((product) => (
              <li key={product.id}>
                <div className="flex justify-between">
                  <div className="font-semibold">{product.title}</div>
                  <div className="font-semibold text-gray-400">
                    ${product.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>DETAILS</div>
      </div>
    </div>
  );
}
