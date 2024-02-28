import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({
  title,
  description,
  price,
  src,
  id,
}: {
  title: string;
  description: string;
  price: string;
  src: string;
  id: string;
}) => {
  return (
    <div className="mt-4">
      <div className="border-[1px] w-[280px] shadow-md p-2 flex flex-col gap-2 rounded-xl">
        <div className="h-[210px] w-[260px] border-2 rounded-xl">
          <Image height={200} width={200} src={src} alt="No Image Found" className="object-contain h-[210px] w-[260px] p-4" />
        </div>
        <div className="flex flex-col gap-2">
          <div>{title}</div>
          <div className="font-light text-sm">{description}</div>
          <div className="font-bold text-2xl">${price}</div>
          <Link className="w-full" href={`/products/${id}`}>
            <Button className="w-full">View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
