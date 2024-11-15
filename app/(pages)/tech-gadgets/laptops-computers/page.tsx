'use client';
import useGetPostItems from '@/lib/fetchData';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function Laptops_Computers() {
    const { loading, postItems } = useGetPostItems("Laptops and Computers");
    if (loading) return <div className="text-center mt-5"><h1 className='text-2xl'>loading products...</h1></div>;
    return (
        <>

            <div className="mt-5"><h2 className='text-2xl'>Laptops and Computers Products</h2></div>

            <div className="products">
                {postItems.length === 0 ? (
                    <div className=' text-center '>
                        <p className=''>No prducts available.</p>
                    </div>
                ) : (
                    postItems.map((item) => (
                        <Link href={`/tech-gadgets/laptops-computers/${item._id}`}>
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
                        </Link >
                    ))
                )}
            </div>
        </>

    );
}
