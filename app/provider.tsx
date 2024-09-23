import { ClerkProvider } from '@clerk/nextjs';
import { NextUIProvider } from '@nextui-org/react';
import React, { ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {
  return (
    <ClerkProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ClerkProvider>
  );
}

export default Provider;
