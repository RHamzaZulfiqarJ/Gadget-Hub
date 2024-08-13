import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import prisma from '../../../../prisma';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const homeAddress = formData.get('homeAddress') as string;
    const shippingAddress = formData.get('shippingAddress') as string;
    const city = formData.get('city') as string;
    const code = formData.get('code') as string;
    const paymentType = formData.get('paymentType') as string;
    const attachment = formData.get('attachment') as File;
    const items = JSON.parse(formData.get('items') as string) as object[];

    if (!firstName || !lastName || !email || !phone || !homeAddress || !shippingAddress || !city || !code || !paymentType) {
      return NextResponse.json({ message: 'Please fill all the fields' }, { status: 400 });
    }

    let imageUrl: string = "";

    if (attachment) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      try {
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

        imageUrl = uploadedImage.secure_url;
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        return NextResponse.json({ message: 'Image upload failed', error: uploadError }, { status: 500 });
      }
    }

    try {
      const order = await prisma.order.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          homeAddress,
          shippingAddress,
          city,
          code,
          paymentType,
          attachment: imageUrl,
          items,
        },
      });

      return NextResponse.json({ order }, { status: 201 });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ message: 'Database error', error: dbError }, { status: 500 });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
};
