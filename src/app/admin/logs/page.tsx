"use client";
import React, { useEffect, useState } from "react";
import { getAllLogs } from "@/server/api";
import { IActivityLog } from "@/server/entity";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Button, Table, Input, DatePicker, Select, Space } from "antd";
import type { TableColumnsType } from "antd";

const { RangePicker } = DatePicker;

const Logs = () => {
  const columns: TableColumnsType<IActivityLog> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "index",
      fixed: "left",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Tên log",
      width: 150,
      dataIndex: "name",
      fixed: "left",
      key: "name",
    },
    {
      title: "Địa chỉ IP",
      width: 100,
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Username",
      width: 100,
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phương thức",
      width: 100,
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Tin nhắn",
      width: 100,
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Loại hành động",
      width: 100,
      dataIndex: "actionType",
      key: "actionType",
    },
    {
      title: "Loại Log",
      width: 100,
      dataIndex: "loggingType",
      key: "loggingType",
    },
    {
      title: "Thời gian Log",
      width: 100,
      dataIndex: "timeAction",
      render: (record) => (
        <span>{format(new Date(record), "HH:mm dd/MM/yyyy")}</span>
      ),
      key: "timeAction",
    },
  ];
  const logingTypes = [
    {
      value: "SUCCESS",
      label: "SUCCESS",
    },
    {
      value: "ERROR",
      label: "ERROR",
    },
    {
      value: "START",
      label: "START",
    },
    {
      value: "END",
      label: "END",
    },
  ];
  const actionTypes = [
    {
      value: "LOGIN",
      label: "LOGIN",
    },
    {
      value: "LOGOUT",
      label: "LOGOUT",
    },
    {
      value: "CREATE",
      label: "CREATE",
    },
    {
      value: "READ",
      label: "READ",
    },
    {
      value: "UPDATE",
      label: "UPDATE",
    },
    {
      value: "DELETE",
      label: "DELETE",
    },
  ];
  const [logs, setLogs] = useState<IActivityLog[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [username, setUsername] = useState("");
  const [method, setMethod] = useState("");
  const [loggingType, setLoggingType] = useState("");
  const [actionType, setActionType] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const fetchData = () => {
    setLoading(true);
    getAllLogs(
      name,
      ipAddress,
      username,
      method,
      loggingType,
      actionType,
      startDate as Date,
      endDate as Date
    )
      .then((res) => {
        if (res.status === 200) {
          setLogs(res.data);
        } else {
          toast.error("Có lỗi xảy ra, vui lòng liên hệ quản trị viên !");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!logs) {
      fetchData();
    }
  }, []);

  const handleDateChange = (dates: any) => {
    if (dates) {
      setStartDate(dates[0]?.toDate());
      setEndDate(dates[1]?.toDate());
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };
  const handleChangeLoggingType = (value: string) => {
    setLoggingType(value);
  };
  const handleChangeActionType = (value: string) => {
    setActionType(value);
  };

  return (
    <>
      <div className="flex flex-col p-2">
        <div className="flex gap-2 p-2 ">
          <Button
            type="primary"
            onClick={() => {
              setName("");
              setIpAddress("");
              setUsername("");
              setMethod("");
              setLoggingType("");
              setActionType("");
              setStartDate(null);
              setEndDate(null);
              fetchData(); // Reset logs to refetch data
            }}
          >
            Làm mới
          </Button>
        </div>
        <div className="flex gap-2 p-2 ">
          <Input
            placeholder="Tên log"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Địa chỉ IP"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Phương thức"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>
        <div className="flex gap-2 p-2 ">
          <Select
            prefix="Loại Log"
            defaultValue="SUCCESS"
            placeholder="Chọn loại Log"
            style={{ width: 200 }}
            onChange={handleChangeLoggingType}
            options={logingTypes}
            allowClear
            showSearch
          />
          <Select
            prefix="Loại hành động"
            defaultValue="READ"
            placeholder="Chọn loại hành động"
            style={{ width: 200 }}
            onChange={handleChangeActionType}
            options={actionTypes}
            allowClear
            showSearch
          />
          <RangePicker onChange={handleDateChange} format="YYYY-MM-DD" />
          <Button
            color="cyan"
            variant="solid"
            loading={loading}
            type="primary"
            onClick={() => fetchData()}
          >
            Tìm kiếm
          </Button>
        </div>
        <Table<IActivityLog>
          pagination={{ pageSize: 50 }}
          size="small"
          bordered
          sticky
          tableLayout="fixed"
          rowKey="id"
          scroll={{ x: "max-content", y: 55 * 10 }}
          columns={columns}
          dataSource={logs ?? []}
        />
      </div>
    </>
  );
};

export default Logs;
