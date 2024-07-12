import { connectDatabase } from "@/lib/helper";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("/api/post/")[1]?.replace("/", "");
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    console.log(`Deleting post with ID: ${id}`);
    await connectDatabase();
    
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
