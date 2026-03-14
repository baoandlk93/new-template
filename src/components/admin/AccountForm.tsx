"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { IRole, IUser } from "@/server/entity";
import { fetchRoles, addUser } from "@/server/api";
import { toast } from "react-toastify";
const { Option } = Select;

const AccountForm = ({
  data,
  setOpen,
  onClose,
}: {
  data: IUser | null;
  setOpen: (open: boolean) => void;
  onClose: () => void;
}) => {
  const [user, setUser] = useState({
    id: data?.id || 0,
    username: data?.username || "",
    password: data?.password || "",
    avatar: data?.avatar || "",
    fullName: data?.fullName || "",
    address: data?.address || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "",
    roles: data?.roles || [],
  });
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchRoles();
      if (response.status === 200) {
        setRoles(response.data.content);
      } else {
        toast.error("Lấy danh sách vai trò thất bại!");
      }
    } catch (e) {
      toast.error("Lấy danh sách vai trò thất bại!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
      setUser({
        id: data?.id || 0,
        username: data?.username || "",
        password: data?.password || "",
        avatar: data?.avatar || "",
        fullName: data?.fullName || "",
        address: data?.address || "",
        email: data?.email || "",
        phoneNumber: data?.phoneNumber || "",
        roles: data?.roles || [],
      });
    } else resetUser();
  }, [data]);
  const handleChange = (name: string, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await addUser(data ? "PUT" : "POST", user);
      if (response.status === "OK") {
        toast.success(
          data
            ? "Cập nhật người dùng thành công!"
            : "Thêm người dùng thành công!",
        );
      } else {
        toast.error(
          data ? "Cập nhật người dùng thất bại!" : "Thêm người dùng thất bại!",
        );
      }
    } catch (e) {
      toast.error(
        data ? "Cập nhật người dùng thất bại!" : "Thêm người dùng thất bại!",
      );
    } finally {
      setLoading(false);
      setOpen(false);
      resetUser();
    }
  };
  const handleClose = () => {
    resetUser();
    onClose();
  };
  const resetUser = () => {
    setUser({
      id: 0,
      username: "",
      password: "",
      avatar: "",
      fullName: "",
      address: "",
      email: "",
      phoneNumber: "",
      roles: [],
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Thêm Người Dùng</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên Đăng Nhập"
          rules={[{ required: true, message: "Vui lòng nhập Tên Đăng Nhập!" }]}
          required
        >
          <Input
            value={user.username}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="Nhập tên đăng nhập"
          />
        </Form.Item>
        <Form.Item
          label="Mật Khẩu"
          rules={[{ required: true, message: "Vui lòng nhập Mật Khẩu!" }]}
          required
        >
          <Input.Password
            disabled={data !== null}
            value={user.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
          required
        >
          <Input
            type="email"
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Nhập email"
          />
        </Form.Item>
        <Form.Item label="Họ và Tên">
          <Input
            value={user.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Nhập họ và tên"
          />
        </Form.Item>
        <Form.Item label="Số Điện Thoại">
          <Input
            value={user.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        </Form.Item>
        <Form.Item label="Địa Chỉ">
          <Input
            value={user.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Nhập địa chỉ"
          />
        </Form.Item>
        <Form.Item label="Avatar URL">
          <Input
            value={user.avatar}
            onChange={(e) => handleChange("avatar", e.target.value)}
            placeholder="Nhập URL hình đại diện"
          />
        </Form.Item>
        <Form.Item label="Quyền" required>
          <Select
            mode="multiple"
            loading={loading} // Hiện spinner khi đang tải
            onChange={(value) => handleChange("roles", value)}
            placeholder="Chọn quyền"
          >
            {roles?.map((role) => (
              <Option key={role.id} value={role.id}>
                {role.description}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            {data ? "Thêm người dùng " : "Cập nhật"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountForm;
