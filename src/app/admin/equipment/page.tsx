'use client';

import React, { useEffect, useState } from 'react';
import { Button, Flex, Modal, Table, Popconfirm, QRCode, Segmented, Space } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { getStatus, getStatusName, transformApiDataToDevice } from '@/utils/common';
import {
  Device,
  IDepartment,
  Image,
  IStatus,
  IStatusOfUse,
  IWarehouse,
  FilterDevice,
  ICategory,
} from '@/server/entity';
import {
  addEquipment,
  addMaintenance,
  fetchDepartments,
  fetchEquipment,
  fetchEquipments,
  removeEquipment,
  filterEquipments,
  exportExcelEquipment,
  fetchCategoryEquipments,
  fetchWarehouses,
} from '@/server/api';
import { format } from 'date-fns';
import { FaBarcode, FaEdit, FaEye, FaFileExcel, FaTrash } from 'react-icons/fa';
import { FaScrewdriverWrench, FaShuffle, FaFilter } from 'react-icons/fa6';
import { getUserFromLocalStorage } from '@/utils/security';
import AddEquipmentForm from '@/components/admin/products/AddEquipmentForm';
import { toast } from 'react-toastify';
import TransferModal from '@/components/TransferModal';
import { IMaintenance } from '@/server/entity';
import FilterDepartment from '@/components/FilterDepartment';
import FilterCategory from '@/components/FilterCategory';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const EquipmentPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const columns: TableColumnsType<Device> = [
    {
      title: 'STT',
      width: 50,
      dataIndex: 'index',
      fixed: 'left',
      key: 'index',
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Mã TTB',
      width: 100,
      dataIndex: 'deviceCode',
      fixed: 'left',
      key: 'deviceCode',
    },
    {
      title: 'Tên tài sản',
      width: 150,
      dataIndex: 'name',
      fixed: 'left',
      key: 'name',
    },
    {
      title: 'Model, series',
      width: 100,
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Hãng,Nước SX',
      width: 100,
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Số lượng',
      width: 100,
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Nguồn Tài sản',
      width: 100,
      dataIndex: 'assetSource',
      key: 'assetSource',
    },
    {
      title: 'Năm cấp',
      width: 100,
      dataIndex: 'yearOfSupply',
      render: record => <span>{format(new Date(record), 'dd/MM/yyyy')}</span>,
      key: 'yearOfSupply',
    },
    {
      title: 'Giá tiền (VNĐ)',
      width: 100,
      dataIndex: 'price',
      key: 'price',
      render: text => {
        // Convert string to number and format as currency
        const priceValue = parseFloat(text.replace(/,/g, '').trim());
        return isNaN(priceValue)
          ? 'N/A'
          : priceValue.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            });
      },
    },
    {
      title: 'Tình trạng sử dụng tài sản',
      width: 100,
      dataIndex: 'statusOfUse',
      key: 'statusOfUse',
      render: (status: IStatusOfUse) => {
        const { label, color } = getStatus(status);
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
      title: 'Số năm sử dụng',
      width: 150,
      dataIndex: 'timeUse',
      className: 'text-center',
      key: 'timeUse',
    },
    {
      title: 'Tình trạng TTB YT',
      width: 100,
      dataIndex: 'status',
      key: 'status',
      render: (status: IStatus) => {
        const { label, color } = getStatusName(status);
        return (
          <span
            style={{
              display: 'inline-block',
              padding: '2px 4px',
              borderRadius: '4px',
              backgroundColor: color,
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              cursor: 'default',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            {label}
          </span>
        );
      },
    },
    {
      title: 'Thời gian nhập kho',
      width: 150,
      dataIndex: 'timeIn',
      key: 'timeIn',
      render: record => <span>{format(new Date(record), 'dd/MM/yyyy')}</span>,
    },
    {
      title: 'Thời gian xuất kho',
      width: 150,
      dataIndex: 'timeOut',
      key: 'timeOut',
      render: record => <span>{format(new Date(record), 'dd/MM/yyyy')}</span>,
    },
    {
      title: 'Tồn kho',
      width: 100,
      className: 'text-center',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Phân loại TTB',
      width: 100,
      render: record => (
        <span
          style={{
            backgroundColor:
              record === 'A'
                ? '#FFCDD2'
                : record === 'B'
                  ? '#FFEB3B'
                  : record === 'C'
                    ? '#C8E6C9'
                    : '#FFCDD2',
            color: '#000',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          {record}
        </span>
      ),
      className: 'text-center',
      dataIndex: 'classification',
      key: 'classification',
    },
    {
      title: 'Nhóm trang thiết bị',
      width: 100,
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Vị trí',
      width: 100,
      dataIndex: 'warehouse',
      key: 'warehouse',
    },
    {
      title: 'Khoa/Phòng',
      width: 100,
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Thời gian kiểm định',
      width: 150,
      dataIndex: 'timeCheck',
      key: 'timeCheck',
      render: (text, record) => <span>{format(new Date(record.timeCheck), 'dd/MM/yyyy')}</span>,
    },
    {
      title: 'Bảo dưỡng sửa chữa',
      width: 100,
      className: 'text-center',
      dataIndex: 'maintenance',
      key: 'maintenance',
    },
    {
      title: 'Ghi chú',
      width: 100,
      className: 'text-center',
      dataIndex: 'note',
      key: 'note',
    },
  ];
  const [openModalTransfer, setOpenModalTransfer] = useState(false);
  const [dataSource, setDataSource] = useState<Device[] | []>([]);
  const [openModalQRCode, setOpenModalQRCode] = useState<string | null>(null);
  const [editingEquipment, setEditingEquipment] = useState<Device | null>(null);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [transferEquipment, setTransferEquipment] = useState<Device | null>(null);
  const [statusFilterCategory, setStatusFilterCategory] = useState<
    '' | 'error' | 'warning' | undefined
  >('');
  const [statusFilterDepartment, setStatusFilterDepartment] = useState<
    '' | 'error' | 'warning' | undefined
  >('');
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [confirmTransferLoading, setConfirmTransferLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [openMaintenance, setOpenMaintenance] = useState(false);
  const [maintenanceEquipment, setMaintenanceEquipment] = useState<Device | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selecteCategories, setSelectedCategories] = useState<number[]>([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchEquipments(
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      );
      const devices: Device[] = transformApiDataToDevice(response);
      setDataSource(devices);
      const departmentsData = await fetchDepartments();
      const warehousesData = await fetchWarehouses();
      const categories = await fetchCategoryEquipments();
      setCategories(categories);
      setDepartments(departmentsData);
      setWarehouses(warehousesData);
    } catch (error) {
      if (error instanceof Error) {
        // toast.error(error.message);
      } else {
        // toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  // Filter
  const optionsDepartments = departments.map(department => ({
    label: department.name,
    value: department.id,
  }));
  const optionsCategories = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));
  const handleDepartmentChange = (values: number[]) => {
    setSelectedDepartments(values);
  };
  const handleCategoryChange = (values: number[]) => {
    setSelectedCategories(values);
  };
  const filter = () => {
    if (selecteCategories.length === 0 || selectedDepartments.length === 0) {
      if (selecteCategories.length === 0) setStatusFilterCategory('error');
      else {
        setStatusFilterCategory('');
      }
      if (selectedDepartments.length === 0) setStatusFilterDepartment('error');
      else {
        setStatusFilterDepartment('');
      }
      toast.error('Vui lòng chọn đầy đủ thuộc tính');
    } else {
      setStatusFilterCategory('');
      setStatusFilterDepartment('');
      const filterDevice: FilterDevice = {
        departmentIds: selectedDepartments,
        categoryIds: selecteCategories,
        warehouseIds: [],
      };
      filterEquipments(filterDevice).then(res => {
        const data: Device[] = transformApiDataToDevice(res);
        setDataSource(data);
      });
    }
    console.log(selectedDepartments);
  };
  const handleFilter = () => {
    if (openFilter) setOpenFilter(false);
    else setOpenFilter(true);
  };

  useEffect(() => {
    fetchData();
    setSelectedRowKeys([]);
  }, []);
  const handleAdd = () => {
    setEditingEquipment(null);
    setOpen(true);
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<Device> = {
    selectedRowKeys: selectedRowKeys.length > 0 ? [selectedRowKeys[0]] : [], // Chỉ lấy cái đầu tiên
    onChange: newSelectedRowKeys => {
      // Thiết lập lại selectedRowKeys với một giá trị.
      setSelectedRowKeys(newSelectedRowKeys);
    },
    type: 'radio', // Đặt loại là 'radio' hoặc 'checkbox'
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleShowQRCode = async (id: number) => {
    const user = getUserFromLocalStorage();
    const token = user?.accessToken;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/detail/${id}?token=${token}`;
    setOpenModalQRCode(url || null);
  };
  const handleEdit = async (id: number) => {
    await fetchEquipment(id).then(response => {
      setEditingEquipment(response);
    });
    setOpen(true);
  };
  const handleSubmit = async (value: Device) => {
    try {
      const method = editingEquipment ? 'PUT' : 'POST';
      const res = await addEquipment(method, value); // Sử dụng await để chờ kết quả
      if (res.status === 200 || res.status === 201) {
        // Kiểm tra cả mã 201 cho POST
        if (!editingEquipment) {
          toast.success('Thêm TTB thành công');
        } else {
          toast.success('Cập nhật TTB thành công');
        }
      } else {
        // Nếu có lỗi, thông thường thì thông tin lỗi sẽ nằm trong res.data
        for (const [field, message] of Object.entries(res.response.data)) {
          toast.error(`Field: ${field}, Message: ${message}`);
        }
      }
      await fetchData();
      setEditingEquipment(null); // Reset trạng thái sau khi thành công
      setOpen(false); // Đóng modal hoặc popup
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || 'Có lỗi xảy ra 2');
      } else {
        // Nếu không có phản hồi từ server
        toast.error('Có lỗi xảy ra 1');
      }
    }
  };
  const handleOpenTransferModal = async (id: number) => {
    const response = await fetchEquipment(id);
    setTransferEquipment(response);
    setOpenModalTransfer(true);
  };
  const handleTransfer = async (updatedEquipment: Device) => {
    setConfirmTransferLoading(true);
    if (transferEquipment) {
      try {
        const response = await addEquipment('PUT', updatedEquipment);
        if (response) {
          toast.success('Chuyển vị trí mới thành công!');
          fetchData(); // Refresh data
        } else {
          throw new Error('Có lỗi xảy ra trên server!');
        }
      } catch (e) {
        console.error('Transfer Error:', e);
        toast.error('Có lỗi xảy ra');
      } finally {
        setConfirmTransferLoading(false);
        setOpenModalTransfer(false);
      }
    } else {
      setConfirmTransferLoading(false);
    }
  };
  const handleCancelTransfer = () => {
    setTransferEquipment(null);
    setOpenModalTransfer(false);
  };
  const handleCancelDelete = () => {
    setOpenDelete(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpenDelete(newOpen);
      return;
    }
    setOpenDelete(true);
    setIdDelete(Number(selectedRowKeys[0]));
  };
  const handleOkDelete = () => {
    setConfirmLoading(true);
    removeEquipment(idDelete)
      .then(() => {
        setOpenDelete(false);
        setConfirmLoading(false);
        toast.success('Dữ liệu đã được xóa!');
        fetchData();
      })
      .catch(e => {
        toast.error(e);
      });
  };
  const handleShowImage = async (id: number) => {
    await fetchEquipment(id).then(response => {
      setSelectedImages(response.image || []);
    });
    setOpenImageModal(true);
  };
  const handleMaintenance = async (id: number) => {
    await fetchEquipment(id).then(response => {
      setMaintenanceEquipment(response);
    });
    setOpenMaintenance(true);
  };
  const handleCancelMaintenance = () => {
    setOpenMaintenance(false);
  };
  function getKeyByValue(enumObj: any, value: string): string | undefined {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
  }
  const handleOkMaintenance = async () => {
    const key = getKeyByValue(IStatusOfUse, IStatusOfUse.MAINTENANCE);
    if (key === maintenanceEquipment?.statusOfUse) {
      toast.error('TTB đã được yêu cầu sửa chữa, vui lòng chờ xử lý');
      return;
    }
    setOpenMaintenance(false);
    const maintenance = {
      requestingDate: new Date(),
      repairStatus: 'Yêu cầu sửa chữa',
      equipmentId: maintenanceEquipment?.id,
      equipmentCode: maintenanceEquipment?.deviceCode,
      repairingDate: new Date(),
      username: getUserFromLocalStorage()?.username,
    };
    const res = await addMaintenance('POST', maintenance as IMaintenance);
    if (res.status === 200 || res.status === 201) {
      toast.success('Yêu cầu sửa chữa thành công');
      fetchData();
      setOpenMaintenance(false);
      setMaintenanceEquipment(null);
    } else {
      toast.error('Yêu cầu sửa chữa thất bại');
    }
  };
  const exportExcel = async () => {
    try {
      const response = await exportExcelEquipment();

      // Kiểm tra status code để xác nhận yêu cầu thành công
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'QLTTB.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Giải phóng đối tượng URL
      } else {
        console.error('Failed to export file: ', response.statusText);
      }
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };
  function doDownload(url: string, fileName: string) {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  const downloadSvgQRCode = () => {
    const svg = document.getElementById('myqrcode')?.querySelector<SVGElement>('svg');
    const svgData = new XMLSerializer().serializeToString(svg!);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    doDownload(url, 'QRCode.svg');
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="outline-2 outline-offset-2 outline-blue-100 rounded-sm shadow-md p-2">
        <Flex gap="middle" vertical>
          <div className="flex gap-2 items-center">
            <Button type="primary" onClick={handleAdd}>
              Thêm mới
            </Button>
            <Button loading={loading} type="primary" onClick={fetchData}>
              Làm mới dữ liệu
            </Button>
            <Button
              type="primary"
              color="pink"
              variant="solid"
              onClick={() => handleFilter()}
              icon={<FaFilter />}
              loading={loading}
            >
              Bật/Tắt Lọc
            </Button>
            <Button
              loading={loading}
              color="cyan"
              variant="solid"
              icon={<FaFileExcel />}
              onClick={exportExcel}
            >
              Xuất Excel
            </Button>
          </div>
          {openFilter ? (
            <div className="full flex gap-2 items-center mx-2">
              <FilterDepartment
                options={optionsDepartments}
                onChange={handleDepartmentChange}
                status={statusFilterDepartment}
              />
              <FilterCategory
                options={optionsCategories}
                onChange={handleCategoryChange}
                status={statusFilterCategory}
              />
              <Button
                type="primary"
                color="pink"
                variant="solid"
                onClick={() => filter()}
                icon={<FaFilter />}
                loading={loading}
              >
                Lọc
              </Button>
            </div>
          ) : null}
          <div className="flex gap-2 items-center">
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

            <Button
              className="mr-2"
              color="lime"
              variant="solid"
              disabled={!hasSelected}
              icon={<FaScrewdriverWrench />}
              loading={loading}
              onClick={() => handleMaintenance(Number(selectedRowKeys[0]))}
            >
              Yêu cầu sửa chữa
            </Button>
            <Button
              color="gold"
              variant="solid"
              icon={<FaShuffle />}
              disabled={!hasSelected}
              loading={loading}
              onClick={() => handleOpenTransferModal(Number(selectedRowKeys[0]))}
            >
              Chuyển Kho
            </Button>
            <Button
              type="primary"
              onClick={() => handleShowQRCode(Number(selectedRowKeys[0]))}
              disabled={!hasSelected}
              icon={<FaBarcode />}
              loading={loading}
              variant="filled"
            >
              QR Code
            </Button>
            <Popconfirm
              title="Xóa TTB này"
              description="Bạn có chắc chắn muốn xóa?"
              open={openDelete}
              onConfirm={handleOkDelete}
              onCancel={handleCancelDelete}
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

            <Button
              type="primary"
              color="pink"
              variant="solid"
              onClick={() => handleShowImage(Number(selectedRowKeys[0]))}
              disabled={!hasSelected}
              icon={<FaEye />}
              loading={loading}
            >
              Xem ảnh
            </Button>
            <div className="ml-2">
              {hasSelected ? `Đang chọn ${selectedRowKeys.length} TTB` : ''}
            </div>
          </div>
          <div className="flex gap-2 items-center"></div>
        </Flex>
        <Table<Device>
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
      {/* Modal QR Code */}
      <Modal
        title="QUÉT MÃ ĐỂ XEM CHI TIẾT"
        open={openModalQRCode !== null}
        onCancel={() => setOpenModalQRCode(null)}
        footer={null}
      >
        <Space id="myqrcode">
          <QRCode
            type={'svg'}
            value={openModalQRCode || ''}
            bgColor="rgba(255,255,255,0.5)"
            size={256}
            style={{ marginBottom: 16 }}
            icon={`${process.env.NEXT_PUBLIC_DOMAIN}/logo-benh-vien.jpeg`}
          />
          <Button type="primary" onClick={downloadSvgQRCode}>
            Download
          </Button>
        </Space>
      </Modal>
      {/* Modal Add Equipment */}
      <Modal
        open={open}
        footer={null}
        closeIcon={false}
        centered
        width={'100%'}
        onCancel={() => setOpen(false)}
      >
        <AddEquipmentForm
          initialData={editingEquipment}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      </Modal>
      {/* Modal Transfer Equipment */}
      <TransferModal
        openModalTransfer={openModalTransfer}
        handleTransfer={handleTransfer}
        confirmTransferLoading={confirmTransferLoading}
        handleCancelTransfer={handleCancelTransfer}
        transferEquipment={transferEquipment}
        departments={departments}
        warehouses={warehouses}
      />

      {/* Modal Image */}
      <Modal
        open={openImageModal}
        width={'100%'}
        style={{ top: 0 }}
        onCancel={() => setOpenImageModal(false)}
        footer={null}
      >
        {selectedImages.length > 0 ? (
          <div className="flex gap-2 w-full h-full">
            {selectedImages.map(item => (
              <img
                key={item.id}
                src={item.url || ''}
                width={256}
                height={256}
                alt={item.name || ''}
              />
            ))}
          </div>
        ) : (
          <p key="no-images">Không có ảnh</p>
        )}
      </Modal>
      {/* Modal Maintenance */}
      <Modal
        open={openMaintenance}
        onOk={() => handleOkMaintenance()}
        confirmLoading={confirmLoading}
        onCancel={handleCancelMaintenance}
      >
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-bold text-base">Tên TTB: </span>
            <span className="text-base"> {maintenanceEquipment?.name}</span>
          </div>
          <div>
            <span className="font-bold text-base">Mã TTB: </span>
            <span className="text-base">{maintenanceEquipment?.deviceCode}</span>
          </div>
          <div>
            <span className="font-bold text-base">Model: </span>
            <span className="text-base">{maintenanceEquipment?.model}</span>
          </div>
          <div>
            <span className="font-bold text-base">Khoa/Phòng: </span>
            <span className="text-base">{maintenanceEquipment?.department}</span>
          </div>
          <span className="font-bold text-base text-center">
            Bạn có muốn yêu cầu sửa chữa không?
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default EquipmentPage;
