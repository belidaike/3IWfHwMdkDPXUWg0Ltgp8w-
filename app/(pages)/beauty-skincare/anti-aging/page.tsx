'use client';
import useGetPostItems from '@/lib/fetchData';
import React from 'react';
import Link from 'next/link';

export default function MakeUp() {
    const { loading, postItems } = useGetPostItems("Anti-Aging Products");


    if (loading) return <div className="text-center mt-5"><h1 className='text-2xl'>loading posts...</h1></div>;



    return (
        <>

            <h2>Anti-Aging Products</h2>

            <div className="products">
                {postItems.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    postItems.map((item) => (
                        <Link href={`/beauty-skincare/anti-aging/${item._id}`}>
                            <div key={item._id} className="product-card">
                                <img src={item.img} alt={item.pname} className="product-image" />
                                <div className="product-info">
                                    <h2>{item.pname}</h2>
                                    <p>{item.description}</p>
                                    <p>{item.price}</p>
                                    <Link href={item.alink} target="_blank" rel="noopener noreferrer">View More</Link>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </>

    );
}
