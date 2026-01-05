import React from 'react'
import prisma from '@/lib/prisma'

async function projects() {
  const posts = await prisma.post.findMany()
  return (
    <main>  
      <div><h1>our projects page</h1></div>
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
    </main>
  )
}

export default projects