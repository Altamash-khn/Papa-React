import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SingleUser = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("inside useEffect");

    async function fetchUserData() {
      console.log("inside function");
      console.log("id", id);

      if (!router.isReady) return;
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      console.log(data);
    }

    fetchUserData();
  }, [router.isReady, id]);

  return <div>I am a single user with ID: {id}</div>;
};

export default SingleUser;
