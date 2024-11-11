'use client'
import useGetPostItems from '@/lib/fetchData'

import React from 'react'

export default function Makeups() {
  const { loading, postItems } = useGetPostItems("makeup")

  if (loading) return <p>Loading</p>

  return (
    <>
      <div>Anti_aging</div>
      <div>
        {postItems.map(item => (
          <div key={item._id}>
            <h3>{item.pname}</h3>
            <h3>{item.description}</h3>
          </div>
        ))}
      </div>
    </>
  )
}
