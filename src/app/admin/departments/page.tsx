'use client';
import { IDepartment } from '@/server/entity';
import { Button, Input, Modal, Popconfirm, Table, TableColumnsType } from 'antd';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Form } from 'antd';
import { toast } from 'react-toastify';
import { addDepartments, fetchDepartment, fetchDepartments, removeDepartment } from '@/server/api';
import { TableRowSelection } from 'antd/es/table/interface';

export default function Departments() {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<IDepartment[]>([]);
  const [editingDepartment, setEditingDepartment] = useState<IDepartment | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const handleAdd = () => {
    setOpen(true);
  };

  const handleEdit = (id: number) => {
    setLoading(true);
    fetchDepartment(id).then(res => {
      setEditingDepartment(res);
      setOpen(true);
    });
    setLoading(false);
  };
  const fetchData = () => {
    setLoading(true);
    fetchDepartments().then(res => setDataSource(res));
    setLoading(false);
  };
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
      title: 'STT',
      width: 50,
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Tên Khoa/Phòng',
      width: 150,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã Khoa/Phòng',
      width: 150,
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Trưởng Khoa/Phòng',
      width: 150,
      dataIndex: 'head',
      key: 'head',
    },
    {
      title: 'Số điện thoại',
      width: 150,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      width: 150,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số Nhân Viên',
      width: 150,
      dataIndex: 'employeeCount',
      key: 'employeeCount',
    },

    {
      title: 'Mô tả',
      width: 150,
      dataIndex: 'description',
      fixed: 'left',
      key: 'description',
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
    removeDepartment(idDelete).then(() => {
      setOpenDelete(false);
      setLoading(false);
      fetchData();
    });
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenDelete(false);
  };

  const handleFinish = async (value: IDepartment) => {
    try {
      const method = editingDepartment ? 'PUT' : 'POST';
      const response = addDepartments(method, value);
      // Xử lý lỗi phía server trả về
      if (!response) {
        throw new Error('Có lỗi xảy ra trên server!');
      }
      toast.success(
        editingDepartment ? 'Cập nhật Khoa/Phòng thành công!' : 'Thêm Khoa/Phòng mới thành công!'
      );
      form.resetFields();
      setOpen(false);
      fetchData();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Lỗi khi thêm/cập nhật kho!');
    }
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection: TableRowSelection<IDepartment> = {
    selectedRowKeys: selectedRowKeys.length > 0 ? [selectedRowKeys[0]] : [], // Chỉ lấy cái đầu tiên
    onChange: newSelectedRowKeys => {
      // Thiết lập lại selectedRowKeys với một giá trị.
      setSelectedRowKeys(newSelectedRowKeys);
    },
    type: 'radio', // Đặt loại là 'radio'
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="outline-2 outline-offset-2 outline-blue-100 rounded-sm shadow-md">
          <div className="flex flex-col gap-4 p-4">
            <h1>Quản lý Khoa/Phòng</h1>
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
                {hasSelected ? `Đang chọn ${selectedRowKeys.length} Khoa/Phòng` : ''}
              </div>
            </div>
            <Table<IDepartment>
              rowSelection={rowSelection}
              pagination={{ pageSize: 10 }}
              size="small"
              bordered
              sticky
              tableLayout="fixed"
              rowKey="id"
              scroll={{ x: 'max-content', y: 55 * 10 }}
              columns={columns}
              dataSource={dataSource}
              onRow={record => {
                return {
                  onClick: () => {
                    if (record.id) {
                      const newSelectedRowKeys = selectedRowKeys.includes(record.id)
                        ? selectedRowKeys.filter(key => key !== record.id)
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
          setEditingDepartment(null);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          style={{ maxWidth: 400, margin: '0 auto' }}
        >
          <Form.Item label="Mã" hidden name="id">
            <Input hidden />
          </Form.Item>
          <Form.Item
            label="Tên Khoa/Phòng"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên Khoa/Phòng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã Khoa/Phòng"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã Khoa/Phòng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trưởng Khoa/Phòng"
            name="head"
            rules={[{ required: true, message: 'Vui lòng nhập trưởng Khoa/Phòng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số Nhân Viên"
            name="employeeCount"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng nhân viên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Nhập mô tả' }]}
          >
            <Input placeholder="Ví dụ: Kho Nhà thuốc" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu khoa/Phòng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
