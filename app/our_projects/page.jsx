import React from 'react'
import prisma from '@/src/lib/prisma'

async function projects() {
  const posts = await prisma.post.findMany()
  return (
    <main className='p-4 my-10 border-amber-900 border-2 rounded-lg'>  
      <div><h1>our projects page</h1></div>
    <ul>
      {posts.map(post => (
        <li
         key={post.id}><a href={`/our_projects/${post.slug}`}>{post.title}</a></li>
      ))}
    </ul>
    </main>
  )
}

export default projects