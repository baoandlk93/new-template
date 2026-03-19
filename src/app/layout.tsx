import ProvidersWrapper from '@/components/ProvidersWrapper';
import type { Metadata } from 'next';
import { DM_Sans, Roboto } from 'next/font/google'; // Thay Tourney bằng Roboto cho dễ đọc
import NextTopLoader from 'nextjs-toploader';
import { DEFAULT_PAGE_TITLE } from '../helpers/constants';
import favicon from '@/assets/images/logo-benh-vien.jpeg';

import 'flatpickr/dist/flatpickr.css';
import 'swiper/swiper-bundle.css';
import '../assets/css/style.css';

const getdmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'], // Giảm số lượng weight để dễ quản lý
  display: 'swap',
});

const getRoboto = Roboto({
  // Cung cấp thêm font Roboto cho văn bản
  variable: '--font-roboto',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: DEFAULT_PAGE_TITLE,
    template: '%s | Bệnh viện Phổi Khánh Hòa',
  },
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${getdmSans.variable} ${getRoboto.variable} antialiased`}>
        <NextTopLoader showSpinner={false} color="var(--color-primary)" />
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
