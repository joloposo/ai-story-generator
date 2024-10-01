'use client';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { NextUIProvider } from '@nextui-org/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { eq } from 'drizzle-orm'; // Replace 'some-library' with the actual library name
import { UserDetailContext } from './_context/UserDetailContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {
  const [userDetail, setUserDetail] = useState<any>();
  const { user } = useUser();
  useEffect(() => {
    user && saveUserIfNotExists();
  }, [user]);

  const saveUserIfNotExists = async () => {
    const userResult = await db
      .select()
      .from(Users)
      .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ''));

    console.log(userResult);

    if (!userResult[0]) {
      const result = await db
        .insert(Users)
        .values({
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImage: user?.imageUrl,
        })
        .returning({
          userEmail: Users.userEmail,
          userName: Users.userName,
          userImage: Users.userImage,
          credit: Users.credit,
        });

      setUserDetail(result[0]);
    } else {
      setUserDetail(userResult[0]);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '', currency: 'EUR' }}>
      <NextUIProvider>
        {children}
        <ToastContainer />
      </NextUIProvider>
      </PayPalScriptProvider>
    </UserDetailContext.Provider> 
  );
}

export default Provider;
