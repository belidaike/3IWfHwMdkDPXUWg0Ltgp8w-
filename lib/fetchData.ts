// lib/fetchData.ts
'use client'
import { useEffect, useState } from 'react';

interface PostItem {
    _id: string;
    pname: string;
    brand: string;
    category: string;
    allcategory: string;
    description: string;
    date: string;
    price: string;
    alink: string;
    img: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const useGetPostItems = (category: string) => {
    const [loading, setLoading] = useState(false);
    const [postItems, setPostItems] = useState<PostItem[]>([]);

    useEffect(() => {
        const getPostItems = async () => {
            setLoading(true);
            try {
                const encodedCategory = encodeURIComponent(category);
                const res = await fetch(`${BASE_URL}/api/postitems?category=${encodedCategory}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setPostItems(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getPostItems();
    }, [category]);

    return { loading, postItems };
};



// New Fetch Function for Single Post Item
export const fetchPost = async (id: string): Promise<PostItem | null> => {
    try {
        const res = await fetch(`${BASE_URL}/api/postitems?id=${id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
};


export default useGetPostItems;


