import { connectDatabase } from "@/lib/helper";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export const POST = async (req: Request) => {
    try {
        const { firstName, lastName, email, phone, message } = await req.json();
        if (!firstName || !lastName || !email || !phone || !message) {
            return NextResponse.json({ message: "Please fill in all fields" }, { status: 400 });
        }
        await connectDatabase();
        const contact = await prisma.contact.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                message,
            }
        });
        return NextResponse.json({ contact }, { status: 201 },);
    }
    catch (error) {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}

export const GET = async () => {
    try {
        await connectDatabase();
        const contacts = await prisma.contact.findMany();
        return NextResponse.json({ contacts }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}