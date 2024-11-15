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

    console.log(postItem.img)

    return (
        <div className="products">
            <div key={postItem._id} className="product-card">
                <img src={postItem.img} alt={postItem.pname} className="product-image" />
                <div className="product-info">
                    <h2>{postItem.pname}</h2>
                    <p>₱{postItem.price}</p>
                    <Button>
                        <Link href={postItem.alink} target="_blank" rel="noopener noreferrer">
                            View More
                        </Link>
                    </Button>
                </div>
            </div>
            ))
        </div>
    );
}
