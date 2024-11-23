// contexts/PostContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface PostContextType {
    postItem: PostItem | null;
    setPostItem: React.Dispatch<React.SetStateAction<PostItem | null>>;
    fetchPost: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [postItem, setPostItem] = useState<PostItem | null>(null);

    const fetchPost = async (id: string) => {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        try {
            const res = await fetch(`${BASE_URL}/api/postitems?id=${id}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setPostItem(data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    return (
        <PostContext.Provider value={{ postItem, setPostItem, fetchPost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePost must be used within a PostProvider");
    }
    return context;
};
