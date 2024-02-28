"use client";

import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import Image from "next/image";
import Toggle from "./Toggle";
import Quantity from "./Quantity";
import { Button } from "@/components/ui/button";
import { PiShoppingCartBold } from "react-icons/pi";

const getBlogData = async (id: number) => {
  const res = await fetch(`https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`);
  if (!res.ok) {
    throw new Error("Could not retrieve blog posts");
  }
  return await res.json();
};

async function BlogDetail({ params }: any) {
  const { blog } = await getBlogData(params.id);

  return (
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
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper">
        <SwiperSlide>
          <Image className="object-contain" src={blog.photo_url} alt="No image found" width={400} height={400} />
        </SwiperSlide>
      </Swiper>
      <div className="flex md:flex-row flex-col gap-10 justify-around">
        <div className="flex flex-col">
          <div className="text-4xl font-light">{blog.title}</div>
          <div className="capitalize text-xl text-[#B0B0B0]">{blog.category}</div>
          <div className="text-lg w-3/4 mt-4">{blog.description}</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-xl font-bold">Select Size : </div>
          <div>
            <Toggle />
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="text-xl font-bold">Quantity : </div>
            <div>
              <Quantity />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <Button className="bg-[#212121] rounded-none h-[50px] font-semibold text-base flex items-center gap-2">
              <PiShoppingCartBold className="text-[25px]" />
              Add To Cart
            </Button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
