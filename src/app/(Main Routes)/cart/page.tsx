"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoBagOutline, IoTrashOutline } from "react-icons/io5";
import Quantity from "../products/[id]/Quantity";
import { Button } from "@/components/ui/button";
import Orders from "./Orders";
import { useGlobalState } from "@/context/GlobalStateContext";
import Load from "./Load";
import Link from "next/link";

type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  size: string;
  category: string;
  img: string[];
};

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="mt-10 mb-32 mx-[10%] font-primary">
      <div className="flex flex-col">
        <div className="text-3xl font-extrabold">Shopping Cart</div>
        <div className="mt-8 flex flex-col-reverse lg:flex-row gap-[4%] justify-between">
          <div className="w-full">
            {loading ? (
              <Load />
            ) : cart.length < 1 ? (
              <div className="flex justify-center py-20">
                <div className="flex flex-col gap-4 items-center">
                  <IoBagOutline className="text-9xl" />
                  <div className="text-4xl font-bold">Your Shopping Bag is Empty</div>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <Orders
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  quantity={item.quantity}
                  price={item.price}
                  size={item.size}
                  category={item.category}
                  img={item.img}
                />
              ))
            )}
          </div>
          {!loading && cart.length > 0 && (
            <div className="mt-8 w-full lg:w-[320px] h-auto lg:h-[260px] rounded-xl bg-[#f6f8fd] md:mt-0">
              <div className="flex flex-col gap-5 p-10">
                <div className="text-xl font-bold">Order Summary</div>
                <div className="flex justify-between">
                  <div className="text-lg">Quantity</div>
                  <div className="text-lg">{quantity} Product</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-lg">Sub Total</div>
                  <div className="text-lg">${total}</div>
                </div>
                <Link href={'/checkout'}>
                <Button className="bg-[#212121] rounded-none w-full text-base flex items-center gap-2">
                  Proceed To Checkout
                </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
