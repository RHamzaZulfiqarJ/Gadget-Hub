"use client";

import React, { useState } from "react";
import { IoClose, IoPencil } from "react-icons/io5";
import { Alert, Snackbar } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "@mui/material";

type CardProps = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  img: string[];
  created_at: string;
  onDelete: () => void;
};

const CardComponent = ({
  id,
  title,
  category,
  description,
  price,
  img,
  created_at,
  onDelete,
}: CardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const deleteProduct = async (id: string, onDelete: () => void) => {
    setLoading(true);
    console.log(id);
    try {
      const response = await fetch(`/api/post/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setShowAlert(true);
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  const ImageSlider = () => {
    return (
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper">
          {img.map((data, index) => (
            <SwiperSlide key={index}>
              <img
                src={data}
                alt="No Image Found"
                height={200}
                width={200}
                className="object-contain h-[210px] w-[260px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  };

  const alert = () => {
    console.log("Alert");
    return (
      <Snackbar open={true} autoHideDuration={6000} onClose={() => setShowAlert(false)}>
        <Alert
          onClose={() => setShowAlert(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}>
          Message Deleted
        </Alert>
      </Snackbar>
    );
  };

  const Icons = () => (
    <div className="flex flex-row gap-20 items-center mt-4 justify-center">
      <Button variant="outlined">
        <IoPencil className="text-[20px] text-blue-500 cursor-pointer" />
      </Button>
      <Button variant="outlined" color="error" onClick={() => deleteProduct(id, onDelete)}>
        <IoClose className="text-[25px] text-red-500 cursor-pointer" />
      </Button>
    </div>
  );

  return (
    <div className="mt-4">
      <div className="border-[1px] w-[280px] shadow-lg hover:shadow-2xl transition-all duration-500 p-2 flex flex-col gap-2 rounded-xl">
        <div className="h-[210px] w-[260px] border-2 rounded-xl">
          <ImageSlider />
        </div>
        <div className="flex flex-col gap-2">
          <div>{title}</div>
          <div className="font-light text-sm">{description}</div>
          <div className="font-bold text-2xl">${price}</div>
          <Icons />
        </div>
      </div>
      {showAlert && alert()}
    </div>
  );
};

export default CardComponent;
