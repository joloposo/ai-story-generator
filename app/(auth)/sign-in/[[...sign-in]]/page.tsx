import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 bg-emerald-600'>
      <div>
        <Image src={'public/static/images/login.png'} alt='login' width={700} height={1000}   />
      </div>
      <div className='flex justify-center items-center h-screen order-first md:order-last'>
        <SignIn />
      </div>
    </div>
  );
}
