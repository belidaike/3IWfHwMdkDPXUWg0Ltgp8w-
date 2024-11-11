'use client'
import useGetPostItems from '@/lib/fetchData'
import React from 'react'

export default function Anti_aging() {
    const { loading, postItems } = useGetPostItems("anti-aging")

    if (loading) return <p>Loading</p>

    return (
        <>
            <div>Anti_aging</div>
            <div>
                {postItems.map(item => (
                    <div key={item._id}>
                        <h3>{item.pname}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}
