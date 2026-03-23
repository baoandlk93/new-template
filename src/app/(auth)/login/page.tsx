'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setUserToLocalStorage, getUserFromLocalStorage } from '@/utils/security';
import { IRole, IUser } from '@/server/entity';
import ArabianFlag from '@/assets/images/flags/arebian.svg';
import FrenchFlag from '@/assets/images/flags/french.jpg';
import GermanyFlag from '@/assets/images/flags/germany.jpg';
import ItalyFlag from '@/assets/images/flags/italy.jpg';
import JapaneseFlag from '@/assets/images/flags/japanese.svg';
import RussiaFlag from '@/assets/images/flags/russia.jpg';
import SpainFlag from '@/assets/images/flags/spain.jpg';
import UsFlag from '@/assets/images/flags/us.jpg';
import LogoLight from '@/assets/images/logo-benh-vien.jpeg';
import modern from '@/assets/images/modern.svg';
import IconifyIcon from '@/components/client-wrapper/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { login } from '@/server/api';
import { LuMail, LuSmartphone } from 'react-icons/lu';
import { currentYear } from '@/helpers/constants';
import { useForm, Resolver } from 'react-hook-form';

type FormValues = {
  username: string;
  password: string;
};
const resolver: Resolver<FormValues> = async values => {
  return {
    values: values.username ? values : {},
    errors: !values.username
      ? {
          firstName: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};
const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit(async data => {
    setLoading(true);
    try {
      const response = await login(data.username, data.password);

      if (response?.status === 401) {
        toast.error('Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.');
      } else if (response?.status === 200) {
        setUserToLocalStorage(response.data.data);
        setUser(response.data.data);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      setLoading(false);
    }
    console.log(data);
  });

  useEffect(() => {
    if (user) {
      const roles = user.roles.map((role: IRole) => role.name);
      if (roles.includes('ADMIN')) {
        toast.success('Chào mừng admin!');
        router.push('/admin');
      } else {
        toast.success('Đăng nhập thành công!');
        router.push('/');
      }
    }
  }, [user]);
  useEffect(() => {
    const isLoginUser = getUserFromLocalStorage();
    if (isLoginUser) {
      const roles = isLoginUser.roles.map((role: IRole) => role.name);
      if (roles.includes('ADMIN')) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, []);
  return (
    <div className="relative flex flex-row w-full overflow-hidden bg-gradient-to-r from-blue-900 h-screen to-blue-800 dark:to-blue-900 dark:from-blue-950">
      <div className="absolute inset-0 opacity-20">
        <Image src={modern} alt="" />
      </div>

      <div className="mx-4 m-4 w-160 py-14 px-10 bg-card flex justi+fy-center rounded-md text-center relative z-10">
        <div className="flex flex-col h-full w-full">
          <div className="flex justify-end">
            <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
              <button
                type="button"
                className="hs-dropdown-toggle py-2 px-4 bg-transparent border border-default-200 text-default-600 hover:border-primary rounded-md hover:text-primary font-medium text-sm gap-2 flex items-center"
              >
                <Image src={UsFlag} alt="US Flag" className="size-5 rounded-full" />
                English
              </button>

              <div className="hs-dropdown-menu">
                <a className="flex items-center gap-x-3.5 py-1.5 font-medium px-3 text-default-600 hover:bg-default-150 rounded">
                  <Image src={UsFlag} alt="US Flag" className="size-4 rounded-full" />
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

          <div className="my-21">
            <div className="mt-10">
              <div
                className="flex justify-center gap-x-3"
                aria-label="Tabs"
                role="tablist"
                aria-orientation="horizontal"
              >
                <button
                  type="button"
                  className="hs-tab-active:bg-primary hs-tab-active:text-white text-sm py-2.5 px-12 text-default-500 rounded-md bg-default-100 font-medium gap-2 flex items-center transition-all duration-300 active"
                  id="tabs-with-underline-item-1"
                  aria-selected="true"
                  data-hs-tab="#tabsForEmail"
                  aria-controls="tabsForEmail"
                  role="tab"
                >
                  <LuMail className="size-4" />
                  Username
                </button>

                <button
                  type="button"
                  className="hs-tab-active:bg-primary hs-tab-active:text-white text-sm py-2.5 px-12 text-default-500 rounded-md bg-default-100 font-medium gap-2 flex items-center transition-all duration-300"
                  id="tabs-with-underline-item-2"
                  aria-selected="false"
                  data-hs-tab="#tabsForPhone"
                  aria-controls="tabsForPhone"
                  role="tab"
                >
                  <LuSmartphone className="size-4" />
                  Phone
                </button>
              </div>

              <div className="mt-10 w-100 mx-auto">
                <div id="tabsForEmail" role="tabpanel" aria-labelledby="tabs-with-underline-item-1">
                  <form onSubmit={handleSubmit(onSubmit)} className="text-left w-full mt-10">
                    <div className="mb-4 ">
                      <label
                        htmlFor="Username"
                        className="block  font-medium text-default-900 text-sm mb-2"
                      >
                        Tài khoản
                      </label>
                      <input
                        type="text"
                        id="Username"
                        {...register('username')}
                        className="form-input"
                        placeholder="Enter Username or email"
                      />
                    </div>

                    <div className="mb-4">
                      <Link
                        href="/modern-reset-password"
                        className="text-primary font-medium text-sm mb-2 float-end"
                      >
                        Quên mật khẩu ?
                      </Link>
                      <label
                        htmlFor="Password"
                        className="block  font-medium text-default-900 text-sm mb-2"
                      >
                        Mật khẩu
                      </label>
                      <input
                        {...register('password')}
                        type="password"
                        id="Password"
                        className="form-input"
                        placeholder="Enter Password"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <input id="checkbox-1" type="checkbox" className="form-checkbox" />
                      <label className="text-default-900 text-sm font-medium" htmlFor="checkbox-1">
                        Duy trì đăng nhập
                      </label>
                    </div>

                    <div className="mt-10 text-center">
                      <button type="submit" className="btn bg-primary text-white w-full">
                        Đăng nhập
                      </button>
                    </div>

                    <div className="mt-10 text-center">
                      <p className="text-base text-default-500">
                        Không có tài khoản ?
                        <Link
                          href="/modern-register"
                          className="font-semibold underline hover:text-primary transition duration-200"
                        >
                          {' '}
                          Đăng ký
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>

                <div
                  id="tabsForPhone"
                  className="hidden"
                  role="tabpanel"
                  aria-labelledby="tabs-with-underline-item-2"
                >
                  <form action="/index" className="text-left w-full mt-10">
                    <div className="mb-4">
                      <label
                        htmlFor="Phone Number"
                        className="block  font-medium text-default-900 text-sm mb-2"
                      >
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        id="Phone Number"
                        className="form-input"
                        placeholder="Enter Phone"
                      />
                    </div>

                    <div className="mb-4">
                      <Link
                        href="/modern-reset-password"
                        className="text-primary font-medium text-sm mb-2 float-end"
                      >
                        Quên mật khẩu ?
                      </Link>
                      <label
                        htmlFor="Password"
                        className="block  font-medium text-default-900 text-sm mb-2"
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="text"
                        id="Password"
                        className="form-input"
                        placeholder="Enter Password"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <input id="checkbox-1" type="checkbox" className="form-checkbox" />
                      <label className="text-default-900 text-sm font-medium" htmlFor="checkbox-1">
                        Duy trì đăng nhập
                      </label>
                    </div>

                    <div className="mt-10 text-center">
                      <button type="button" className="btn bg-primary text-white w-full">
                        Đăng nhập
                      </button>
                    </div>

                    <div className="mt-10 text-center">
                      <p className="text-base text-default-500">
                        Không có tài khoản ?
                        <Link
                          href="/modern-register"
                          className="font-semibold underline hover:text-primary transition duration-200"
                        >
                          {' '}
                          Đăng ký
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <span className="text-sm text-default-500 flex gap-1">
              <IconifyIcon icon="lucide:copyright" className="w-4 h-4 align-middle" />
              {currentYear} Habio. Crafted with
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
              className="h-full mb-14 mx-auto block rounded-full"
              width={250}
              height={200}
            />
          </Link>

          <div className="mt-10 text-center">
            <h3 className="mb-3 text-blue-50 text-2xl font-semibold text-center">
              Bệnh viện Phổi Khánh Hòa
            </h3>
            <p className="text-blue-300 text-base w-2xl text-center">
              Unlock the potential of our versatile branding tools, designed to empower your
              business in shaping a distinctive and impactful brand. Elevate your business's image
              and leave a lasting impression with our comprehensive branding solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
