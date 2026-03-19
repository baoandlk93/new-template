import React from 'react';
import Analytics from './components/Analytics';
import PagesInteraction from './components/PagesInteraction';
import StatusOfMonthlyCampaign from './components/StatusOfMonthlyCampaign';
import TrafficSource from './components/TrafficSource';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics' };

const Page = () => {
  return (
    <main>
      <PageBreadcrumb title="Thống kê" subtitle="Bảng điều khiển" />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mb-5">
        <Analytics />
        <TrafficSource />
        <StatusOfMonthlyCampaign />
        <PagesInteraction />
      </div>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-5 mb-5"></div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-5"></div>
    </main>
  );
};

export default Page;
