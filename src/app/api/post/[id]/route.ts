import { NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import prisma from '../../../../../prisma';
import { NextRequest } from 'next/server';
import { connectDatabase } from '@/lib/helper';

export const GET = async (req: Request) => {
    try {
        const id = req.url.split("/api/post/")[1]?.replace("/", "");
        if (!id) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }
    
        console.log(`Fetching post with ID: ${id}`);
        await connectDatabase();
    
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });
    
        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

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

export const PUT = async (req: NextRequest) => {

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price'));
    const images = formData.getAll('img') as unknown as File[];

    const id = req.url.split('/api/post/')[1]?.replace('/', '');
    
    try {
  
      if (!id) {
        return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
      }
  
      if (!title || !category || !description || !price || images.length === 0) {
        return NextResponse.json({ message: 'Please fill in all fields' }, { status: 400 });
      }
  
      await connectDatabase();
  
      const imageUrls: string[] = [];
      for (const image of images) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const uploadedImage: UploadApiResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ folder: 'ecommerce' }, (error, result: any) => {
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
  
      const post = await prisma.post.update({
        where: { id: id },
        data: {
          title,
          category,
          description,
          price,
          img: imageUrls,
        },
      });
  
      return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
      console.error('Error updating post:', error);
      return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };