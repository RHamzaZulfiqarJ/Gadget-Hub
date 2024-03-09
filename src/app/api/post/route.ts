import { connectDatabase } from "@/lib/helper";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const POST = async (req: Request) => {
    try {
        const { title, category, description, price, img } = await req.json();
        if (!title || !category || !description || !price || !img) {
            return NextResponse.json({ message: "Please fill in all fields" }, { status: 400 });
        }
        
        await connectDatabase();
        const contact = await prisma.post.create({
            data: {
                title,
                category,
                description,
                price,
                img,
            }
        });
        return NextResponse.json({ contact }, { status: 201 },);
    }
    catch (error) {
        console.log("error", error);
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}