import { Metadata } from 'next';
import React from 'react';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import InvoiceList from './components/InvoiceList';
import InvoiceDetails from './components/InvoiceDetails';
import { fetchPublicDepartments } from '@/server/api';
export const metadata: Metadata = { title: 'Giới thiệu' };
const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const data = await fetchPublicDepartments();
  const { id } = await params;
  return (
    <>
      <Navbar />
      <section className="relative lg:pt-40 lg:pb-36 md:pt-34 md:pb-20 pt-30 pb-16 px-4">
        <PageBreadcrumb title="" subtitle="Giới thiệu" />
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
          <InvoiceList data={data} />
          <InvoiceDetails id={id} />
        </div>
      </section>
      <ScrollToTop />
    </>
  );
};

export default Page;
