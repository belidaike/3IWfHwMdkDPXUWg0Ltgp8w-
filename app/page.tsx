'use client';
import { Button } from '@/components/ui/button';
import useGetAllPostItems from '@/lib/fetch';
import Link from 'next/link';
import React from 'react';


const Posts: React.FC = () => {

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
                  width={300}
                  height={300}
                  className="product-image"
                />
                <div className="product-info">
                  <h2>{item.pname}</h2><br />
                  <p>Brand: {item.brand}</p>
                  <p className='post-price'>₱{item.price}</p>
                  <Button>
                    View More
                  </Button>
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