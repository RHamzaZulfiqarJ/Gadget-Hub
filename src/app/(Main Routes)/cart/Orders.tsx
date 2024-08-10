"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useRouter } from "next/navigation";
import Load from "./Load";

type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  size: string;
  category: string;
  img: string[];
};

const Orders = ({ id, title, quantity, price, size, category, img }: CartItem) => {
  const { cart, setCart } = useGlobalState();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = () => {
    setLoading(true);
    try {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      router.refresh();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-8 border-[1px] rounded-2xl p-4 justify-between items-center">
      {loading ? (
        <Load />
      ) : (
        <div className="p-4 flex md:flex-row flex-col gap-10">
          <div className="flex justify-center">
            <img
              className="rounded-lg object-contain"
              src={img[0]}
              alt="No Image found"
              width={250}
              height={250}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center w-full justify-between">
              <div className="text-2xl font-light">{title}</div>
              <div onClick={handleDelete} className="hover:cursor-pointer">
                <IoTrashOutline className="text-[25px]" />
              </div>
            </div>
            <div className="text-md w-full font-bold text-gray-500">{category}</div>
            <div className="flex w-full justify-between">
              <div className="font-extrabold text-lg">Delivery In</div>
              <div className="font-extrabold text-lg text-yellow-500">3 Working Days</div>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="text-xl font-extrabold">Total</div>
              <div className="text-gray-500 font-primary text-lg">${price * quantity}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;