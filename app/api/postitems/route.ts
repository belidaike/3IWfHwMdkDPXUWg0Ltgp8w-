import { NextResponse } from 'next/server';
import dbConnect from '@/config/db';
import PostItem from '@/models/PostItem';
import { cloudinary } from '@/lib/cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

// Connect to MongoDB
dbConnect();

// Helper function to handle image upload to Cloudinary
async function uploadToCloudinary(buffer: Buffer, filename: string) {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'affiliate_items', public_id: filename },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(stream);
    });
}

// GET: Fetch all post items or filter by category
export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';

    try {
        const postItems = category
            ? await PostItem.find({ category }).select('-__v')
            : await PostItem.find().select('-__v');
        return NextResponse.json(postItems);
    } catch (error) {
        console.error('Fetch Error:', error);
        return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
    }
}

// POST: Create a new post item with image upload
export async function POST(request: Request) {
    await dbConnect();

    try {
        // Parse form data
        const formData = await request.formData();
        const pname = formData.get('pname') as string;
        const brand = formData.get('brand') as string;
        const allcategory = formData.get('allcategory') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const price = formData.get('price') as string;
        const alink = formData.get('alink') as string;
        const file = formData.get('img') as File;

        // Validate required fields
        if (!pname || !brand || !category || !price || !alink || !file) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const filename = uuidv4();
        let imgUrl = '';

        // Upload image to Cloudinary
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadResult = await uploadToCloudinary(buffer, filename);

            // Cast `uploadResult` to `UploadApiResponse`
            imgUrl = (uploadResult as UploadApiResponse).secure_url;
        }

        // Create a new PostItem
        const newPostItem = new PostItem({
            pname,
            brand,
            allcategory,
            category,
            description,
            price,
            alink,
            img: imgUrl,
        });

        const savedPostItem = await newPostItem.save();
        return NextResponse.json(savedPostItem, { status: 201 });
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ message: 'Server Error', error }, { status: 500 });
    }
}
