import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import { fetchProducts, Product } from "~/api/products";

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  if (!params?.category) {
    return [];
  }
  return fetchProducts(params.category);
};

export default function Category() {
  const params = useParams();
  const products = useLoaderData<Product[]>();

  return (
    <div>
      <h3>{params.category}</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
