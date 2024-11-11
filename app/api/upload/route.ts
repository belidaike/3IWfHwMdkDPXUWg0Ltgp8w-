import { NextResponse } from 'next/server';
import { ImageResponse } from 'next-cloudinary';

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    try {
        const uploadResponse = await ImageResponse.upload(file, {
            folder: 'affiliate_items',
        });

        return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Image upload failed', details: error }, { status: 500 });
    }
}
