import { notFound } from "next/navigation";
import React from "react";

async function getProduct(id) {
  console.log("fetching data");

  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 10 },
  });

  return res.json();
}

const SingleProduct = async ({ params }) => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product.id) notFound();
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

const getProducts = async () => {
  const res = await fetch(`https://dummyjson.com/products/`);
  const data = await res.json();
  return data.products;
};

export const generateStaticParams = async () => {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
};

export default SingleProduct;
