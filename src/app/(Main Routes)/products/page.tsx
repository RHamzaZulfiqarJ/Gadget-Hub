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
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory
    ? data.filter((product) => product.category === selectedCategory)
    : data;

    const Categories = [
      "Power bank",
      "Airpods",
      "Headphones",
      "Handfree",
      "Charger",
      "Data cable",
      "Alfa",
      "USB",
      "Digital watches",
      "Memory cards"
    ];

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
  };

  return (
    <div className="pb-[8%] px-[5%]">
      {/* Dropdown for category filter */}
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {Categories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

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
              filteredProducts?.map((product: Product) => (
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
