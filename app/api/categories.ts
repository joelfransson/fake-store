export const fetchCategories = async (): Promise<string[]> => {
  const categoriesResponse = await fetch(
    "https://fakestoreapi.com/products/categories"
  );
  
  return await categoriesResponse.json();
};
