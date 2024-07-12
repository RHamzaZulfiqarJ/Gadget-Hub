import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import prisma from '../../../../prisma';
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const price = Number(formData.get('price'));
  const images = formData.getAll('img') as unknown as File[];

  if (!title || !category || !description || !price || images.length === 0) {
    return NextResponse.json({ message: 'Please fill in all fields' }, { status: 400 });
  }

  try {
    const imageUrls: string[] = [];
    for (const image of images) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadedImage: UploadApiResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'ecommerce' }, (error, result:any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
        uploadStream.end(buffer);
      });
      imageUrls.push(uploadedImage.secure_url);
    }

    const post = await prisma.post.create({
      data: {
        title,
        category,
        description,
        price,
        img: imageUrls,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json({ posts }, { status: 200 });
  }
  catch (error) {
      return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}