import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import styles from "./tailwind.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="bg-sky-100 p-5 flex justify-between align-middle">
          <Link to="/">
            <h1 className="text-2xl">FakeStore</h1>
          </Link>
          <Link to="/shop" className="flex align-middle">
            shop
          </Link>
          <Link to="/shop/basket" className="flex align-middle">
            <ShoppingCartIcon className="h-6 w-6 text-gray-700 line" />
          </Link>
        </div>
        <div className="p-5">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
