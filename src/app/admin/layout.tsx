'use client';
import type { ReactNode } from 'react';

import Footer from '@/components/layouts/Footer';
import Sidebar from '@/components/layouts/SideNav';
import Topbar from '@/components/layouts/topbar';
import Customizer from '@/components/layouts/customizer';
import useLocalAuth from '@/hooks/useLocalAuth';

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, isAuthenticated } = useLocalAuth({
    storageKey: 'user',
    redirectTo: '/login',
    redirectIfUnauthenticated: true, // nếu chưa login => redirect tới /login
  });
  if (isLoading) return <div>Đang tải...</div>;
  if (!isAuthenticated) return null; // hook đã redirect nếu bật redirectIfUnauthenticated
  return (
    <>
      <div className="wrapper">
        <Sidebar user={user} />
        <div className="page-content">
          <Topbar user={user} />
          {children}
          <Footer />
        </div>
      </div>
      <Customizer />
    </>
  );
};

export default Layout;
