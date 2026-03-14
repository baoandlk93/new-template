'use client';
import React, { useEffect } from 'react';
import logoDark from '@/assets/images/logo-benh-vien.jpeg';
import logoLight from '@/assets/images/logo-benh-vien.jpeg';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { LuLogOut } from 'react-icons/lu';
import { removeUserFromLocalStorage } from '@/utils/security';

const page = () => {
  useEffect(() => {
    removeUserFromLocalStorage();
  }, []);
  return (
    <div className="relative min-h-screen w-full flex justify-center items-center py-16 md:py-10">
      <div className="card md:w-lg w-screen z-10">
        <div className="text-center px-10 py-12">
          <Link href="/index" className="flex justify-center">
            <Image src={logoDark} alt="logo dark" className="h-full flex dark:hidden" width={111} />
            <Image
              src={logoLight}
              alt="logo light"
              className="h-full hidden dark:flex"
              width={111}
            />
          </Link>
          <div className="mt-8 text-center">
            <div className="mb-4">
              <LuLogOut className="size-6 text-purple-500 fill-purple-100 mx-auto" />
            </div>
            <h4 className="mb-2 text-primary text-xl font-semibold">Bạn đã đăng xuất</h4>
            <p className="mb-8 text-base text-default-500">Tạm biệt và hẹn gặp lại</p>
          </div>
          <Link href="/">
            <button className="btn bg-primary text-white w-full">Về trang chủ</button>
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full fill-black/2 stroke-black/5 dark:fill-white/2.5 dark:stroke-white/2.5"
        >
          <defs>
            <pattern
              id="authPattern"
              width="56"
              height="56"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="16"
            >
              <path d="M.5 56V.5H72" fill="none"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#authPattern)"></rect>
        </svg>
      </div>
    </div>
  );
};

export default page;
