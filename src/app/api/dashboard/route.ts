// import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// import prisma from "../../../../prisma";
// import { NextRequest, NextResponse } from "next/server";

// // Configure Cloudinary with environment variables
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const POST = async (req: NextRequest) => {
//     const formData = await req.formData();

//     const data: Record<string, string> = {};
//     const files: Record<string, File> = {};
//     let imageUrl = "";

//     for (const [key, value] of formData.entries()) {
//         if (value instanceof File) {
//             console.log(`Received File: ${key}, Size: ${value.size}`);
//             files[key] = value;
//         } else {
//             data[key] = value as string;
//         }
//     }

//     const fileKeys = Object.keys(files);
//     if (fileKeys.length > 0) {
//         const firstFile = files[fileKeys[0]];
//         const buffer = Buffer.from(await firstFile.arrayBuffer());

//         try {
//             const uploadedImage: UploadApiResponse = await new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream({ folder: "ecommerce" }, (error, result: any) => {
//                     if (error) reject(error);
//                     else resolve(result);
//                 });
//                 uploadStream.end(buffer);
//             });

//             imageUrl = uploadedImage.secure_url;
//         } catch (uploadError) {
//             console.error("Image upload failed:", uploadError);
//             return NextResponse.json({ message: "Image upload failed", error: uploadError }, { status: 500 });
//         }
//     }

//     try {
//         const newEntry = await prisma.dashboard.create({
//             data: {
//                 ...data,
//                 MainPhoto: imageUrl, // Adjust based on your schema
//             },
//         });

//         return NextResponse.json({ message: "Data saved successfully", newEntry }, { status: 201 });
//     } catch (dbError) {
//         console.error("Database error:", dbError);
//         return NextResponse.json({ message: "Database error", error: dbError }, { status: 500 });
//     }
// };

// export async function GET(req: NextRequest) {
//   try {
//     const posts = await prisma.post.findMany();
//     return NextResponse.json({ posts }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
//   }
// }
