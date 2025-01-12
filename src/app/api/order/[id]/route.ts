import { NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import prisma from '../../../../../prisma';
import { NextRequest } from 'next/server';
import { connectDatabase } from '@/lib/helper';

export const GET = async (req: Request) => {
    try {
        const id = req.url.split("/api/order/")[1]?.replace("/", "");
        if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }
    
        console.log(`Fetching order with ID: ${id}`);
        await connectDatabase();
    
        const order = await prisma.order.findUnique({
            where: {
                id: id,
            },
        });
    
        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

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

export const PUT = async (req: NextRequest) => {
  try {
    const id = req.url.split("/api/order/")[1]?.replace("/", "");
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({ message: "Status is required" }, { status: 400 });
    }

    console.log(`Updating order with ID: ${id} to status: ${status}`);
    await connectDatabase();

    const order = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({ order }, { status: 200 });
  } catch (err) {
    console.error("Error updating order:", err);
    return NextResponse.json({ message: "Something went wrong", error: err }, { status: 500 });
  }
}

