'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface PostItem {
  _id: string;
  pname: string;
  brand: string;
  category: string;
  description: string;
  price: string;
  alink: string;
  img: string;
}

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getItemsData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/postitems');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data: PostItem[] = await response.json();
      setItems(data);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItemsData();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        items.map((item) => (
          <p key={item._id}>{item.pname}</p>
        ))
      )}
    </div>
  );
}
