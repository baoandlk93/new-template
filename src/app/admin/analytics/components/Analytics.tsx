'use client';
import { LuCog, LuCoins, LuKanban, LuListFilter, LuUsers } from 'react-icons/lu';
import { fetchCopdPatients } from '@/server/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const Analytics = () => {
  const [totalCopdPatients, setTotalCopdPatients] = useState(0);
  const fetchData = async (page: number, size: number) => {
    await fetchCopdPatients(page, size).then(res => {
      if (res?.status === 200) {
        setTotalCopdPatients(res.data.totalElements);
      } else {
        toast.error('Có lỗi khi lấy dữ liệu vui lòng thử lại !');
      }
    });
  };
  useEffect(() => {
    fetchData(0, 10);
  }, []);
  return (
    <div className="col-span-1">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <div className="card bg-success/15 overflow-hidden">
          <div className="card-body">
            <LuKanban className="absolute top-0 size-32 text-success/10 -end-10" />
            <div className="btn btn-icon size-12 bg-green-800">
              <LuUsers className="size-6 text-green-50" />
            </div>
            <h5 className="mt-5 mb-2 text-lg font-semibold">
              <span data-target="15876">{totalCopdPatients}</span>
            </h5>
            <p className="text-sm text-default-700">Tổng số bệnh nhân Hen-COPD</p>
          </div>
        </div>

        <div className="card bg-danger/15 overflow-hidden">
          <div className="card-body">
            <LuListFilter className="absolute top-0 size-32 text-danger/10 -end-10" />
            <div className="btn btn-icon bg-danger size-12">
              <LuCog className="size-6 text-white" />
            </div>
            <h5 className="mt-5 mb-2 text-lg font-semibold">
              <span data-target="15876">103.15k</span>
            </h5>
            <p className="text-sm text-default-700">Sessions</p>
          </div>
        </div>

        <div className="card bg-secondary/15 overflow-hidden">
          <div className="card-body">
            <LuListFilter className="absolute top-0 size-32 text-secondary/10 -end-10" />
            <div className="btn btn-icon bg-secondary size-12">
              <LuCoins className="size-6 text-sky-50" />
            </div>
            <h5 className="mt-5 mb-2 text-lg font-semibold">
              <span className="counter-value" data-target="1">
                0
              </span>
              <span>M</span>{' '}
              <span className="counter-value" data-target="29">
                0
              </span>
              sec
            </h5>
            <p className="text-sm text-default-700">Avg. Visit Duration</p>
          </div>
        </div>

        <div className="card bg-info/15 overflow-hidden">
          <div className="card-body">
            <LuKanban className="absolute top-0 size-32 text-info/10 -end-10" />
            <div className="btn btn-icon bg-info size-12">
              <LuCoins className="size-6 text-purple-50" />
            </div>
            <h5 className="mt-5 mb-2  text-lg font-semibold">
              <span className="counter-value" data-target="49.77">
                49.77
              </span>
              %
            </h5>
            <p className="text-sm text-default-700">Bounce Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
