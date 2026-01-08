import React from 'react'
import prisma from '@/src/lib/prisma'

async function page() {
    const posts = await prisma.post.findMany()
  return (
      <main className="p-4 my-10 border-amber-900 border-2 rounded-lg">  
    
    <ul>
      {posts.map(post => (
        <li key={post.id}>This is {post.title}</li>
      ))}
    </ul>
    </main>
  )
}

export default page