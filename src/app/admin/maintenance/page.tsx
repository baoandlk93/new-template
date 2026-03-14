'use client';
import { fetchMaintenances, fetchMaintenance } from '@/server/api';
import { Button, Flex, Modal, Table, TableColumnsType, TableProps } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { IMaintenance, EStatusMaintenance } from '@/server/entity';
import MaintainanceForm from '@/components/form/MaintenanceForm';
import { format } from 'date-fns';
import { getStatus, getStatusMaintenance } from '@/utils/common';
import { toast } from 'react-toastify';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
export default function MaintainancePage() {
  const columns: TableColumnsType<IMaintenance> = [
    {
      title: 'Mã TTB',
      dataIndex: 'equipmentCode',
      key: 'equipmentCode',
    },
    {
      title: 'Ngày yêu cầu sửa chữa',
      dataIndex: 'requestingDate',
      key: 'requestingDate',
      render: (text, record) => (
        <span>
          {record.requestingDate ? format(new Date(record.requestingDate), 'HH:mm dd/MM/yyyy') : ''}
        </span>
      ),
    },
    {
      title: 'Ngày sửa chữa',
      dataIndex: 'repairingDate',
      key: 'repairingDate',
      render: (text, record) =>
        record.repairingDate
          ? format(new Date(record.repairingDate), 'HH:mm dd/MM/yyyy')
          : 'Chưa có',
    },

    {
      title: 'Trạng thái sửa chữa',
      dataIndex: 'repairStatus',
      key: 'repairStatus',
      render: (status: EStatusMaintenance) => {
        const { label, color } = getStatusMaintenance(status);
        return (
          <span
            style={{
              display: 'inline-block',
              padding: '2px 4px', // Khoảng cách bên trong
              borderRadius: '4px',
              backgroundColor: color,
              color: 'white', // Màu chữ
              fontWeight: 'bold', // Làm cho chữ đậm
              textAlign: 'center',
              cursor: 'default', // Không cho phép nhấp chuột
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Đổ bóng
            }}
          >
            {label}
          </span>
        );
      },
    },
    {
      title: 'Người yêu cầu sửa chữa',
      dataIndex: 'username',
      key: 'username',
    },
  ];

  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<IMaintenance[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [maintenance, setMaintenance] = useState<IMaintenance | null>(null);
  const fetchData = () => {
    setLoading(true);
    fetchMaintenances('')
      .then((res: any) => {
        setDataSource(res.data);
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    fetchMaintenance(id).then(res => {
      console.log(res.data);
      if (res.data) {
        if (res.data.repairStatus === EStatusMaintenance.COMPLETED) {
          toast.error('Sửa chữa đã hoàn thành vui lòng tạo yêu cầu mới!');
        } else {
          setMaintenance(res.data);
          setOpen(true);
        }
      }
    });
  };

  const handleSubmit = async (value: IMaintenance) => {
    fetchData();
    setOpen(false);
  };

  const rowSelection: TableRowSelection<IMaintenance> = {
    selectedRowKeys: selectedRowKeys.length > 0 ? [selectedRowKeys[0]] : [], // Chỉ lấy cái đầu tiên
    onChange: newSelectedRowKeys => {
      // Thiết lập lại selectedRowKeys với một giá trị.
      setSelectedRowKeys(newSelectedRowKeys);
    },
    type: 'radio', // Đặt loại là 'radio'
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="outline-2 outline-offset-2 outline-blue-100 rounded-sm shadow-md">
          <Flex gap="middle" vertical>
            <div className="flex gap-2 items-center mx-2 pl-2 pt-2">
              <Button loading={loading} type="primary" onClick={fetchData}>
                Làm mới dữ liệu
              </Button>
            </div>
            <div className="flex gap-2 items-center mx-2 pl-2">
              <Button
                className="mr-2"
                onClick={() => handleEdit(Number(selectedRowKeys[0]))}
                icon={<FaEdit />}
                color="orange"
                variant="solid"
                disabled={!hasSelected}
                loading={loading}
              >
                Cập nhật trạng thái
              </Button>
            </div>
          </Flex>
          <Table<IMaintenance>
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
                  const newSelectedRowKeys = selectedRowKeys.includes(record.id)
                    ? selectedRowKeys.filter(key => key !== record.id)
                    : [record.id];
                  onSelectChange(newSelectedRowKeys);
                },
              };
            }}
          />
        </div>
      </div>
      <Modal
        open={openDelete}
        footer={null}
        closeIcon={false}
        centered
        width={600}
        onCancel={() => setOpenDelete(false)}
      >
        <div>Bạn có chắc chắn muốn xóa sửa chữa này?</div>
      </Modal>

      <Modal
        open={open}
        footer={null}
        closeIcon={false}
        centered
        width={600}
        onCancel={() => setOpen(false)}
      >
        <MaintainanceForm
          initialData={maintenance}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
