"use client";
import { IRole, IWarehouse } from "@/server/entity";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  TableColumnsType,
} from "antd";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  addWarehouse,
  fetchWarehouse,
  fetchWarehouses,
  removeWarehouse,
} from "@/server/api";
import { TableRowSelection } from "antd/es/table/interface";

export default function Warehouses() {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<IWarehouse[]>([]);
  const [editingWarehouse, setEditingWarehouse] = useState<IWarehouse | null>(
    null,
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpenDelete(newOpen);
      return;
    }
    setOpenDelete(true);
    setIdDelete(Number(selectedRowKeys[0]));
  };
  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection: TableRowSelection<IWarehouse> = {
    selectedRowKeys: selectedRowKeys.length > 0 ? [selectedRowKeys[0]] : [], // Chỉ lấy cái đầu tiên
    onChange: (newSelectedRowKeys) => {
      // Thiết lập lại selectedRowKeys với một giá trị.
      setSelectedRowKeys(newSelectedRowKeys);
    },
    type: "radio", // Đặt loại là 'radio'
  };
  const [form] = Form.useForm();
  const handleAdd = () => {
    setOpen(true);
  };

  const handleEdit = (id: number) => {
    setLoading(true);
    fetchWarehouse(id).then((res) => {
      setEditingWarehouse(res);
      setOpen(true);
    });
    setLoading(false);
  };
  const fetchData = () => {
    fetchWarehouses().then((res) => setDataSource(res));
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (editingWarehouse) {
      form.setFieldsValue(editingWarehouse);
    } else {
      form.resetFields();
    }
  }, [editingWarehouse]);
  const columns: TableColumnsType<IWarehouse> = [
    {
      title: "STT",
      width: 100,
      dataIndex: "index",
      fixed: "left",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Tên Kho",
      width: 100,
      dataIndex: "name",
      fixed: "left",
      key: "name",
    },
    {
      title: "Mô tả",
      width: 100,
      dataIndex: "description",
      fixed: "left",
      key: "description",
    },
  ];

  const handleFinish = async (value: IWarehouse) => {
    try {
      const method = editingWarehouse ? "PUT" : "POST";
      const response = addWarehouse(method, value);
      // Xử lý lỗi phía server trả về
      if (!response) {
        throw new Error("Có lỗi xảy ra trên server!");
      }

      console.log(response);
      toast.success(
        editingWarehouse
          ? "Cập nhật kho thành công!"
          : "Thêm kho mới thành công!",
      );
      form.resetFields();
      setOpen(false);
      fetchData();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Lỗi khi thêm/cập nhật kho!");
    }
  };
  const handleOkDelete = () => {
    setLoading(true);
    removeWarehouse(idDelete).then(() => {
      setOpenDelete(false);
      setLoading(false);
      fetchData();
    });
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="outline-2 outline-offset-2 outline-blue-100 rounded-sm shadow-md">
          <div className="flex flex-col gap-4 p-4">
            <h1>Quản lý Kho</h1>
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
                title="Xóa Khoa/Phòng này"
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
                {hasSelected ? `Đang chọn ${selectedRowKeys.length} Kho` : ""}
              </div>
            </div>
            <Table<IWarehouse>
              rowSelection={rowSelection}
              pagination={{ pageSize: 10 }}
              size="small"
              bordered
              sticky
              tableLayout="fixed"
              rowKey="id"
              scroll={{ x: "max-content", y: 55 * 10 }}
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
        onCancel={() => setOpen(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          style={{ maxWidth: 400, margin: "0 auto" }}
        >
          <Form.Item label="Mã" hidden name="id">
            <Input hidden />
          </Form.Item>
          <Form.Item
            label="Tên kho"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên kho!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Nhập mô tả" }]}
          >
            <Input placeholder="Ví dụ: Kho Nhà thuốc" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu kho
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
