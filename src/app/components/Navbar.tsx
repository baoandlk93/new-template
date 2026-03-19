'use client';
import darkLogo from '@/assets/images/logo-benh-vien.jpeg';
import logoLight from '@/assets/images/logo-benh-vien.jpeg';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import avatar1 from '@/assets/images/user/avatar-1.png';
import { ReactNode, useEffect, useState } from 'react';
import { LuGem, LuLogOut, LuMail, LuMessagesSquare, LuLogIn } from 'react-icons/lu';
import { ERole, IRole, IUser } from '@/server/entity';
import { getUserFromLocalStorage, setUserToLocalStorage } from '@/utils/security';
import { useRouter } from 'next/navigation';
import { checkToken } from '@/server/api';
import { toast } from 'react-toastify';
import { ImProfile } from 'react-icons/im';
type ProfileMenuItem = {
  icon?: ReactNode;
  label?: string;
  href?: string;
  badge?: string;
  divider?: boolean;
};
const profileMenu: ProfileMenuItem[] = [
  { icon: <ImProfile className="size-4" />, label: 'Thông tin tài khoản', href: '/profile' },
  {
    icon: <LuMail className="size-4" />,
    label: 'Hộp thư',
    href: '/mailbox',
    badge: '15',
  },
  { icon: <LuMessagesSquare className="size-4" />, label: 'Chat', href: '/chat' },
  { divider: true },
  {
    icon: <LuLogOut className="size-4" />,
    label: 'Đăng xuất',
    href: '/basic-logout',
  },
];
const Navbar = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  const checkValidToken = async (): Promise<boolean> => {
    try {
      const res = await checkToken();
      if (res.status === 200) {
        return true;
      } else if (res.status === 401) {
        toast.error('Phiên làm việc đã hết hạn vui lòng đăng nhập lại');
        return false;
      }
      return false;
    } catch (e) {
      console.log(e, 'error');
      return false;
    }
  };
  const roles = user?.roles.map((role: IRole) => role.name);
  useEffect(() => {
    const init = async () => {
      const currentUser = getUserFromLocalStorage();
      if (currentUser) {
        const isValid = await checkValidToken();
        if (!isValid) {
          setUserToLocalStorage(null as unknown as IUser);
          setUser(null);
          return;
        }
        setUser(currentUser);
        if (
          currentUser.roles.map((role: IRole) => role.name).includes('ADMIN') ||
          currentUser.roles.map((role: IRole) => role.name).includes('MANAGER')
        ) {
          // router.push("/admin");
        } else {
          console.log('user', currentUser);
          router.push('/');
        }
      } else {
        setUser(null);
      }
    };
    init();
  }, []);
  return (
    <header>
      <nav className="fixed inset-x-0 top-0 z-50 bg-card py-6  shadow flex justify-between items-center">
        <div className="container">
          <div className="grid lg:grid-cols-12 md:grid-cols-10 grid-cols-2 items-center">
            <div className="lg:col-span-2 md:col-span-2">
              <Link href="/">
                <Image
                  src={darkLogo}
                  alt="logo dark"
                  className="h-full block dark:hidden"
                  width={111}
                />
                <Image
                  src={logoLight}
                  alt="logo light"
                  className="h-full hidden dark:block"
                  width={111}
                />
              </Link>
            </div>

            <div className="lg:col-span-8 md:col-span-6 md:block hidden">
              <ul className="flex items-center justify-center lg:gap-8 md:gap-6 font-medium text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-default-800  hover:text-primary transition duration-300"
                  >
                    Trang chủ
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="text-default-800  hover:text-primary transition duration-300"
                  >
                    Giới thiệu
                  </Link>
                </li>

                <li>
                  <Link
                    href="/business-calendar"
                    className="text-default-800  hover:text-primary transition duration-300"
                  >
                    Lịch công tác
                  </Link>
                </li>

                <li>
                  <Link
                    href="/administrative-reform"
                    className="text-default-800  hover:text-primary transition duration-300"
                  >
                    Cải cách hành chính
                  </Link>
                </li>

                <li>
                  <Link
                    href="/bidding-information"
                    className="text-default-800  hover:text-primary transition duration-300"
                  >
                    Thông tin đấu thầu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="text-default-800  hover:text-primary transition duration-300"
                  >
                    Đặt lịch khám
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 md:col-span-2 flex items-center justify-end gap-2">
              <MobileMenu />

              {user ? (
                <div className="topbar-item hs-dropdown relative inline-flex">
                  <button className="cursor-pointer bg-pink-100 rounded-full">
                    <Image
                      src={avatar1}
                      alt="user"
                      className="hs-dropdown-toggle rounded-full size-9.5"
                    />
                  </button>
                  <div className="hs-dropdown-menu min-w-48">
                    <div className="p-2">
                      <h6 className="mb-2 text-default-500">Chào mừng</h6>
                      <Link
                        href={roles?.includes('ADMIN') ? '/admin' : '#!'}
                        className="flex gap-3"
                      >
                        <div className="relative inline-block">
                          <Image
                            src={user.avatar ? user.avatar : avatar1}
                            alt="user"
                            className="size-12 rounded"
                          />
                          <span className="-top-1 -end-1 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                          <h6 className="mb-1 text-sm font-semibold text-default-800">
                            {user.fullName ? user.fullName : user.username}
                          </h6>
                          <p className="text-default-500">{user.username}</p>
                        </div>
                      </Link>
                    </div>

                    <div className="border-t border-default-200 -mx-2 my-2"></div>

                    <div className="flex flex-col gap-y-1">
                      {profileMenu.map((item, i) =>
                        item.divider ? (
                          <div key={i} className="border-t border-default-200 -mx-2 my-1"></div>
                        ) : (
                          <Link
                            key={i}
                            href={item.href || '#!'}
                            className="flex items-center gap-x-3.5 py-1.5 px-3 text-default-600 hover:bg-default-150 rounded font-medium"
                          >
                            {item.icon}
                            {item.label}
                            {item.badge && (
                              <span className="size-4.5 font-semibold bg-danger rounded text-white flex items-center justify-center text-xs">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="flex justify-end">
                  <button type="button" className="btn bg-primary text-white">
                    Đăng nhập
                    <LuLogIn className="size-4" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
