import React from 'react';
import TopNavBar from './TopNavBar';
import { Footer } from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavBar />
      <main className="flex-grow max-w-container-max w-full mx-auto px-margin-mobile md:px-gutter py-12 flex flex-col gap-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
