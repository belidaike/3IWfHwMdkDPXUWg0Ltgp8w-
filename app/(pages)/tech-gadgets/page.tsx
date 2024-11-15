// components/BeautyandSkin.tsx
'use client';
import useGetPostItems from '@/lib/fetchAllCategory';
import React from 'react';
import Link from 'next/link';


export default function BeautyandSkin() {
    const oiurl = 'Tech and Gadgets'
    const { loading, postItems } = useGetPostItems("Tech and Gadgets");
    console.log(postItems)
    if (loading) return <div className="text-center mt-5"><h1 className='text-2xl'>loading posts...</h1></div>;
    return (
        <>
            <h2>Beauty & Skincare</h2>

            <div className="products">
                {postItems.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    postItems.map((item) => (
                        <div key={item._id} className="product-card">
                            <Link href={`/tech-gadgets/${oiurl}/${item._id}`}>
                                <img src={item.img} alt={item.pname} className="product-image" />
                                <div className="product-info">
                                    <h2>{item.pname}</h2>
                                    {/* <p>{item.description}</p> */}
                                    <p>₱{item.price}</p>
                                    <a href={item.alink} target="_blank" rel="noopener noreferrer">View More</a>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
