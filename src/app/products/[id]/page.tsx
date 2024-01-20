import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

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
    <div className="flex justify-center p-[6%]">
      <Carousel className="w-full max-w-xs md:max-w-lg">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    src={`${blog.photo_url}`}
                    alt={blog.title}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    </div>
  );
}

export default BlogDetail;
