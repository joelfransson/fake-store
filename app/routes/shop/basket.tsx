import type { LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { addToCard, loadCart } from "~/api/shopingCart";
import type { Order } from "~/api/shopingCart";

export async function action({ request }: { request: Request }) {
  const body = await request.formData();

  const id = body.get("productId");
  const title = body.get("productTitle");
  const price = body.get("productPrice");
  const quantity = body.get("quantity") ?? 1;

  const formErrors = {
    id: id !== null ? undefined : "Id is required",
    title: title !== null ? undefined : "Title is required",
    price: price !== null ? undefined : "Price is required",
  };

  if (Object.values(formErrors).some(Boolean)) return { formErrors };

  const cart = addToCard({
    id: Number(id),
    title: String(title),
    price: Number(price),
    quantity: Number(quantity),
  });

  return cart;
}

type CartInfo = {
  items: Order[];
  total: number;
};
export const loader: LoaderFunction = async () => {
  const cart = loadCart();

  const items = Object.values(cart);

  const total = items.reduce(
    (sum, item) => (item.quantity ?? 0) * (item.price ?? 0) + sum,
    0
  );

  console.log({ total });

  return {
    items,
    total,
  };
};

export function ErrorBoundary({ error }: { error: Error }) {
  return <div className="text-red-400">Error: Failed to load basket</div>;
}

export default function Index() {
  const cartInfo = useLoaderData<CartInfo>() ?? {};
  const actionData = useActionData() ?? {};

  return (
    <div>
      <div className="mt-5 mb-5 text-xl text-gray-700">Items in basket</div>
      <div>
        <ul>
          {cartInfo.items
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((item) => (
              <li key={item.id}>
                {item.quantity} {item.title} ${item.price ?? 0}
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-5">
        <span className="font-semibold">Total:</span> ${cartInfo.total ?? 0}
      </div>
    </div>
  );
}
