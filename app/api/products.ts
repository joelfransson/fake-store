export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export const fetchProducts = async (category: string): Promise<Product[]> => {
  const productsResponse = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const products = await productsResponse.json();
  return products;
};
