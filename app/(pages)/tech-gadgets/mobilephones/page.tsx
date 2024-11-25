'use client';
import useGetPostItems from '@/lib/fetchData';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function Mobilephones() {
    const { loading, postItems } = useGetPostItems("Mobile Phones");
    if (loading) return <div className="text-center mt-5"><h1 className='text-2xl'>loading posts...</h1></div>;

    return (
        <>

            <div className="mt-5"><h2 className='text-2xl'>Mobile Phone Products</h2></div>


            <div className="products">
                {postItems.length === 0 ? (
                    <div className=' text-center '>
                        <p className=''>No prducts available.</p>
                    </div>
                ) : (
                    postItems.map((item) => (
                        <div key={item._id} className="product-card">
                            <Link href={`/tech-gadgets/mobilephones/${item._id}`}>
                                <img src={item.img} alt={item.pname} className="product-image" />
                                <div className="product-info">
                                    <h2>{item.pname}</h2>
                                    <p className='post-price'>₱{item.price}</p>
                                    <Button>
                                        View More
                                    </Button>
                                </div>
                            </Link >
                        </div>
                    ))
                )}
            </div>
        </>

    );
}
