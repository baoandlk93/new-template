'use client';
import { IPatientCOPD } from '@/server/entity';
import {
  Button,
  DatePicker,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
  TableColumnsType,
  Upload,
} from 'antd';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaDeleteLeft, FaUpload } from 'react-icons/fa6';
import { Form, AutoComplete } from 'antd';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import {
  fetchCopdPatient,
  fetchCopdPatients,
  removeCopdPatients,
  addCopdPatients,
  countPatientOfYear,
  importCopdPatients,
  searchCopdPatients,
} from '@/server/api';
import { TableRowSelection } from 'antd/es/table/interface';
import PatientCopdForm from '@/components/form/PatientCopdForm';
import dayjs from 'dayjs'; // Import dayjs
import type { GetProp, UploadFile, UploadProps, AutoCompleteProps } from 'antd';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function Copd() {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<IPatientCOPD[]>([]);
  const [patientCopd, setPatientCopd] = useState<IPatientCOPD | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [quantityPatient, setQuantityPatient] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [indexData, setIndexData] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const handleAdd = () => {
    setOpen(true);
    setPatientCopd(null);
  };

  const handleEdit = (id: number) => {
    setLoading(true);
    fetchCopdPatient(id).then(res => {
      console.log(res);
      if (res?.status === 200) {
        setPatientCopd(res?.data);
        setOpen(true);
      } else {
        toast.error('Có lỗi xảy ra vui lòng liên hệ quản trị viên !');
      }
    });
    setLoading(false);
  };

  const fetchData = async (page: number, size: number) => {
    setLoading(true);
    await fetchCopdPatients(page, size).then(res => {
      if (res?.status === 200) {
        setDataSource(res.data.content);
        setPageNumber(res.data.pageNumber + 1);
        setPageSize(res.data.pageSize);
        setTotalElements(res.data.totalElements);
        setTotalPages(res.data.totalPages);
        setIndexData(res.data.totalElements);
      } else {
        toast.error('Có lỗi khi lấy dữ liệu vui lòng thử lại !');
      }
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchData(pageNumber, pageSize);
  }, []);

  const columns: TableColumnsType<IPatientCOPD> = [
    {
      title: 'STT',
      width: 10,
      dataIndex: 'index',
      fixed: 'left',
      key: 'index',
      render: (_, record, index) => record.id,
    },
    {
      title: 'Tên Bệnh nhân',
      width: 150,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Năm',
      width: 50,
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Mã số ĐKĐT ',
      width: 50,
      dataIndex: 'profileCode',
      key: 'profileCode',
    },

    {
      title: 'Giới tính',
      width: 50,
      dataIndex: 'gender',
      key: 'gender',
      render: record => (
        <span>{record === 'male' ? 'Nam' : record === 'female' ? 'Nữ' : 'Khác'}</span>
      ),
    },
    {
      title: 'Loại Bệnh',
      width: 50,
      dataIndex: 'illness',
      key: 'illness',
      render: record => <span>{record?.toUpperCase()}</span>,
    },
    {
      title: 'Ngày/Tháng/Năm sinh',
      width: 50,
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: record => {
        if (typeof record === 'number') {
          // Nếu record là một số (năm)
          return <span>{`${record}-01-01`}</span>; // Trả về định dạng năm tháng ngày
        }

        if (record) {
          // Nếu record có giá trị, cố gắng chuyển đổi nó
          const date = new Date(record);
          return <span>{format(date, 'dd/MM/yyyy')}</span>; // Định dạng ngày
        }

        return <span>Không có dữ liệu</span>; // Nếu không có dữ liệu
      },
    },
    {
      title: 'Địa chỉ',
      width: 150,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      width: 50,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Đối tượng thanh toán',
      width: 50,
      dataIndex: 'paymentObject',
      key: 'paymentObject',
      render: record => (
        <span>{record === 'bhyt' ? 'BHYT' : record === 'cost' ? 'Thu phí' : 'Khác'}</span>
      ),
    },
    {
      title: 'Ngày bắt đầu điều trị',
      width: 50,
      dataIndex: 'startDate',
      key: 'startDate',
      render: record => <span>{format(new Date(record), 'dd/MM/yyyy')}</span>,
    },
    {
      title: 'COPD',
      width: 50,
      dataIndex: 'copdType',
      key: 'copdType',
      render: record => <span>{record?.toUpperCase()}</span>,
    },
    {
      title: 'Hạng COPD',
      width: 50,
      dataIndex: 'diseaseLevel',
      key: 'diseaseLevel',
      render: record => <span>{record?.toUpperCase()}</span>,
    },
    {
      title: 'Bậc Hen',
      width: 50,
      dataIndex: 'bronchialAsthmaLevel',
      key: 'bronchialAsthmaLevel',
      render: record => <span>{record?.toUpperCase()}</span>,
    },
    {
      title: 'Nhóm Hen',
      width: 50,
      dataIndex: 'bronchialAsthmaGroup',
      key: 'bronchialAsthmaGroup',
      render: record => <span>{record?.toUpperCase()}</span>,
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
      fetchData(pageNumber, pageSize);
    });
  };

  const handleCancel = () => {
    setOpenDelete(false);
  };

  const handleFinish = async (value: IPatientCOPD) => {
    try {
      const method = patientCopd ? 'PUT' : 'POST';
      const newValue: IPatientCOPD = {
        ...value,
        year: new Date().getFullYear().toString(),
      };
      addCopdPatients(method, newValue)
        .then(res => {
          if (res?.status === 201) {
            toast.success(
              patientCopd ? 'Cập nhật Bệnh nhân thành công!' : 'Thêm Bệnh nhân mới thành công!'
            );
            form.resetFields();
            setOpen(false);
          }
        })
        .catch(e => {
          toast.error(e);
        })
        .finally(() => {
          fetchData(pageNumber, pageSize);
        });
      //   Xử lý lỗi phía server trả về
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Lỗi khi thêm/cập nhật Bệnh nhân!');
    }
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection: TableRowSelection<IPatientCOPD> = {
    selectedRowKeys: selectedRowKeys.length > 0 ? [selectedRowKeys[0]] : [], // Chỉ lấy cái đầu tiên
    onChange: newSelectedRowKeys => {
      // Thiết lập lại selectedRowKeys với một giá trị.
      setSelectedRowKeys(newSelectedRowKeys);
    },
    type: 'radio', // Đặt loại là 'radio'
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', fileList[0] as FileType);
    setUploading(true);
    // You can use any AJAX library you like
    await importCopdPatients(formData)
      .then(res => {
        if (res.status === 200) {
          setFileList([]);
          toast.success('upload successfully.');
          fetchData(pageNumber, pageSize);
        } else {
          toast.error('upload failed.');
        }
      })
      .catch(() => {
        toast.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
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
              {'-'}
              {p.dateOfBirth}
              <span style={{ color: '#888', marginLeft: 8 }}>
                {dayjs(p.startDate).format('DD/MM/YYYY')}
              </span>
            </div>
          ),
        }))
      );
    }
  };
  return (
    <>
      <PageBreadcrumb title="Quản lý Bệnh nhân COPD" subtitle="Quản lý" />
      <div className="flex flex-col gap-4 p-4">
        <div className="outline-2 outline-offset-2 outline-blue-100 rounded-sm shadow-md">
          <div className="flex flex-col gap-4 p-4">
            <h1>Quản lý Bệnh nhân COPD</h1>
            <div className="flex gap-2 items-center mx-2">
              <Button type="primary" onClick={handleAdd}>
                Thêm mới
              </Button>
              <Button
                loading={loading}
                type="primary"
                onClick={() => {
                  fetchData(pageNumber, pageSize);
                }}
              >
                Làm mới dữ liệu
              </Button>
              <div className="flex gap-2 items-center  mx-2">
                <Button
                  type="primary"
                  onClick={handleUpload}
                  disabled={fileList.length === 0}
                  loading={uploading}
                >
                  {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
                <Upload {...props} className="flex gap-2" maxCount={1}>
                  <Button icon={<FaUpload />}>Select File</Button>
                </Upload>
              </div>
              <div className="flex gap-2 items-center  mx-2">
                <AutoComplete
                  style={{ width: 400 }}
                  options={options}
                  onSearch={handleSearch}
                  placeholder="Tìm bệnh nhân theo tên, mã hoặc ngày"
                  filterOption={false}
                  onSelect={(id: number) => handleEdit(id)}
                  allowClear={{ clearIcon: <FaDeleteLeft /> }}
                >
                  <Input />
                </AutoComplete>
              </div>
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
                {hasSelected ? `Đang chọn ${selectedRowKeys.length} Bệnh nhân` : ''}
              </div>
            </div>
            <Table<IPatientCOPD>
              rowSelection={rowSelection}
              pagination={{
                pageSize: pageSize,
                total: totalElements,
                onChange(page, pageSize) {
                  setPageSize(pageSize);
                  setPageNumber(page - 1);
                  fetchData(page - 1, pageSize);
                },
              }}
              size="large"
              bordered
              sticky
              tableLayout="fixed"
              rowKey="id"
              scroll={{ x: 'max-content', y: 50 * 10 }}
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
          setPatientCopd(null);
        }}
      >
        <PatientCopdForm
          initialData={patientCopd}
          onSubmit={handleFinish}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
