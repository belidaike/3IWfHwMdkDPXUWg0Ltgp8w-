'use client';

import React, { useEffect, useState } from 'react';
import { fetchPost } from '@/lib/fetchData';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PostItem {
    _id: string;
    pname: string;
    brand: string;
    category: string;
    allcategory: string;
    description: string;
    price: string;
    alink: string;
    img: string;
}
// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//     const id = params.id;

//     // Fetch the post data
//     const postItem: PostItem | null = await fetchPost(id);

//     // Handle null case
//     if (!postItem) {
//         return {
//             title: 'Post Not Found - Shop Smartly',
//             description: 'Sorry, the product you are looking for cannot be found.',
//         };
//     }

//     return {
//         title: `${postItem.pname} - Shop Smartly`,
//         description: postItem.description,
//         openGraph: {
//             title: `${postItem.pname} - Shop Smartly`,
//             description: postItem.description,
//             images: postItem.img || '/default-og-image.jpg',
//             url: `https://5hop5martly.vercel.app/tech-gadgets/audio-headphones/${id}`,
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: `${postItem.pname} - Shop Smartly`,
//             description: postItem.description,
//             images: postItem.img || '/default-og-image.jpg',
//         },
//     };
// }

export default function AntiAgingPostPage() {
    const params = useParams();
    const id = params.id as string;

    const [postItem, setPostItem] = useState<PostItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            const data = await fetchPost(id);
            setPostItem(data);
            setLoading(false);
        };

        fetchData();
    }, [id]);


    if (loading) return <div className="text-center mt-5"><h1 className='text-2xl'>loading products...</h1></div>;
    if (!postItem) return <p className="text-center not-found text-center mt-5">Post not found</p>;


    return (
        <div className="post-container">
            {/* Product Image and Details */}
            <div className="post-header">
                <img
                    src={postItem.img}
                    alt={postItem.pname}
                    className="post-image"
                />
                <div className="post-info">
                    <h1 className="post-title">{postItem.pname}</h1>
                    <p className="post-brand">Brand: {postItem.brand}</p>
                </div>
            </div>

            {/* Product Description and Buy Section */}
            <div className="post-details">
                <p className="post-description">{postItem.description}</p>
                <p className="post-category">Category: {postItem.category}</p>
                <p className="post-price">Price: {postItem.price}</p>

                <Button>
                    <Link href={postItem.alink}>Buy Now</Link>
                </Button>
            </div>
        </div>
    );
}
