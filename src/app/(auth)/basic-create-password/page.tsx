import React from 'react';
import logoDark from '@/assets/images/logo-benh-vien-rmv-bg.png';
import logoLight from '@/assets/images/logo-benh-vien-rmv-bg.png';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Create Password' };
const Page = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-center py-16 md:py-10">
      <div className="card md:w-lg w-screen z-10">
        <div className="text-center px-10 py-12">
          <Link href="/" className="flex justify-center">
            <Image src={logoDark} alt="logo dark" className="h-full flex dark:hidden" width={100} />
            <Image
              src={logoLight}
              alt="logo light"
              className="h-full hidden dark:flex"
              width={100}
            />
          </Link>

          <div className="mt-8">
            <h4 className="mb-2 text-primary text-xl font-semibold">Tạo mật khẩu mới</h4>
            <p className="text-base/normal mb-8 text-default-500">
              Mật khẩu mới của bạn nên khác với bất kỳ mật khẩu trước đó nào của bạn
            </p>
          </div>

          <form action="/index">
            <div className="text-start">
              <label
                htmlFor="Email"
                className="inline-block mb-2 text-sm text-default-800 font-medium"
              >
                Mật khẩu
              </label>
              <input type="text" id="Email" className="form-input" placeholder="Mật khẩu" />
            </div>

            <div className="text-start mt-4">
              <label
                htmlFor="Email"
                className="inline-block mb-2 text-sm text-default-800 font-medium"
              >
                Xác nhận mật khẩu
              </label>
              <input
                type="text"
                id="Email"
                className="form-input"
                placeholder="Xác nhận mật khẩu"
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input id="checkbox-1" type="checkbox" className="form-checkbox" />
              <label className="text-default-900 text-sm font-medium" htmlFor="checkbox-1">
                Nhớ mật khẩu
              </label>
            </div>

            <div className="mt-8">
              <button type="button" className="btn bg-primary text-white w-full">
                Tạo mật khẩu
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-base text-default-800">
                Đã nhớ mật khẩu?{' '}
                <Link href="/basic-login" className="text-primary underline">
                  {' '}
                  Đăng nhập ngay{' '}
                </Link>
              </p>
            </div>
          </form>
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

export default Page;
