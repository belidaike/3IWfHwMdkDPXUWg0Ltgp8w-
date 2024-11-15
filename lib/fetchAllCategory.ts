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


export const useGetPostItems = (allcategory: string) => {
    const [loading, setLoading] = useState(false);
    const [postItems, setPostItems] = useState<PostItem[]>([]);

    useEffect(() => {
        const getPostItems = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/postitems?allcategory=${allcategory}`);
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
    }, [allcategory]);

    return { loading, postItems };
};

// New Fetch Function for Single Post Item
export const fetchPost = async (id: string): Promise<PostItem | null> => {
    try {
        const res = await fetch(`/api/postitems?id=${id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
};

export default useGetPostItems;


