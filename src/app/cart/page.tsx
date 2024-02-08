import Image from "next/image";
import React from "react";
import { IoBagOutline, IoTrashOutline } from "react-icons/io5";
import Quantity from "../products/[id]/Quantity";
import { Button } from "@/components/ui/button";

const Cart = () => {
  return (
    <div className="mt-10 mb-32 mx-[10%] font-primary">
      <div className="flex flex-col">
        <div className="text-3xl font-extrabold">Shopping Cart</div>
        <div className="mt-8 flex flex-col lg:flex-row border-[1px] rounded-2xl p-4 justify-between items-center gap-[5%]">
          <div className="p-4 flex md:flex-row flex-col justify-between gap-10">
            <div className="flex justify-center">
              <Image
                className="rounded-lg"
                src="/card3.png"
                alt="No Image found"
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center w-full justify-between">
                <div className="text-2xl font-light">Product Title</div>
                <div className="hover:cursor-pointer">
                  <IoTrashOutline className="text-[25px]" />
                </div>
              </div>
              <div className="text-md w-full font-bold text-gray-500">Product Type</div>
              <div className="flex w-full justify-between">
                <div className="font-extrabold text-lg">Delivery Estimation</div>
                <div className="font-extrabold text-lg text-yellow-500"># Working Days</div>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="text-xl font-extrabold">$ ###</div>
                <div>
                  <Quantity />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[320px] h-auto lg:h-[260px] rounded-xl bg-[#f6f8fd] md:mt-0">
            <div className="flex flex-col gap-5 p-10">
              <div className="text-xl font-bold">Order Summary</div>
              <div className="flex justify-between">
                <div className="text-lg">Quantity</div>
                <div className="text-lg">1 Product</div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg">Sub Total</div>
                <div className="text-lg">$175</div>
              </div>
              <Button className="bg-[#212121] rounded-none w-full text-base flex items-center gap-2">
                Proceed To Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


// after shopping cart heading
{/* <div className='flex justify-center py-20'>
                <div className='flex flex-col gap-4 items-center'>
                    <IoBagOutline className="text-9xl" />
                    <div className='text-4xl font-bold'>Your Shopping Bag is Empty</div>
                </div>
            </div> */}