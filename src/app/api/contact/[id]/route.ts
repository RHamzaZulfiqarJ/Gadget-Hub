import { connectDatabase } from "@/lib/helper";
import prisma from "../../../../../prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
    try {
        const id = req.url.split("/contact/")[1];
        console.log(id);
        await connectDatabase();
        const contact = await prisma.contact.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({ contact }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}

export const FINDONE = async (req: Request) => {
    try {
        const id = req.url.split("/contact/")[1];
        await connectDatabase();
        const contact = await prisma.contact.findUnique({
            where: {
                id: id
            }
        });
        return NextResponse.json({ contact }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}