import { useForm } from "react-hook-form";
import { IPatientCOPD } from "@/server/entity";
import { Button, DatePicker, Input, Select, Modal } from "antd";
import { useEffect, useState } from "react";
import AddressForm from "@/components/form/AddressForm";
import { Form } from "antd";
import dayjs from "dayjs"; // Import dayjs

const PatientCopdForm = ({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData: IPatientCOPD | null;
  onSubmit: (data: IPatientCOPD) => Promise<void>;
  onClose: () => void;
}) => {
  const [dateOfBirth, setDateOfBirth] = useState<dayjs.Dayjs | null>(null);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [address, setAddress] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [illness, setIllness] = useState<string | undefined>(undefined); // State để lưu illness
  const [form] = Form.useForm();

  const handleSuccess = (data: {
    address: string;
    ward: string;
    province: string;
  }) => {
    const newData = data.address + ", " + data.ward + ", " + data.province;
    setAddress(newData);
    setShowAddressForm(false);
    form.setFieldValue("address", newData);
  };

  const handleClose = () => {
    setAddress("");
    setShowAddressForm(false);
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const formattedData: IPatientCOPD = {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? dayjs(data.dateOfBirth as dayjs.Dayjs).toDate()
        : undefined,
      startDate: data.startDate
        ? dayjs(data.startDate as dayjs.Dayjs).toDate()
        : undefined,
    };
    await onSubmit(formattedData);
  };

  useEffect(() => {
    if (initialData) {
      let birthDate = null;

      if (
        initialData.dateOfBirth &&
        (typeof initialData.dateOfBirth === "number" ||
          (typeof initialData.dateOfBirth === "string" &&
            !isNaN(Date.parse(initialData.dateOfBirth))))
      ) {
        if (typeof initialData.dateOfBirth === "number") {
          birthDate = dayjs(`${initialData.dateOfBirth}-01-01`);
        } else {
          birthDate = dayjs(initialData.dateOfBirth);
        }
      } else if (initialData.dateOfBirth instanceof Date) {
        birthDate = dayjs(initialData.dateOfBirth);
      }

      if (!birthDate || !birthDate.isValid()) {
        birthDate = null;
      }

      const startingDate = dayjs(initialData.startDate);
      setAddress(initialData.address || "");
      setIllness(initialData.illness); // Gán giá trị illness từ initialData
      form.setFieldsValue({
        ...initialData,
        dateOfBirth: birthDate,
        startDate: startingDate.isValid() ? startingDate : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="flex gap-4 w-fit justify-center">
          <div className="w-1/2">
            <Form.Item label="Mã" hidden name="id">
              <Input hidden />
            </Form.Item>
            <Form.Item
              label="Tên Bệnh nhân"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên Bệnh nhân!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Select placeholder="Chọn giới tính">
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </Form.Item>
            <div className="flex justify-between gap-2">
              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Vui lòng chọn Ngày sinh!" },
                ]}
              >
                <DatePicker
                  format={dateFormatList}
                  value={dateOfBirth || null}
                  onChange={(date) => {
                    setDateOfBirth(date);
                    form.setFieldValue("dateOfBirth", date);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Ngày bắt đầu"
                name="startDate"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày bắt đầu!" },
                ]}
              >
                <DatePicker
                  format={dateFormatList}
                  value={startDate || null}
                  onChange={(date) => {
                    setStartDate(date);
                    form.setFieldValue("startDate", date);
                  }}
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Vui lòng Nhập địa chỉ!" }]}
            >
              <div className="flex gap-2">
                <Input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    form.setFieldValue("address", e.target.value);
                  }}
                />
                <Button onClick={() => setShowAddressForm(true)} type="primary">
                  Chọn địa chỉ
                </Button>
              </div>
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="w-1/2">
            <Form.Item
              label="Đối tượng thanh toán"
              name="paymentObject"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đối tượng thanh toán!",
                },
              ]}
            >
              <Select placeholder="Chọn Đối tượng thanh toán">
                <Select.Option value="bhyt">BHYT</Select.Option>
                <Select.Option value="cost">Thu phí</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Loại bệnh"
              name="illness"
              rules={[{ required: true, message: "Vui lòng chọn Loại bệnh!" }]}
            >
              <Select
                placeholder="Chọn Loại bệnh"
                onChange={(value) => {
                  setIllness(value); // Cập nhật state khi chọn Loại bệnh
                }}
              >
                <Select.Option value="copd">COPD</Select.Option>
                <Select.Option value="hen">Hen</Select.Option>
              </Select>
            </Form.Item>

            {/* Hiện thị các trường liên quan tùy theo giá trị illness */}
            {illness === "copd" && (
              <>
                <Form.Item label="Loại COPD" name="copdType">
                  <Select allowClear placeholder="Chọn Loại COPD">
                    <Select.Option value="A">A</Select.Option>
                    <Select.Option value="B">B</Select.Option>
                    <Select.Option value="C">C</Select.Option>
                    <Select.Option value="D">D</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Mức độ bệnh" name="diseaseLevel">
                  <Select allowClear placeholder="Chọn Đối Mức độ bệnh">
                    <Select.Option value="I">I</Select.Option>
                    <Select.Option value="II">II</Select.Option>
                    <Select.Option value="III">III</Select.Option>
                    <Select.Option value="IV">IV</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {illness === "hen" && (
              <>
                <Form.Item
                  label="Mức độ hen phế quản"
                  name="bronchialAsthmaLevel"
                >
                  <Select allowClear placeholder="Chọn Đối tượng thanh toán">
                    <Select.Option value="Bậc 1">Bậc 1</Select.Option>
                    <Select.Option value="Bậc 2">Bậc 2</Select.Option>
                    <Select.Option value="Bậc 3">Bậc 3</Select.Option>
                    <Select.Option value="Bậc 4">Bậc 4</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Nhóm hen phế quản"
                  name="bronchialAsthmaGroup"
                >
                  <Select allowClear placeholder="Chọn Đối tượng thanh toán">
                    <Select.Option value="Chưa kiểm soát">
                      Chưa kiểm soát
                    </Select.Option>
                    <Select.Option value="Kiểm soát một phần">
                      Kiểm soát một phần
                    </Select.Option>
                    <Select.Option value="Kiểm soát hoàn toàn">
                      Kiểm soát hoàn toàn
                    </Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}
          </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu Bệnh nhân
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Thêm địa chỉ"
        open={showAddressForm}
        onCancel={() => setShowAddressForm(false)}
        footer={null}
      >
        <AddressForm onSuccess={handleSuccess} onClose={handleClose} />
      </Modal>
    </>
  );
};

export default PatientCopdForm;
