"use client";

import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Card from "./Card";
import Load from "./Load";

type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  img: string[];
  created_at: string;
};

const Products = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/post");
      const jsonData = await res.json();
      setData(jsonData.posts as Product[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2
  };

  return (
    <div className="pb-[8%] px-[5%]">
      {
        loading ? (
          <Load />
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-5 w-auto"
            columnClassName="pl-5 bg-clip-padding"
          >
            {
              data.map((product: Product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  category={product.category}
                  description={product.description}
                  price={product.price}
                  img={product.img}
                  created_at={product.created_at}
                />
              ))
            }
          </Masonry>
        )
      }
    </div>
  );
};

export default Products;
