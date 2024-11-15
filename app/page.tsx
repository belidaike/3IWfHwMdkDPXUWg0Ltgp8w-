'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
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

const Posts: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch post items data
  const fetchPostItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/postitems');

      // Check for HTTP error
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      // Parse JSON data
      const data: PostItem[] = await response.json();
      setItems(data);
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchPostItems();
  }, []);

  // Render loading state
  if (loading) return <div className="text-center mt-5"><h1 className='text-2xl'>loading posts...</h1></div>;

  // Render error state
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  // Render posts
  return (
    <>
      <>

        <div className="text-center mt-5"><h1 className='text-2xl'>All Products</h1></div>


        <div className="products">
          {items.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="product-card">
                <img src={item.img} alt={item.pname} className="product-image" />
                <div className="product-info">
                  <h2>{item.pname}</h2>
                  <p>₱{item.price}</p>
                  <Button>
                    <Link href={item.alink} target="_blank" rel="noopener noreferrer">
                      View More
                    </Link>
                  </Button>
                </div>
              </div>

            ))
          )}
        </div>
      </>
    </>
  );
};

export default Posts;
