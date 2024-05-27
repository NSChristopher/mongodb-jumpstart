"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const allProducts = await user.functions.getAllProducts();
        setProducts(allProducts);
      } catch (err) {
        console.error("Failed to log in", err);
      }
    };

    fetchData();
  }, []); 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     {products && products.map((product) => (
        <div key={product._id} className="flex flex-col items-center justify-between p-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-lg">{product.category}</p>
          <p className="text-lg">{product.price}</p>
        </div>
      ))}
    </main>
  );
}
