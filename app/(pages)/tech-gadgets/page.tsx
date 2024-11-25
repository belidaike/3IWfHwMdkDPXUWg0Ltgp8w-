'use client';
import useGetPostItems from '@/lib/fetchAllCategory';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function Tech_Gadgets() {
    const { loading, postItems } = useGetPostItems("Tech and Gadgets");
    // console.log(postItems)
    if (loading) return <div className="text-center mt-5"><h1 className='text-2xl'>loading posts...</h1></div>;
    return (
        <>
            <div className="mt-5"><h2 className='text-2xl'>Tech and Gadgets</h2></div>


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
                                    <br />
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
            </div >
        </>
    );
}
