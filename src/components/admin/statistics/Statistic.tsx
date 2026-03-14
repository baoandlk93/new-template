"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
);
import { fetchStatitics, requestStatitic } from "@/server/api";
import { Button, Statistic as AntStatistic } from "antd";
import { IStatitics } from "@/server/entity";
import { IoAnalyticsSharp, IoRefresh } from "react-icons/io5";
import { format } from "date-fns";
import { toast } from "react-toastify";
export default function Statistic() {
  const [statistic, setStatistic] = useState<IStatitics | null>(null);
  const fetchData = () => {
    fetchStatitics().then((res) => {
      setStatistic(res.data[res.data.length - 1]);
    });
  };
  const handleRequestStatitic = () => {
    requestStatitic().then((res) => {
      if (res.data === "CREATED") {
        toast.success("Thống kê thành công!");
        fetchData();
      }
    });
  };

  useEffect(() => {
    if (!statistic) {
      fetchData();
    }
  }, [statistic]);

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="solid"
            icon={<IoRefresh />}
            onClick={() => fetchData()}
          >
            Làm mới
          </Button>
          <Button
            color="primary"
            variant="solid"
            onClick={() => handleRequestStatitic()}
            icon={<IoAnalyticsSharp />}
          >
            Thống kê
          </Button>
          <div className="flex gap-2">
            <span className="font-semibold">Thời gian thống kê:</span>
            <span className="text-gray-500">
              {statistic?.statisticsDay
                ? format(new Date(statistic.statisticsDay), "HH:mm dd/MM/yyyy")
                : "N/A"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <AntStatistic
              title="Tổng giá trị tài sản"
              value={statistic?.totalAssetValue?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <AntStatistic
              title="Tổng số lượng tài sản"
              value={statistic?.totalQuantityOfEquipment || 0}
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <AntStatistic
              title="Tổng số lượng hình ảnh"
              value={statistic?.totalQuantityOfImages || 0}
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <AntStatistic
              title="Tổng số lượng nhân viên"
              value={statistic?.totalQuantityOfEmployees || 0}
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <AntStatistic
              title="Tổng số lượng kho"
              value={statistic?.totalQuantityOfWarehouse || 0}
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <AntStatistic
              title="Tổng số lượng sửa chữa"
              value={statistic?.totalQuantityOfRepairing || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
}
