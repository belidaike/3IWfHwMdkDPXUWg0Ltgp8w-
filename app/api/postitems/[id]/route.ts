import { NextResponse } from 'next/server';
import dbConnect from '@/config/db';
import PostItem, { IPostItem } from '@/models/PostItem'; // Correct import

dbConnect();

// GET: Fetch a single post item by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const postItem = await PostItem.findById(id).select('-__v');

        if (!postItem) {
            return NextResponse.json({ message: 'PostItem not found' }, { status: 404 });
        }

        return NextResponse.json(postItem, { status: 200 });
    } catch (error) {
        console.error('Fetch Error:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}

// Define an interface for the updated fields using Partial<IPostItem> 
// but handle img as either a string or File
type UpdateFields = Omit<Partial<IPostItem>, 'img'> & { img?: string | File };

// PUT: Update a post item by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const formData = await request.formData();
        const updatedFields: UpdateFields = {};

        formData.forEach((value, key) => {
            if (key === 'img' && value instanceof File) {
                // Assuming you handle File upload separately, store as File
                updatedFields[key] = value;
            } else {
                // All other fields as string
                updatedFields[key as keyof IPostItem] = value.toString();
            }
        });

        // Handle the `img` field if it's a File upload (add logic to upload to a storage service)
        if (updatedFields.img instanceof File) {
            // Example logic (you need to implement your own upload logic):
            // const uploadedImgUrl = await uploadFile(updatedFields.img);
            // updatedFields.img = uploadedImgUrl;
            delete updatedFields.img; // Removing File since you store img as URL string in DB
        }

        const updatedPostItem = await PostItem.findByIdAndUpdate(id, updatedFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedPostItem) {
            return NextResponse.json({ message: 'PostItem not found' }, { status: 404 });
        }

        return NextResponse.json(updatedPostItem, { status: 200 });
    } catch (error) {
        console.error('Update Error:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}
