import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/config/db';
import PostItem from '@/models/PostItem';
import { v2 as Cloudinary } from 'cloudinary';
import multer from 'multer';
import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

// Initialize MongoDB
connectDB();

// Disable Next.js body parser to handle file uploads with multer
export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper function to upload image to Cloudinary
const uploadToCloudinary = async (buffer: Buffer, folder: string) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = Cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        Readable.from(buffer).pipe(stream);
    });
};

// Multer middleware setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to parse the form data and upload image
const parseFormData = async (req: NextApiRequest) => {
    return new Promise((resolve, reject) => {
        upload.single('img')(req as any, {} as any, (error: any) => {
            if (error) return reject(error);
            resolve(req);
        });
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            // Parse form data
            await parseFormData(req);

            // Extract fields from the request body
            const { pname, brand, allcategory, category, date, description, price, alink } = req.body as any;
            const image = (req as any).file;

            // Ensure the image exists
            if (!image) {
                return res.status(400).json({ error: 'Image is required' });
            }

            // Upload image to Cloudinary
            const uploadResult = await uploadToCloudinary(image.buffer, 'affiliate_items');
            const imageUrl = (uploadResult as UploadApiResponse).secure_url;

            // Create a new PostItem
            const newPostItem = await PostItem.create({
                pname,
                brand,
                allcategory,
                category,
                description,
                date,
                price,
                alink,
                img: imageUrl,
            });

            return res.status(201).json(newPostItem);
        } catch (error) {
            console.error('Server Error:', error);
            return res.status(500).json({ error: 'Server Error' });
        }
    } else if (req.method === 'GET') {
        try {
            const postItems = await PostItem.find().sort({ createdAt: -1 });
            return res.status(200).json(postItems);
        } catch (error) {
            console.error('Server Error:', error);
            return res.status(500).json({ error: 'Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};

export default handler;
