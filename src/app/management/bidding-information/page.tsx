"use client";
import { IBiddingInformation } from "@/server/entity";
import {
  Button,
  Modal,
  Popconfirm,
  Table,
  TableColumnsType,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { Form } from "antd";
import { toast } from "react-toastify";
import { format } from "date-fns";
import {
  fetchCopdPatient,
  fetchCopdPatients,
  removeCopdPatients,
  addCopdPatients,
  countPatientOfYear,
  importCopdPatients,
  searchCopdPatients,
  addBiddingInformation,
  fetchBiddingInformations,
  fetchBiddingInformation,
} from "@/server/api";
import { TableRowSelection } from "antd/es/table/interface";
import BiddingInformationForm from "@/components/form/BiddingInformationForm";
import dayjs from "dayjs"; // Import dayjs
import type { GetProp, UploadFile, UploadProps, AutoCompleteProps } from "antd";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function Copd() {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<IBiddingInformation[]>([]);
  const [biddingInfomation, setBiddingInfomation] =
    useState<IBiddingInformation | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  const handleAdd = () => {
    setOpen(true);
    setBiddingInfomation(null);
  };

  const handleEdit = (id: number) => {
    setLoading(true);
    fetchBiddingInformation(id)
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setBiddingInfomation(res.data);
        } else {
          toast.error("Có lỗi xảy ra vui lòng liên hệ quản trị viên !");
        }
        setOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchData = async () => {
    setLoading(true);
    await fetchBiddingInformations(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ).then((res) => {
      if (res?.status === 200) {
        setDataSource(res.data);
      } else {
        toast.error("Có lỗi khi lấy dữ liệu vui lòng thử lại !");
      }
    });

    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns: TableColumnsType<IBiddingInformation> = [
    {
      title: "STT",
      width: 10,
      dataIndex: "index",
      fixed: "left",
      key: "index",
      render: (_, record, index) => record.id,
    },
    {
      title: "Tên Hồ sơ",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Tiêu đề",
      width: 150,
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "Đơn vị nhận thông tin",
      width: 50,
      dataIndex: "receiver",
      key: "receiver",
    },

    {
      title: "Ngày đăng",
      width: 50,
      dataIndex: "postDate",
      key: "postDate",
      render: (record) => {
        if (typeof record === "number") {
          // Nếu record là một số (năm)
          return <span>{`${record}-01-01`}</span>; // Trả về định dạng năm tháng ngày
        }

        if (record) {
          // Nếu record có giá trị, cố gắng chuyển đổi nó
          const date = new Date(record);
          return <span>{format(date, "dd/MM/yyyy")}</span>; // Định dạng ngày
        }

        return <span>Không có dữ liệu</span>; // Nếu không có dữ liệu
      },
    },
  ];
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpenDelete(newOpen);
      return;
    }
    setOpenDelete(true);
    setIdDelete(Number(selectedRowKeys[0]));
  };
  const handleOkDelete = () => {
    setLoading(true);
    removeCopdPatients(idDelete).then(() => {
      setOpenDelete(false);
      setLoading(false);
      fetchData();
    });
  };

  const handleCancel = () => {
    setOpenDelete(false);
  };

  const handleFinish = async (value: IBiddingInformation) => {
    try {
      const method = biddingInfomation ? "PUT" : "POST";
      const newValue: IBiddingInformation = {
        ...value,
        // Tùy chỉnh dữ liệu
      };

      addBiddingInformation(method, newValue)
        .then((res) => {
          if (res?.status === 201) {
            toast.success(
              biddingInfomation
                ? "Cập nhật hồ sơ thành công!"
                : "Thêm hồ sơ mới thành công!",
            );
            form.resetFields();
            setOpen(false);
          }
        })
        .catch((e) => {
          toast.error(e);
        })
        .finally(() => {
          fetchData();
        });
      //   Xử lý lỗi phía server trả về
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Lỗi khi thêm/cập nhật Bệnh nhân!");
    }
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection: TableRowSelection<IBiddingInformation> = {
    selectedRowKeys: selectedRowKeys.length > 0 ? [selectedRowKeys[0]] : [], // Chỉ lấy cái đầu tiên
    onChange: (newSelectedRowKeys) => {
      // Thiết lập lại selectedRowKeys với một giá trị.
      setSelectedRowKeys(newSelectedRowKeys);
    },
    type: "radio", // Đặt loại là 'radio'
  };

  const handleSearch = async (value: string) => {
    if (!value || value.length < 2) {
      setOptions([]);
      return;
    }
    // Suggest API, chỉnh path API nếu cần
    const res = await searchCopdPatients(value);
    if (res?.status === 200) {
      setOptions(
        (res.data || []).map((p: any) => ({
          value: p.id, // Giá trị thực tế là id bệnh nhân
          label: (
            <div>
              <b>{p.profileCode}</b> – {p.name}
              {"-"}
              {p.dateOfBirth}
              <span style={{ color: "#888", marginLeft: 8 }}>
                {dayjs(p.startDate).format("DD/MM/YYYY")}
              </span>
            </div>
          ),
        })),
      );
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="outline-2 outline-offset-2 outline-blue-100 rounded-sm shadow-md">
          <div className="flex flex-col gap-4 p-4">
            <h1>Quản lý hồ sơ mời thầu</h1>
            <div className="flex gap-2 items-center mx-2">
              <Button type="primary" onClick={handleAdd}>
                Thêm mới
              </Button>
              <Button loading={loading} type="primary" onClick={fetchData}>
                Làm mới dữ liệu
              </Button>
            </div>
            <div className="flex gap-2 items-center mx-2">
              <Button
                className="mr-2"
                onClick={() => handleEdit(Number(selectedRowKeys[0]))}
                icon={<FaEdit />}
                color="orange"
                variant="solid"
                disabled={!hasSelected}
                loading={loading}
              >
                Sửa
              </Button>

              <Popconfirm
                title="Xóa Bệnh nhânnày"
                description="Bạn có chắc chắn muốn xóa?"
                open={openDelete}
                onConfirm={() => handleOkDelete()}
                onCancel={handleCancel}
                onOpenChange={handleOpenChange}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  danger
                  type="primary"
                  disabled={!hasSelected}
                  icon={<FaTrash />}
                  loading={loading}
                >
                  Xóa
                </Button>
              </Popconfirm>

              <div className="ml-2">
                {hasSelected ? `Đang chọn ${selectedRowKeys.length} hồ sơ` : ""}
              </div>
            </div>
            <Table<IBiddingInformation>
              rowSelection={rowSelection}
              pagination={{ pageSize: 10 }}
              size="large"
              bordered
              sticky
              tableLayout="fixed"
              rowKey="id"
              scroll={{ x: "max-content", y: 50 * 10 }}
              columns={columns}
              dataSource={dataSource}
              onRow={(record) => {
                return {
                  onClick: () => {
                    if (record.id) {
                      const newSelectedRowKeys = selectedRowKeys.includes(
                        record.id,
                      )
                        ? selectedRowKeys.filter((key) => key !== record.id)
                        : [record.id];
                      onSelectChange(newSelectedRowKeys);
                    }
                  },
                };
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        footer={null}
        closeIcon={false}
        centered
        width={600}
        onCancel={() => {
          setOpen(false);
          setBiddingInfomation(null);
        }}
      >
        <BiddingInformationForm
          initialData={biddingInfomation}
          onSubmit={handleFinish}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
