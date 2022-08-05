import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Product } from "~/api/products";
import  { fetchProduct } from "~/api/products";

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  invariant(params?.productId, "Expected params.productId");

  return fetchProduct(params.productId);
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div className="text-red-400">Error: Failed to load product list</div>;
}

export default function ProductDetails() {
  const product = useLoaderData<Product>();

  if (!product) {
    <div>No product selected</div>;
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="w-12">
        <img src={product.image} alt="" />
      </div>
      <div className="flex justify-between font-semibold">
        <div>{product.title}</div>
        <div className="text-gray-500">${product.price}</div>
      </div>
      <div className="text-gray-400">{product.description}</div>
      <div>
        <Form method="post" action="/shop/basket">
          <input type="hidden" name="quantity" value={1} />
          <input type="hidden" name="productId" value={product.id} />
          <input type="hidden" name="productTitle" value={product.title} />
          <input type="hidden" name="productPrice" value={product.price} />
          <button
            className="h-10 px-6 font-semibold rounded-md bg-black text-white"
            type="submit"
          >
            Buy
          </button>
        </Form>
      </div>
    </div>
  );
}
