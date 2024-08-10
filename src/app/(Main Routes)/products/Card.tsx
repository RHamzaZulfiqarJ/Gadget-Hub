import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Product = {
  title: string;
  description: string;
  price: number;
  category: string;
  img: string[];
  id: string;
  created_at: string;
};

const Card = ({ title, description, price, category, img, id, created_at }: Product) => {
  return (
    <div className="group relative block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 my-4">
      <img
        src={img[0]}
        alt="No Image Found"
        className="w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="relative border border-gray-100 bg-zinc-100 p-6">
        <h3 className="mt-4 text-lg font-medium text-gray-900 truncate">{title}</h3>
        <p className="mt-1.5 text-sm text-gray-700">${price}</p>

        <form className="mt-4">
          <Link href={`/products/${id}`}>
            <Button className="block w-full">
              View
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Card;
