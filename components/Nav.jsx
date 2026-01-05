import React from 'react';
import Image from "next/image";
import Link from 'next/link';

function Nav ({ className }) {
  return (
    <nav className= {`flex items-center justify-center ${className}`}>
    <Link href="/"><Image src="/images/logo.png" alt="logo" width={70} height={70}/>
    </Link>

    <div className='flex items-center gap-6 px-5 py-2'>
      <Link href="/" className='hover:text-gray-700 font-semibold'>Home</Link>
      <Link href="/services" className='hover:text-gray-700 font-semibold'>Services</Link>
      <Link href="/our_projects" className='hover:text-gray-700 font-semibold'>Our Projects</Link>
      <Link href="/about" className='hover:text-gray-700 font-semibold'>About Us</Link>
    </div>
    </nav>
  )
}

export default Nav