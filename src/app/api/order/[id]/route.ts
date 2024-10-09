import { NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import prisma from '../../../../../prisma';
import { NextRequest } from 'next/server';
import { connectDatabase } from '@/lib/helper';

export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split("/api/order/")[1]?.replace("/", "");
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    console.log(`Deleting order with ID: ${id}`);
    await connectDatabase();

    const order = await prisma.order.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
