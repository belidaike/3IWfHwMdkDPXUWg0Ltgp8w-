'use client';
import { Button } from '@/components/ui/button';
import useGetAllPostItems from '@/lib/fetch';
import Link from 'next/link';
import React from 'react';


const Posts: React.FC = () => {
  // const [items, setItems] = useState<PostItem[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const response = await fetch(`${BASE_URL}/api/postitems`);

  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  //       }

  //       const data: PostItem[] = await response.json();
  //       setItems(data);
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         setError(error.message);
  //       } else {
  //         setError('An unexpected error occurred');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [BASE_URL]);
  const { loading, error, postItems } = useGetAllPostItems();
  if (loading) return <div className="text-center mt-5"><h1 className='text-2xl'>loading posts...</h1></div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;
  return (
    <>
      <div className="text-center mt-5"><h1 className='text-2xl'>All Products</h1></div>
      <div className="products">
        {postItems.length === 0 ? (
          <div className="text-center mt-5"><h1 className='text-2xl'>No posts available</h1></div>
        ) : (
          postItems.map((item) => (
            <div key={item._id} className="product-card">
              <Link href={
                item.category === 'mobilephones'
                  ? `/tech-gadgets/mobilephones/${item._id}`
                  : item.category === 'laptops'
                    ? `/tech-gadgets/laptop-computers/${item._id}`
                    : item.category === 'audio-headphones'
                      ? `/tech-gadgets/audio-headphones/${item._id}`
                      : `/tech-gadgets/smartwatches/${item._id}`
              }>
                <img
                  src={item.img}
                  alt={item.pname}
                  className="product-image"
                  width={300}
                  height={300}
                />
                <div className="product-info">
                  <h2>{item.pname}</h2>
                  <p>₱{item.price}</p>
                  <Button>
                    <Link href={item.alink} target="_blank" rel="noopener noreferrer">
                      View More
                    </Link>
                  </Button>
                  <p>{item.brand}</p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Posts;