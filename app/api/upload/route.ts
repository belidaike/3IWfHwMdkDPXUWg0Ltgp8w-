import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// This POST handler uploads a file to Cloudinary
export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    try {
        // Convert the file to a base64 string
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Use Cloudinary SDK to upload the file
        const uploadResponse = await cloudinary.uploader.upload(dataUrl, {
            folder: 'affiliate_items',
        });

        return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Image upload failed', details: error }, { status: 500 });
    }
}
