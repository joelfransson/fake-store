import { Product } from '~/api/products'
import styles from "./styles.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
];

type ProductListProps = {
  products: Product[];
}

export const ProductList = ({products}: ProductListProps) => {
  return (<ul className="ProductList">
    {products.map((product) => (
      <li key={product.id}>
        <div>{product.title}</div>
        <div>{product.price}</div>
      </li>
    ))}
  </ul>)
}

