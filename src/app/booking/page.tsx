import { Metadata } from 'next';
import React from 'react';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';

export const metadata: Metadata = { title: 'Đặt lịch khám' };
const Page = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
    </>
  );
};

export default Page;
