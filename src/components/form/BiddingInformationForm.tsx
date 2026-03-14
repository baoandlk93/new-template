"use client";
import { IBiddingInformation } from "@/server/entity";
import { Button, DatePicker, Input, message, Upload } from "antd";
import { useEffect, useState } from "react";
import { FaInbox, FaUpload } from "react-icons/fa6";
import { Form } from "antd";
import dayjs from "dayjs"; // Import dayjs
import type { GetProp, UploadFile, UploadProps, AutoCompleteProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "@/ultilities/security";
type RcCustomRequestOptions = Parameters<
  NonNullable<UploadProps["customRequest"]>
>[0];
const { Dragger } = Upload;
const BiddingInformationForm = ({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData: IBiddingInformation | null;
  onSubmit: (data: IBiddingInformation) => Promise<void>;
  onClose: () => void;
}) => {
  const [postDate, setPostDate] = useState<dayjs.Dayjs | null>(null);
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState<File[]>();
  const [selectedFiles, setSelectedFiles] = useState<
    { id: number; url: string }[]
  >([]);
  const customRequest = async (options: RcCustomRequestOptions) => {
    const { file, onProgress, onError, onSuccess, action, data } = options;
    const url = action || `${process.env.NEXT_PUBLIC_API_URL}/api/images`;
    const formData = new FormData();
    if (data)
      Object.keys(data).forEach((k) => formData.append(k, (data as any)[k]));
    formData.append("images", file as Blob);

    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data" /*,
           Authorization: ...*/,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );
          onProgress?.({ percent }, file);
        },
      });
      onSuccess?.(res.data, file);
    } catch (err) {
      onError?.(err as Error);
    }
  };
  const props: UploadProps = {
    name: "file",
    customRequest,
    onChange(info) {
      const { status, response } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        const uploaded = response?.content;
        if (uploaded) {
          const arr = Array.isArray(uploaded) ? uploaded : [uploaded];
          setSelectedFiles((prev) => [
            ...(prev || []),
            ...arr.map((u: any) => ({ id: u.id, url: u.url })),
          ]);
        }
        setSelectedImages(response.content);
        toast.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        toast.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const formattedData: IBiddingInformation = {
      ...data,
      files: selectedImages,
    };
    console.log(formattedData, "formattedData");

    await onSubmit(formattedData);
  };
  useEffect(() => {
    if (initialData) {
      let postDate = null;
      // Kiểm tra nếu dateOfBirth là một năm hoặc ngày hợp lệ
      if (
        initialData.postDate &&
        (typeof initialData.postDate === "number" ||
          (typeof initialData.postDate === "string" &&
            !isNaN(Date.parse(initialData.postDate))))
      ) {
        // Nếu là năm (số), chuyển đổi thành ngày đầu năm
        if (typeof initialData.postDate === "number") {
          postDate = dayjs(`${initialData.postDate}-01-01`);
        } else {
          // Nếu là ngày, sử dụng dayjs để chuyển đổi
          postDate = dayjs(initialData.postDate);
        }
      } else if (initialData.postDate instanceof Date) {
        // Nếu dateOfBirth là một đối tượng Date, chuyển đổi bằng dayjs
        postDate = dayjs(initialData.postDate);
      }

      // Kiểm tra tính hợp lệ của birthDate
      if (!postDate || !postDate.isValid()) {
        postDate = null; // Đặt giá trị null nếu không hợp lệ
      }

      // Cập nhật giá trị vào form nếu hợp lệ
      form.setFieldsValue({
        ...initialData,
        postDate: postDate,
      });
      if (initialData.files && Array.isArray(initialData.files)) {
        // giả sử files là [{id, url}, ...] hoặc mảng id -> điều chỉnh
        setSelectedFiles(initialData.files as any);
      } else {
        setSelectedFiles([]);
      }
    } else {
      form.resetFields();
    }
  }, [initialData, form]);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Mã" hidden name="id">
          <Input hidden />
        </Form.Item>
        <Form.Item
          label="Tên thông tin thầu"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên thông tin thầu!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày đăng"
          name="postDate"
          rules={[{ required: true, message: "Vui lòng chọn Ngày sinh!" }]}
        >
          <DatePicker
            format={dateFormatList}
            value={postDate || null}
            onChange={(date, dateString) => {
              setPostDate(date);
              form.setFieldValue("postDate", date);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Người nhận"
          name="receiver"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="flex gap-2 items-center p-6">
            {selectedFiles && selectedFiles.length == 0 ? (
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Kéo thả file hoặc bấm chuột vào ô này để upload file
                </p>
              </Dragger>
            ) : (
              ""
            )}
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu hồ sơ
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default BiddingInformationForm;
