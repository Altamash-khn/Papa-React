// APPROACH 1 --> CLIENT SIDE RENDERING

import { useRouter } from "next/router";

// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";

// const SingleUser = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [data, setData] = useState({})

//   useEffect(() => {

//     async function fetchUserData() {

//       if (!router.isReady) return;
//       const res = await fetch(`https://dummyjson.com/products/${id}`);
//       const data = await res.json();
//       setData(data)
//     }

//     fetchUserData();
//   }, [router.isReady, id]);

//   if(!data || Object.keys(data).length === 0) return <p>Loading...</p>

//   return (
//     <>
//       <header className="bg-red-300 p-5">
//         <p>Home</p>
//         <p>About</p>
//         <p>Contact</p>
//       </header>
//       <h1>{data?.title}</h1>
//       <p>{data?.description}</p>
//       <img src={data?.thumbnail} alt={data?.title} />
//     </>
//   )
// };

// export default SingleUser;

// APPROACH 2 --> SERVER SIDE RENDERING
// const SingleUser = ({ product, id }) => {
//   console.log("weill render on client");

//   return (
//     <>
//       <header className="bg-red-300 p-5">
//         <p>Home</p>
//         <p>About</p>
//         <p>Contact</p>
//       </header>
//       <h1>{product?.title}</h1>
//       <p>{product?.description}</p>
//       <img src={product?.thumbnail} alt={product?.title} />
//     </>
//   );
// };

// export default SingleUser;

// export const getServerSideProps = async (context) => {
//   console.log("this will run on server");

//   const id = context?.params?.id;
//   const res = await fetch(`https://dummyjson.com/products/${id}`);
//   const data = await res.json();
//   return {
//     props: {
//       product: data,
//       id: id,
//     },
//   };
// };

// // APPROACH 3 --> SSG

const SingleUser = ({ product, id }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <header className="bg-red-300 p-5">
        <p>Home</p>
        <p>About</p>
        <p>Contact</p>
      </header>
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
      <img src={product?.thumbnail} alt={product?.title} />
    </>
  );
};

export default SingleUser;

export const getStaticPaths = async () => {
  const res = await fetch(`https://dummyjson.com/products/`);
  const data = await res.json();
  const products = data.products;

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context?.params?.id;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  console.log("here!!");

  if (!data || !data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: data,
      id: id,
    },
    revalidate: 60,
  };
};
