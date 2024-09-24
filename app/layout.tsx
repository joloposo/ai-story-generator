import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Provider from './provider';
import { Nunito } from 'next/font/google';
import Header from './_components/Header';

const MyAppFont = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={MyAppFont.className}>
        <Provider>
          {/* Header */}
          <Header />   
          {children}
        </Provider>
      </body>
    </html>
  );
}
