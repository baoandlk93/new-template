"use client";
import AccountForm from "@/components/admin/AccountForm";
import { fetchUsers, resetPassword } from "@/server/api";
import { IUser } from "@/server/entity";
import { Button, Modal, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { transformApiDataToUser } from "@/ultilities/common";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [passwordReset, setPasswordReset] = useState("");
  const [openReset, setOpenReset] = useState(false);
  const handleAdd = () => {
    if (editingUser !== null) {
      setEditingUser(null);
    }
    setOpen(true);
  };
  const handleResetPassword = (record: IUser) => {
    const username = record.username;
    if (typeof username === "string") {
      resetPassword(username).then((res) => {
        console.log(res, "res");
        setPasswordReset(res.data.data);
        setOpenReset(true);
        toast.success("Đặt lại mật khẩu thành công!");
      });
    } else {
      console.error("Username is undefined or not a string.");
      toast.error("Tên đăng nhập không hợp lệ, không thể đặt lại mật khẩu.");
    }
  };
  const onEdit = (record: IUser) => {
    setEditingUser(record);
    setOpen(true);
  };

  const fetchData = async () => {
    try {
      const response = await fetchUsers();
      if (response.status === 200) {
        setDataSource(transformApiDataToUser(response.data.content));
      } else {
        toast.error("An unknown error occurred");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const columns: TableColumnsType<IUser> = [
    {
      title: "Tên người dùng",
      width: 100,
      dataIndex: "fullName",
      fixed: "left",
      key: "fullName",
      render: (_, record) => record.fullName || "Không có tên",
    },
    {
      title: "Tên đăng nhập",
      width: 100,
      dataIndex: "username",
      fixed: "left",
      key: "username",
      render: (_, record) => record.username || "Không có tên đăng nhập",
    },
    {
      title: "Email",
      width: 100,
      dataIndex: "email",
      fixed: "left",
      key: "email",
      render: (_, record) => record.email || "Không có email",
    },
    {
      title: "Số điện thoại",
      width: 100,
      dataIndex: "phoneNumber",
      fixed: "left",
      key: "phoneNumber",
      render: (_, record) => record.phoneNumber || "Không có số điện thoại",
    },
    {
      title: "Địa chỉ",
      width: 100,
      dataIndex: "address",
      fixed: "left",
      key: "address",
      render: (_, record) => record.address || "Không có địa chỉ",
    },
    {
      title: "Tạo bởi",
      width: 100,
      dataIndex: "createdAt",
      fixed: "left",
      key: "createdAt",
    },
    {
      title: "Ngày cập nhật",
      width: 100,
      dataIndex: "updatedBy",
      fixed: "left",
      key: "updatedBy",
    },
    {
      title: "Vai trò",
      width: 100,
      dataIndex: "roles",
      fixed: "left",
      key: "roles",
      render: (_, record) =>
        record.roles.map((role) => role.description).join(", "),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record, index) => (
        <div className="flex gap-2">
          <Button
            disabled={record.username === "admin"}
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
            disabled={record.username === "admin"}
            className="mr-2"
            type="default"
            icon={<FaEdit />}
            onClick={() => {
              handleResetPassword(record);
            }}
          >
            Reset mật khẩu
          </Button>
          <Button
            disabled={record.username === "admin"}
            className="ml-2"
            type="primary"
            danger
            icon={<FaTrash />}
            onClick={() => {
              setOpenDelete(true);
              setModalText("Bạn có chắc chắn muốn xóa người dùng này?");
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const handleOk = () => {
    setModalText("Đang xóa vai trò");
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

  const handleCancelReset = () => {
    console.log("Clicked cancel button");
    setOpenReset(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <h1>Quản lý người dùng</h1>
        <div className="flex gap-2">
          <Button type="primary" onClick={handleAdd}>
            Thêm mới
          </Button>
          <Button type="primary" onClick={fetchData}>
            Làm mới dữ liệu
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
        onCancel={() => setOpen(false)}
      >
        <AccountForm
          data={editingUser}
          setOpen={setOpen}
          onClose={() => {
            setOpen(false);
            fetchData();
          }}
        />
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
      <Modal
        title="Đặt lại mật khẩu"
        open={openReset}
        onCancel={handleCancelReset}
      >
        <span className="font-bold">Mật khẩu mới:</span>
        <span> {passwordReset}</span>
      </Modal>
    </>
  );
}
