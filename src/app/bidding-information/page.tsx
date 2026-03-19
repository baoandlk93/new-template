import { Metadata } from 'next';
import React from 'react';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';

export const metadata: Metadata = { title: 'Thông tin đấu thầu' };
const Page = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
    </>
  );
};

export default Page;
