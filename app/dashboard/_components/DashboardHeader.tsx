import Image from 'next/image'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='p-7 bg-primary text-white flex justify-between items-center'>
        <h2 className='font-bold text-3xl'>My Stories</h2>
        <div className='flex gap-3 items-center'>
            <Image src='/coin.png' alt='coins' width={50} height={50} />
            <span className='text-2 xl'>3 Credit Left </span>
        </div>
    </div>
  )
}

export default DashboardHeader