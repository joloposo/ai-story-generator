import { ClerkProvider } from '@clerk/nextjs';
import { NextUIProvider } from '@nextui-org/react';
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProviderProps {
    children: ReactNode;
}

function Provider({ children }: ProviderProps) {
    return (
        <ClerkProvider>
            <NextUIProvider>
                {children}
                <ToastContainer />
            </NextUIProvider>
        </ClerkProvider>
    );
}

export default Provider;
