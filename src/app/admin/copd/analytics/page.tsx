'use client';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { fetchPatientCountByYear, fetchPatientCountByMonth } from '@/server/api';
import { toast } from 'react-toastify';
import Flatpickr from 'react-flatpickr';
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
    <div className="card">
      <div className="card-header flex justify-between items-center">
        <h6 className="card-title">Bệnh nhân COPD</h6>
        <div className="flex gap-2">
          <label
            htmlFor="fromInput"
            className="inline-block mb-2 text-sm text-default-800 font-medium"
          >
            Chọn thời gian
          </label>

          <Flatpickr
            options={{
              mode: 'single',
              dateFormat: 'Y', // Chỉ định định dạng là năm
            }}
            className="form-input"
            placeholder="Select Year"
            onChange={value => {
              setYear(value[0].getFullYear());
            }}
          />
        </div>
      </div>
      <div className="card-body">
        {Object.keys(patientMonthStatistics).length === 0 ? (
          <p className="text-center text-gray-600">Không có dữ liệu để hiển thị.</p>
        ) : (
          monthsChart.map(month => {
            // Kiểm tra sự tồn tại trước khi sử dụng
            const copdData = patientMonthStatistics[month]?.copd
              ? Object.keys(patientMonthStatistics[month].copd)
                  .filter(key => key !== 'total')
                  .map(label => patientMonthStatistics[month].copd[label])
              : [];
            const totalCopdData = patientMonthStatistics[month].copd['total'];
            const copdChartData = copdData.map((value, index) => ({
              label: Object.keys(patientMonthStatistics[month].copd).filter(key => key !== 'total')[
                index
              ],
              value: value,
              percentage: (value / totalCopdData) * 100,
              color: 'bg-warning',
            }));
            console.log(copdChartData, 'copdChartData');

            const henData = patientMonthStatistics[month]?.hen
              ? Object.keys(patientMonthStatistics[month].hen)
                  .filter(key => key !== 'total')
                  .map(label => patientMonthStatistics[month].hen[label])
              : [];
            const totalHenData = patientMonthStatistics[month].hen
              ? patientMonthStatistics[month].hen['total']
              : 0;
            const henChartData = henData.map((value, index) => ({
              label: Object.keys(patientMonthStatistics[month].hen).filter(key => key !== 'total')[
                index
              ],
              value: value,
              percentage: (value / totalHenData) * 100,
              color: 'bg-primary',
            }));
            return (
              <div key={month} className="flex flex-col gap-1">
                <div className="mb-4">
                  <h2 className="text-center mb-4 font-bold text-2xl ">{`COPD ${month}`}</h2>
                  <h2 className="text-center mb-4 font-bold text-2xl ">{`Tổng ${totalCopdData}`}</h2>
                  <div className="flex flex-col gap-5">
                    {copdChartData.map((item, index) => (
                      <div key={index}>
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
                <div className="mb-4">
                  <h2 className="text-center mb-4 font-bold text-2xl ">{`Hen phế quản ${month}`}</h2>
                  <h2 className="text-center mb-4 font-bold text-2xl ">{`Tổng ${totalHenData}`}</h2>
                  <div className="flex flex-col gap-5">
                    {henChartData.map((item, index) => (
                      <div key={index}>
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
          })
        )}
      </div>
    </div>
  );
};

export default Page;
