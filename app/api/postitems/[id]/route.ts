import { NextResponse } from 'next/server';
import dbConnect from '@/config/db';
import PostItem from '@/models/PostItem';

dbConnect();

// GET: Fetch a single post item by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Fetch post item by ID
        const postItem = await PostItem.findById(id).select('-__v');

        // If not found, return 404
        if (!postItem) {
            return NextResponse.json({ message: 'PostItem not found' }, { status: 404 });
        }

        return NextResponse.json(postItem, { status: 200 });
    } catch (error) {
        console.error('Fetch Error:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}


// PUT: Update a post item by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Parse form data
        const formData = await request.formData();

        const updatedFields: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            if (key === 'img' && typeof value === 'object') {
                updatedFields[key] = value;
            } else {
                updatedFields[key] = value.toString();
            }
        });

        // Find the post item by ID and update
        const updatedPostItem = await PostItem.findByIdAndUpdate(id, updatedFields, {
            new: true, // Return the updated document
            runValidators: true,
        });

        // If the post item is not found
        if (!updatedPostItem) {
            return NextResponse.json({ message: 'PostItem not found' }, { status: 404 });
        }

        return NextResponse.json(updatedPostItem, { status: 200 });
    } catch (error) {
        console.error('Update Error:', error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}