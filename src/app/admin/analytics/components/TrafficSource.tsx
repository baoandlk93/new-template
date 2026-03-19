import Link from 'next/link';
import React from 'react';

type TrafficItem = {
  id: number;
  label: string;
  value: string;
  percentage: number;
  color: string;
};

const trafficData: TrafficItem[] = [
  { id: 1, label: 'COPD', value: '54,963', percentage: 89, color: 'bg-primary' },
  { id: 2, label: 'HEN', value: '30,478', percentage: 55, color: 'bg-sky-500' },
];

const TrafficSource: React.FC = () => {
  return (
    <div className="card">
      <div className="card-header flex justify-between items-center">
        <h6 className="card-title">Thống kê bệnh nhân COPD - Hen phế quản</h6>
        <Link href="/admin/copd/analytics" className="text-primary underline">
          Xem chi tiết
        </Link>
      </div>

      <div className="card-body">
        <div className="flex flex-col gap-5">
          {trafficData.map(item => (
            <div key={item.id}>
              <div className="flex items-center justify-between gap-4 mb-2 text-sm">
                <h6 className="text-default-900">{item.label}</h6>
                <span className="text-default-500">{item.value}</span>
              </div>
              <div className="w-full h-3.5 rounded bg-default-200">
                <div
                  className={`h-3.5 rounded ${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficSource;
