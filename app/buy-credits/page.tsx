'use client';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { PayPalButtons, DISPATCH_ACTION, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { eq } from 'drizzle-orm';
import React, { use, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserDetailContext } from '../_context/UserDetailContext';
import { useRouter } from 'next/navigation';

function BuyCredits() {
  const optionsList = [
    {
      id: 1,
      price: 1.99,
      credits: 10,
    },
    {
      id: 2,
      price: 4.99,
      credits: 50,
    },
    {
      id: 3,
      price: 9.99,
      credits: 100,
    },
    {
      id: 4,
      price: 19.99,
      credits: 200,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [selectedPrice, setSelectedPrice] = useState<string>('0.01');
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const notify = (message: string) => toast(message);
  const notifyError = (message: string) => toast.error(message);

  useEffect(() => {
    if (!selectedOption) return;

    const price = optionsList.find((option) => option.id === selectedOption)?.price ?? 0;
    setSelectedPrice(price.toFixed(2));

    setCurrency('EUR');
    console.log('Setting amount to', 'EUR');

    // dispatch({
    //   type: 'resetOptions' as any, // Temporarily cast to any if you are sure this is the correct action
    //   value: {
    //     ...options,
    //     currency: 'EUR',
    // },
    // });
  }, [selectedOption]);

  const OnPaymentSuccess = async () => {
    const result = await db
      .update(Users)
      .set({ credit: userDetail?.credit + optionsList.find((option) => option.id === selectedOption)?.credits })
      .where(eq(Users.userEmail, userDetail?.userEmail ?? ''));

    if (result) {
      notify('Credits added successfully');
      setUserDetail((prev: any) => ({
        ...prev,
        credit: userDetail?.credit + optionsList.find((option) => option.id === selectedOption)?.credits,
      }));

      router.replace('/dashboard');
    } else {
      notifyError('Error adding credits');
    }
  };

  return (
    <div className='min-h-screen text-center p-10 md:px-20 lg:px-40'>
      <h2 className='text-4xl font-bold text-primary'>Buy More Credits</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 items-center justify-center'>
        <div>
          {optionsList.map((option, index) => (
            <div
              className={`p-6 my-3 border bg-primary text-center rounded-xl text-white cursor-pointer hover:scale-105 transition-all
                ${selectedOption === option.id && 'bg-slate-800'}`}
              onClick={() => setSelectedOption(option.id)}
              key={index}
            >
              <h2>
                Get {option.credits} Credits = {option.credits} Stories
              </h2>
              <h2 className='font-bold text-2xl'>{option.price} EUR</h2>
            </div>
          ))}
        </div>
        <div>
          {isPending ? <div className='spinne' /> : null}
          <PayPalButtons
            style={{ layout: 'vertical' }}
            onClick={() => console.log('clicked ' + selectedPrice)}
            disabled={!selectedOption || selectedOption == 0}
            createOrder={(data, actions) => createOrder(data, actions, selectedPrice)}
            forceReRender={[selectedPrice]}
            onCancel={() => notifyError('Transaction cancelled')}
            onApprove={() => OnPaymentSuccess()}
          />
        </div>
      </div>
    </div>
  );

  function createOrder(data: Record<string, unknown>, actions: any, _price: string) {
    console.log('Creating order for amount', selectedPrice);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: _price,
          },
        },
      ],
      intent: 'CAPTURE',
    });
  }
}

export default BuyCredits;
