"use client";
import { IDepartment } from "@/server/entity";
import { Button, Input, Modal, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Form } from "antd";
import { toast } from "react-toastify";
import { addDepartments, fetchDepartments } from "@/server/api";

export default function Employee() {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<IDepartment[]>([]);
  const [editingDepartment, setEditingDepartment] =
    useState<IDepartment | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();
  const handleAdd = () => {
    setOpen(true);
  };

  const onEdit = (record: IDepartment) => {
    setOpen(true);
    setEditingDepartment(record);
  };
  const fetchData = () => {};
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (editingDepartment) {
      form.setFieldsValue(editingDepartment);
    } else {
      form.resetFields();
    }
  }, [editingDepartment]);
  const columns: TableColumnsType<IDepartment> = [
    {
      title: "STT",
      width: 100,
      dataIndex: "index",
      fixed: "left",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Tên Nhân viên",
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
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record, index) => (
        <div className="flex gap-2">
          <Button
            className="mr-2"
            type="primary"
            icon={<FaEdit />}
            onClick={() => {
              onEdit(record);
            }}
          >
            Sửa
          </Button>
          <Button
            className="ml-2"
            type="primary"
            danger
            icon={<FaTrash />}
            onClick={() => {
              setOpenDelete(true);
              setModalText("Bạn có chắc chắn muốn xóa Nhân viên này?");
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const handleOk = () => {
    setModalText("Đang xóa Nhân viên");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenDelete(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };

  const handleFinish = async (value: IDepartment) => {
    try {
      const method = editingDepartment ? "PUT" : "POST";
      const response = addDepartments(method, value);
      // Xử lý lỗi phía server trả về
      if (!response) {
        throw new Error("Có lỗi xảy ra trên server!");
      }
      toast.success(
        editingDepartment
          ? "Cập nhật Nhân viên thành công!"
          : "Thêm Nhân viên mới thành công!"
      );
      form.resetFields();
      setOpen(false);
      fetchData();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Lỗi khi thêm/cập nhật kho!");
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <h1>Quản lý Nhân viên</h1>
        <div>
          <Button type="primary" onClick={handleAdd}>
            Thêm mới
          </Button>
        </div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
      <Modal
        open={open}
        footer={null}
        closeIcon={false}
        centered
        width={600}
        onCancel={() => {
          setOpen(false);
          setEditingDepartment(null);
        }}
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
            label="Tên Nhân viên"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên Nhân viên!" },
            ]}
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
              Lưu Nhân viên
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Basic Modal"
        open={openDelete}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
