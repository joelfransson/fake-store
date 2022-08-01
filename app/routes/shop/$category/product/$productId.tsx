import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { fetchProduct, Product } from "~/api/products";

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  if (!params?.productId) {
    return null;
  }
  return fetchProduct(params.productId);
};

export function ErrorBoundary({ error }: any) {
  console.error(error);
  return <div className="text-red-400">Error: Failed to load product list</div>;
}

export default function ProductDetails() {
  const params = useParams();
  const product = useLoaderData<Product>();

  if (!product) {
    <div>No product selected</div>;
  }

  console.log({ product });

  return (
    <div>
      <div className="w-12">
        <img src={product.image} alt="" />
      </div>
      <div className="flex justify-between font-semibold">
        <div>{product.title}</div>
        <div className="text-gray-500">${product.price}</div>
      </div>
      <div className="text-gray-400">{product.description}</div>
    </div>
  );
}
