"use client";

import { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { IRole } from "@/server/entity";
import { addRoles } from "@/server/api";

export default function AddRoleForm({
  onSuccess,
  editingRole,
}: {
  onSuccess?: (data: IRole) => void;
  editingRole: IRole | null;
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingRole) {
      form.setFieldsValue(editingRole);
    } else {
      form.resetFields();
    }
  }, [editingRole]);

  const handleFinish = async (value: IRole) => {
    try {
      const method = editingRole ? "PUT" : "POST";
      const response = await addRoles(method, value);
      // Xử lý lỗi phía server trả về
      if (!response) {
        throw new Error("Có lỗi xảy ra trên server!");
      }
      toast.success(
        editingRole
          ? "Cập nhật vai trò thành công!"
          : "Thêm vai trò mới thành công!"
      );
      form.resetFields();
      if (onSuccess) onSuccess(response);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Lỗi khi thêm/cập nhật vai trò!");
    }
  };

  return (
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
        label="Tên vai trò"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên vai trò!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: "Nhập mô tả" }]}
      >
        <Input placeholder="Ví dụ: Vai trò quản trị" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu Vai trò
        </Button>
      </Form.Item>
    </Form>
  );
}
