import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 mt-10 h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <h2 className='text-[70px] text-primary font-extrabold py-10'>
            Craft Magical Stories for kids in Minutes
          </h2>
          <p className='text-2xl text-primary font-light'>
            Vygeneruj si rozpravku podla svojho zelania.
          </p>
          <Link href={'/create-story'}>
            <Button
              size='lg'
              color='primary'
              className='mt-5 font-bold text-2xl p-8'
            >
              Create Story
            </Button>
          </Link>
        </div>
        <div>
          <Image src={'static/images/hero.png'} alt='Hero' width={700} height={400} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
