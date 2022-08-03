import { LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { addToCard, Cart, loadCart } from "~/api/shopingCart";

export async function action({ request }: { request: Request }) {
  const body = await request.formData();

  const id = body.get("productId");
  const title = body.get("productTitle");
  const quantity = body.get("quantity") ?? 1;

  const formErrors = {
    id: id !== null ? undefined : "Id is required",
    title: title !== null ? undefined : "Title is required",
  };

  if (Object.values(formErrors).some(Boolean)) return { formErrors };

  const cart = addToCard({
    id: Number(id),
    title: String(title),
    quantity: Number(quantity),
  });

  return cart;
}

export const loader: LoaderFunction = async () => {
  return loadCart();
};

export function ErrorBoundary({ error }: { error: Error }) {
  return <div className="text-red-400">Error: Failed to load basket</div>;
}

export default function Index() {
  const cart = useLoaderData<Cart>() ?? {};
  const actionData = useActionData() ?? {};
  const items = Object.values(cart);

  return (
    <div>
      <div>Shopping Cart</div>
      <div>
        {items
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((item) => (
            <div key={item.id}>
              {item.quantity} {item.title}
            </div>
          ))}
      </div>
    </div>
  );
}
