import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Mongo Manager',
  description: 'MongoDB management tool'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-nunito">
        <Header />
        {children}
      </body>
    </html>
  );
}
