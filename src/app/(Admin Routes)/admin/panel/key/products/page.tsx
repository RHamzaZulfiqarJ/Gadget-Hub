"use client";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import Create from "./Create";
import { Input } from "@/components/ui/input";
import CardComponent from "./Card";
import axios from "axios";

type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  img: [];
  created_at: string;
};

const page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]); // State for filtered data
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term

  useEffect(() => {
    getData();
    if (!open) {
      getData();
    }
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/post");
      const jsonData = res.data;
      setData(jsonData.posts as Product[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: any) => {
    setLoading(true);
    try {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);
      const filtered = data.filter(product => product.title.toLowerCase().includes(value));
      setFilteredData(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div>
      <div className="flex flex-row justify-between pb-10">
        <h1 className="text-2xl font-primary">Products</h1>
        <div className="flex flex-row gap-10">
          <div>
            <Input 
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Tooltip title="Add Product" arrow placement="bottom">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full p-2 bg-blue-400 text-white hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out active:bg-blue-600">
              <IoAddSharp className="text-[25px]" />
            </button>
          </Tooltip>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-[8%]">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : data.length > 0 ? (
        <div className="pb-[8%] px-[4%] flex gap-8 flex-wrap justify-start">
          {
            filteredData.map((product, index) => (
              <CardComponent
                key={index}
                id={product.id}
                title={product.title}
                category={product.category}
                description={product.description}
                price={product.price}
                img={product.img}
                created_at={product.created_at}
                onDelete={() => getData()}
              />
            ))
          }
        </div>
      ) : data.length <= 0 && (
        <div className="flex flex-row justify-center">
          <img src="/NoDataFound.jpg" height={400} width={400} alt="No Image Found" />
        </div>
      )}

      <Create open={open} setOpen={setOpen} />

    </div>
  );
};

export default page;
