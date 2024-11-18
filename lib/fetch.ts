import { useEffect, useState } from 'react';

// Define the PostItem interface
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

// Base URL for the API
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Custom hook to fetch all PostItems without any parameters
export const useGetAllPostItems = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [postItems, setPostItems] = useState<PostItem[]>([]);

    useEffect(() => {
        const fetchAllPostItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}/api/postitems`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }

                const data: PostItem[] = await response.json();
                setPostItems(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllPostItems();
    }, []);

    // Return loading state, error message, and fetched post items
    return { loading, error, postItems };
};


export default useGetAllPostItems;
