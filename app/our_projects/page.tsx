import React from 'react'
import Link from "next/link";
import prisma from '@/src/lib/prisma'
import { createPost } from '@src/actions/action'

async function Projects() {
  const posts = await prisma.post.findMany()
  return (
    <main className='p-4 my-10 border-amber-900 border-2 rounded-lg'>  
      <div><h1>our projects page</h1></div>
    <ul>
      {posts.map(post => (
        <li
         key={post.id}><Link href={`/our_projects/${post.slug}`}>{post.title}</Link></li>
      ))}
    </ul>

      <form action={createPost} className='mt-10 flex flex-col gap-4'>
        <input type='text' name='title' placeholder='Title' className='border border-amber-900 rounded-lg p-2'/>
        <textarea name='content' placeholder='Content' className='border border-amber-900 rounded-lg p-2'/>
        <button type='submit' className='bg-amber-900 text-white rounded-lg p-2'>Create Post</button>
      </form>

    </main>
  )
}

export default Projects