"use client";

import React from "react";
import Card from "./Card";

const products = () => {

    const getProduct = async () => {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      };

  return (
    <div className="pb-[8%] px-[8%] flex gap-5 flex-wrap justify-center">
      {getProduct().then((data) => {
        return data.map((product: any) => {
          return (
            <div key={product.id}>
              <Card src={product.image} title={product.title} description={product.description} price={product.price} id={product.id} />
            </div>
          );
        });
      })}
    </div>
  );
};

export default products;
