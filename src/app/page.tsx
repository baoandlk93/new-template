import { Metadata } from 'next';
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Feature from './components/Feature';
import Works from './components/Works';
import About from './components/About';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export const metadata: Metadata = { title: 'Bệnh viện Phổi Khánh Hòa' };
const Page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <Works />
      <About />
      <Pricing />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Page;
