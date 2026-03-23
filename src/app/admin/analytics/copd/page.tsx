'use client';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { fetchPatientCountByYear, fetchPatientCountByMonth } from '@/server/api';
import { toast } from 'react-toastify';
import Flatpickr from 'react-flatpickr';
import { DatePicker } from 'antd';
type TrafficItem = {
  id: number;
  label: string;
  value: string;
  percentage: number;
  color: string;
};

type PatientStatistics = {
  [month: number]: {
    copd: number;
    hen: number;
  };
};
type DiseaseCategoryStats = {
  [category: string]: number;
};

type PatientMonthlyStatistics = {
  [month: string]: {
    copd: DiseaseCategoryStats;
    hen: DiseaseCategoryStats;
  };
};
const Page: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const months: string[] = Array.from({ length: 12 }, (_, i) => {
    return new Date(currentYear, i, 1).toLocaleString('vi-VN', {
      month: 'long',
    });
  });
  const [loading, setLoading] = useState(false);
  const [patientYearStatistics, setPatientYearStatistics] = useState<PatientStatistics>({});
  const [patientMonthStatistics, setPatientMonthStatistics] = useState<PatientMonthlyStatistics>(
    {}
  );
  const [year, setYear] = useState<number>(currentYear);

  const fetchData = async () => {
    setLoading(true);
    await fetchPatientCountByYear(year).then(res => {
      if (res?.status === 200) {
        setPatientYearStatistics(res.data as PatientStatistics);
      } else {
        toast.error('Có lỗi khi lấy dữ liệu vui lòng thử lại !');
      }
    });

    await fetchPatientCountByMonth(year)
      .then(res => {
        if (res?.status === 200) {
          setPatientMonthStatistics(res.data as PatientMonthlyStatistics);
        } else {
          toast.error('Có lỗi khi lấy dữ liệu vui lòng thử lại !');
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // Tính toán dữ liệu cho từng loại bệnh
  };
  useEffect(() => {
    fetchData();
  }, [year]);
  const trafficData: TrafficItem[] = [
    { id: 1, label: 'ii-3', value: '5', percentage: 60, color: 'bg-primary' },
    { id: 2, label: 'Meta', value: '30,478', percentage: 55, color: 'bg-sky-500' },
    { id: 3, label: 'Social Media', value: '54,963', percentage: 81, color: 'bg-warning' },
    { id: 4, label: 'Direct Message', value: '54,963', percentage: 63, color: 'bg-success' },
    { id: 5, label: 'Others', value: '54,963', percentage: 25, color: 'bg-default-600' },
  ];
  const monthsChart = Object.keys(patientMonthStatistics);

  return (
    <div className="p-4">
      <div className="card bg-white shadow-md rounded-lg overflow-hidden">
        <div className="card-header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 border-b">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Thống kê bệnh nhân Hen - COPD
            </h3>
            <p className="text-sm text-gray-500">Năm {year}</p>
          </div>
          ini
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600 hidden sm:inline">Chọn năm</label>
            <DatePicker
              onChange={value => {
                setYear(value?.year() || new Date().getFullYear());
              }}
              picker="year"
              className="rounded-md"
            />
          </div>
        </div>

        <div className="card-body p-4">
          {loading ? (
            <div className="flex flex-col gap-3">
              <div className="animate-pulse bg-gray-100 h-6 rounded w-1/4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded border">
                    <div className="animate-pulse h-5 bg-gray-100 rounded w-1/3 mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded" />
                      <div className="h-3 bg-gray-100 rounded w-5/6" />
                      <div className="h-3 bg-gray-100 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : Object.keys(patientMonthStatistics).length === 0 ? (
            <p className="text-center text-gray-600 py-8">Không có dữ liệu để hiển thị.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monthsChart.map(month => {
                const monthData = patientMonthStatistics[month] || { copd: {}, hen: {} };

                // COPD
                const copdCategories = monthData.copd
                  ? Object.keys(monthData.copd).filter(k => k !== 'total')
                  : [];
                const copdValues = copdCategories.map(c => monthData.copd[c] || 0);
                const totalCopd =
                  monthData.copd && monthData.copd['total'] ? monthData.copd['total'] : 0;

                // Hen
                const henCategories = monthData.hen
                  ? Object.keys(monthData.hen).filter(k => k !== 'total')
                  : [];
                const henValues = henCategories.map(c => monthData.hen[c] || 0);
                const totalHen =
                  monthData.hen && monthData.hen['total'] ? monthData.hen['total'] : 0;

                const renderProgress = (
                  name: string,
                  value: number,
                  total: number,
                  colorClass = 'bg-amber-400'
                ) => {
                  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
                  return (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-700">
                        <div className="truncate pr-2">{name}</div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium">{value}</span>
                          <span className="text-xs text-gray-400">({percent}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-3 rounded bg-gray-200 overflow-hidden">
                        <div
                          className={`${colorClass} h-full rounded transition-all duration-500`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                };

                const copdChartData = copdCategories.map((label, idx) => ({
                  label,
                  value: copdValues[idx] ?? 0,
                }));
                const henChartData = henCategories.map((label, idx) => ({
                  label,
                  value: henValues[idx] ?? 0,
                }));

                return (
                  <div key={month} className="p-4 bg-white rounded border shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 capitalize">{month}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">
                          COPD: <span className="font-medium text-gray-700">{totalCopd}</span> —
                          Hen: <span className="font-medium text-gray-700">{totalHen}</span>
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {/* you can put an icon or small info */}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium text-gray-700">COPD</h5>
                          <span className="text-xs text-gray-500">{totalCopd} ca</span>
                        </div>
                        <div className="space-y-3">
                          {copdChartData.length === 0 ? (
                            <p className="text-sm text-gray-500">
                              Không có dữ liệu COPD cho tháng này.
                            </p>
                          ) : (
                            copdChartData.map((item, idx) => (
                              <div key={idx}>
                                {renderProgress(
                                  item.label,
                                  item.value || 0,
                                  totalCopd,
                                  'bg-amber-400'
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium text-gray-700">Hen phế quản</h5>
                          <span className="text-xs text-gray-500">{totalHen} ca</span>
                        </div>
                        <div className="space-y-3">
                          {henChartData.length === 0 ? (
                            <p className="text-sm text-gray-500">
                              Không có dữ liệu Hen cho tháng này.
                            </p>
                          ) : (
                            henChartData.map((item, idx) => (
                              <div key={idx}>
                                {renderProgress(
                                  item.label,
                                  item.value || 0,
                                  totalHen,
                                  'bg-sky-500'
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
