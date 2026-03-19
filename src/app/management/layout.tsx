'use client';
import { getUserFromLocalStorage, isTokenExpired } from '@/utils/security';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchMaintenances } from '@/server/api';
import { IMaintenance, IRole, IUser } from '@/server/entity';
import { EStatusMaintenance } from '@/server/entity';
import { Spin } from 'antd';
export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<IMaintenance[]>([]);
  const fetchData = () => {
    setLoading(true);
    fetchMaintenances('')
      .then((res: any) => {
        if (
          res.data.filter((r: IMaintenance) => r.repairStatus !== EStatusMaintenance.COMPLETED)
            .length > 0
        ) {
          toast.warning(
            `Có ${
              res.data.filter((r: IMaintenance) => r.repairStatus !== EStatusMaintenance.COMPLETED)
                .length
            } yêu cầu sửa chữa từ ${res.data
              .filter((r: IMaintenance) => r.repairStatus !== EStatusMaintenance.COMPLETED)
              .map((r: IMaintenance) => r.username)
              .join(', ')}`
          );
        }
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!isTokenExpired()) {
      toast.warning('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại');
      router.push('/');
    }
  }, [router, user]);
  useEffect(() => {
    const isLoginUser = getUserFromLocalStorage();
    if (isLoginUser) {
      setUser(isLoginUser);
      const roles = isLoginUser.roles.map((role: IRole) => role.name);
      if (!roles.includes('MANAGER')) {
        toast.warning('Bạn không có quyền truy cập trang này !');
        router.push('/');
      } else {
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
    if (dataSource.length > 0) {
      toast.warning(`Có ${dataSource.length} yêu cầu sửa chữa`);
    }
  }, []);
  return (
    <div className="h-screen flex bg-gray-50 text-black overflow-hidden">
      <div className="flex-1 flex-col overflow-hidden">
        <main className="flex-1 pt-2 w-full overflow-y-auto">
          {loading ? <Spin size="large" tip="Đang tải..." /> : children}
        </main>
      </div>
    </div>
  );
}
