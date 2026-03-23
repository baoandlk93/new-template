'use client';
import modernImg from '@/assets/images/auth-modern.png';
import ArabianFlag from '@/assets/images/flags/arebian.svg';
import FrenchFlag from '@/assets/images/flags/french.jpg';
import GermanyFlag from '@/assets/images/flags/germany.jpg';
import ItalyFlag from '@/assets/images/flags/italy.jpg';
import JapaneseFlag from '@/assets/images/flags/japanese.svg';
import RussiaFlag from '@/assets/images/flags/russia.jpg';
import SpainFlag from '@/assets/images/flags/spain.jpg';
import VietnamFlag from '@/assets/images/flags/Flag_of_Vietnam.svg.png';
import LogoLight from '@/assets/images/logo-benh-vien.jpeg';
import modern from '@/assets/images/modern.svg';
import IconifyIcon from '@/components/client-wrapper/IconifyIcon';
import { removeUserFromLocalStorage } from '@/utils/security';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { LuLogOut } from 'react-icons/lu';

const Page = () => {
  useEffect(() => {
    removeUserFromLocalStorage();
  }, []);
  return (
    <div className="relative flex flex-row w-full overflow-hidden bg-gradient-to-r from-blue-900 h-screen to-blue-800 dark:to-blue-900 dark:from-blue-950">
      <div className="absolute inset-0 opacity-20">
        <Image src={modern} alt="" />
      </div>

      <div className="mx-4 m-4 w-160 py-14 px-10 bg-card flex justify-center rounded-md text-center relative z-10">
        <div className="flex flex-col h-full w-full">
          <div className="flex justify-end">
            <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
              <button
                type="button"
                className="hs-dropdown-toggle py-2 px-4 bg-transparent border border-default-200 text-default-600 hover:border-primary rounded-md hover:text-primary font-medium text-sm gap-2 flex items-center"
              >
                <Image src={VietnamFlag} alt="Vietnam Flag" className="size-5 rounded-full" />
                Vietnamese
              </button>

              <div className="hs-dropdown-menu">
                <a className="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded">
                  <Image src={VietnamFlag} alt="US Flag" className="size-4 rounded-full" />
                  English
                </a>
                <a className="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded">
                  <Image src={SpainFlag} alt="Spain" className="size-4 rounded-full" />
                  Spanish
                </a>
                <a className="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded">
                  <Image src={GermanyFlag} alt="Germany" className="size-4 rounded-full" />
                  German
                </a>
                <a className="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded">
                  <Image src={FrenchFlag} alt="France" className="size-4 rounded-full" />
                  French
                </a>
                <a className="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded">
                  <Image src={JapaneseFlag} alt="Japan" className="size-4 rounded-full" />
                  Japanese
                </a>
                <a className="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded">
                  <Image src={ItalyFlag} alt="Italy" className="size-4 rounded-full" />
                  Italian
                </a>
                <a className="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded">
                  <Image src={RussiaFlag} alt="Russia" className="size-4 rounded-full" />
                  Russian
                </a>
                <a className="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded">
                  <Image src={ArabianFlag} alt="Arabic" className="size-4 rounded-full" />
                  Arabic
                </a>
              </div>
            </div>
          </div>

          <div className="my-auto">
            <div className="mt-8 text-center">
              <div className="mb-4">
                <LuLogOut className="size-6 text-purple-500 fill-purple-100 mx-auto" />
              </div>
              <h4 className="mb-2 text-primary text-xl font-semibold">Bạn đã đăng xuất</h4>
              <p className="mb-8 text-base text-default-500">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
              </p>
            </div>

            <Link href="/">
              <button className="btn bg-primary text-white w-full">Về trang chủ</button>
            </Link>
          </div>

          <div className="mt-5 flex justify-center">
            <span className="text-sm text-default-500 flex gap-1">
              <IconifyIcon icon="lucide:copyright" className="w-4 h-4 align-middle" />
              2026 Habio. Made with
              <IconifyIcon
                icon="tabler:heart-filled"
                className="w-4 h-4 text-danger align-middle"
              />
              by{' '}
              <Link
                href="https://themesdesign.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-default-800 hover:text-primary transition duration-200 underline"
              >
                Themesdesign
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-10 py-14 grow">
        <div>
          <Link href="/" className="index">
            <Image
              src={LogoLight}
              alt=""
              className="h-full w-auto mb-14 mx-auto block rounded-full"
              width={111}
            />
          </Link>

          <div className="mt-10 text-center">
            <h3 className="mb-3 text-blue-50 text-2xl font-semibold text-center">
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
            </h3>
            <p className="text-blue-300 text-base w-2xl text-center">
              Chúng tôi hy vọng bạn đã có trải nghiệm tốt với dịch vụ của chúng tôi. Hẹn gặp lại bạn
              trong tương lai!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
