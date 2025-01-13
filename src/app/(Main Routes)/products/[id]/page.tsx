"use client";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Toggle from "./Toggle";
import Quantity from "./Quantity";
import { Button } from "@/components/ui/button";
import { PiShoppingCartBold } from "react-icons/pi";
import Load from "../Load";
import { useGlobalState } from "@/context/GlobalStateContext";
import { toast } from "sonner";

type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  img: string[];
  created_at: string;
  updated_at: string;
};

async function fetchProductData(id: string): Promise<Product> {
  const res = await fetch(`/api/post/${id}`);
  const jsonData = await res.json();
  return jsonData.post as Product;
}

async function BlogDetail({ params }: any) {

  const {cart, setCart} = useGlobalState();      // Custom hook to access global state
  const [activeSize, setActiveSize] = useState<string>('M');
  const [count, setCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [cartLoading, setCartLoading] = useState<boolean>(false);
  const [data, setData] = useState<Product>({
    id: "",
    title: "",
    category: "",
    description: "",
    price: 0,
    img: [],
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const productData = await fetchProductData(params.id);
        setData(productData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [params.id]);

  const addToCart = () => {
    setCartLoading(true);
    try {
      const product = {
        id: data.id,
        title: data.title,
        category: data.category,
        price: data.price,
        img: data.img,
        size: activeSize,
        quantity: count
      }
  
      let newCart = [...cart];
      let itemInCart = false;
  
      newCart.forEach((item, index) => {
        if (item.id === product.id && item.size === product.size) {
          newCart[index].quantity += product.quantity;
          itemInCart = true;
        }
      });
  
      if (!itemInCart) {
        newCart.push(product);
      }
  
      setCart(newCart);
    } catch (error) {
      console.log(error);
    } finally {
      setCartLoading(false);
      toast.success('Product Successfully added to cart!!!');

    }
  }

  return (
    <>
      {
        loading ? (
          <Load />
        ) : (
          <div className="flex flex-col justify-center p-[6%] font-primary">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper">
              
                {data.img.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt="Picture of the author" className="object-fit w-96 h-96"/>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex md:flex-row flex-col gap-10 justify-around">
              <div className="flex flex-col">
                <div className="text-4xl font-light">{data.title}</div>
                <div className="capitalize text-xl text-[#B0B0B0]">{data.category}</div>
                <div className="text-lg w-3/4 mt-4">{data.description}</div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-xl font-bold">Select Size : </div>
                <div>
                  <Toggle activeSize={activeSize} setActiveSize={setActiveSize} />
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div className="text-xl font-bold">Quantity : </div>
                  <div>
                    <Quantity count={count} setCount={setCount} />
                  </div>
                </div>
                <div className="flex gap-4 items-center mt-3">
                  <Button onClick={addToCart} className="bg-[#212121] rounded-none h-[50px] font-semibold text-base flex items-center gap-2">
                    <PiShoppingCartBold className="text-[25px]" />
                    {cartLoading ? <Load /> : "Add to Cart"}
                  </Button>
                  <div className="text-2xl font-extrabold">Rs. {count * data.price}</div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default BlogDetail;
