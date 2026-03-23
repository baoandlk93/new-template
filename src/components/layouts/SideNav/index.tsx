import Image from 'next/image';
import Link from 'next/link';

import SimplebarClient from '@/components/client-wrapper/SimplebarClient';
import AppMenu from './AppMenu';
import HoverToggle from './HoverToggle';

import logoDark from '@/assets/images/logo-benh-vien.jpeg';
import logoLight from '@/assets/images/logo-benh-vien.jpeg';
import logoSm from '@/assets/images/logo-benh-vien.jpeg';
import { IUser } from '@/server/entity';

const Sidebar = ({ user }: { user: IUser | null }) => {
  return (
    <aside id="app-menu" className="app-menu">
      <Link
        href="/index"
        className="logo-box sticky top-0 flex min-h-topbar-height items-center justify-start px-6 backdrop-blur-xs"
      >
        <div className="logo-light">
          <Image src={logoLight} className="logo-lg h-full" alt="Light logo" width={111} />
          <Image src={logoSm} className="logo-sm h-full" alt="Small logo" />
        </div>

        <div className="logo-dark">
          <Image src={logoDark} className="logo-lg h-full" alt="Dark logo" width={111} />
          <Image src={logoSm} className="logo-sm h-full" alt="Small logo" />
        </div>
      </Link>

      <HoverToggle />

      <div className="relative min-h-0 flex-grow">
        <SimplebarClient className="size-full">
          <AppMenu user={user} />
        </SimplebarClient>
      </div>
    </aside>
  );
};

export default Sidebar;
