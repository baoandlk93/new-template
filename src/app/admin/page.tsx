import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Metadata } from 'next';
import React from 'react';
import ProductOrderDetails from './components/ProductOrderDetails';
import SalesRevenueOverview from './components/SalesRevenueOverview';
import TrafficResources from './components/TrafficResources';
import SalesThisMonth from './components/SalesThisMonth';
import TopSellingProducts from './components/TopSellingProducts';
import Audience from './components/Audience';

export const metadata: Metadata = { title: 'Dashboards' };
const Page = () => {
  return (
    <main>
      <PageBreadcrumb title="Admin Dashboards" subtitle="Dashboards" />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mb-5">
        <div className="lg:col-span-2 col-span-1">
          <ProductOrderDetails />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mb-5">
        <SalesRevenueOverview />
        <TrafficResources />
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
        <SalesThisMonth />
        <TopSellingProducts />
        <Audience />
      </div>
    </main>
  );
};

export default Page;
