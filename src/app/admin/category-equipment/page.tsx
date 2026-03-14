"use client";
import { ICategory } from "@/server/entity";
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
  addCategoryEquipment,
  fetchCategoryEquipments,
  fetchCategoryEquipment,
  removeCategoryEquipment,
} from "@/server/api";
import { TableRowSelection } from "antd/es/table/interface";

export default function CategoryEquipment() {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<ICategory[]>([]);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [idDelete, setIdDelete] = useState(0);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpenDelete(newOpen);
      return;
    }
    setOpenDelete(true);
    setIdDelete(Number(selectedRowKeys[0]));
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection: TableRowSelection<ICategory> = {
    selectedRowKeys: selectedRowKeys.length > 0 ? [selectedRowKeys[0]] : [], // Chỉ lấy cái đầu tiên
    onChange: (newSelectedRowKeys) => {
      // Thiết lập lại selectedRowKeys với một giá trị.
      setSelectedRowKeys(newSelectedRowKeys);
    },
    type: "radio", // Đặt loại là 'radio'
  };
  const handleAdd = () => {
    setEditingCategory(null);
    setOpen(true);
  };

  const handleEdit = (id: number) => {
    setLoading(true);
    fetchCategoryEquipment(id).then((res) => {
      setEditingCategory(res);
      setOpen(true);
    });
    setLoading(false);
  };
  const fetchData = () => {
    fetchCategoryEquipments().then((data) => setDataSource(data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue(editingCategory);
    } else {
      form.resetFields();
    }
  }, [editingCategory]);
  const columns: TableColumnsType<ICategory> = [
    {
      title: "Tên nhóm thiết bị",
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
  const handleOkDelete = () => {
    setLoading(true);
    removeCategoryEquipment(idDelete).then(() => {
      setOpenDelete(false);
      setLoading(false);
      fetchData();
    });
  };
  const handleFinish = async (value: ICategory) => {
    try {
      const method = editingCategory ? "PUT" : "POST";
      const response = addCategoryEquipment(method, value);
      // Xử lý lỗi phía server trả về
      if (!response) {
        throw new Error("Có lỗi xảy ra trên server!");
      }
      toast.success(
        editingCategory
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

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenDelete(false);
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="outline-2 outline-offset-2 outline-blue-100 rounded-sm shadow-md">
          <div className="flex flex-col gap-4 p-4">
            <h1>Quản lý Nhóm thiết bị</h1>
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
                {hasSelected
                  ? `Đang chọn ${selectedRowKeys.length} Nhóm thiết bị`
                  : ""}
              </div>
            </div>
            <Table<ICategory>
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
            label="Tên nhóm thiết bị"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhóm thiết bị!" },
            ]}
          >
            <Input />
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
