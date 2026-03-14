"use client";
import { useEffect, useState } from "react";
import {
  Device,
  ECategory,
  ICategory,
  IClassification,
  IDepartment,
  IStatus,
  IStatusOfUse,
  IWarehouse,
  Image,
} from "@/server/entity";
import {
  fetchCategoryEquipment,
  fetchCategoryEquipments,
  fetchDepartments,
  fetchWarehouse,
  fetchWarehouses,
} from "@/server/api";
import ImageUpload from "@/components/ImageUpload";
import { Modal } from "antd";
import { useForm } from "react-hook-form";

export default function AddEquipmentForm({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData: Device | null;
  onSubmit: (data: Device) => Promise<void>;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Device>();
  const [openImage, setOpenImage] = useState(false);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const setDefaultValues = () => {
    setValue("id", 0);
    setValue("deviceCode", "");
    setValue("name", "");
    setValue("price", "0");
    setValue("image", []);
    setValue("category", ECategory.CDHA);
    setValue("stock", 0);
    setValue("quantity", 0);
    setValue("assetSource", "");
    setValue("yearOfSupply", new Date());
    setValue("timeUse", 0);
    setValue("timeIn", new Date());
    setValue("timeOut", new Date());
    setValue("department", "");
    setValue("warehouse", "");
    setValue("classification", IClassification.A);
    setValue("status", IStatus.NEW);
    setValue("statusOfUse", IStatusOfUse.USING);
    setValue("model", "");
    setValue("manufacturer", "");
    setValue("note", "");
    setValue("timeCheck", new Date());
    setValue("maintenance", 0);
    setValue("wearRate", "");
  };

  const setValueEdit = () => {
    if (initialData !== null) {
      setValue("id", initialData.id);
      setValue("name", initialData.name || "");
      setValue("deviceCode", initialData.deviceCode || "");
      setValue(
        "yearOfSupply",
        initialData.yearOfSupply
          ? new Date(initialData.yearOfSupply)
          : new Date()
      );
      setValue("stock", initialData.stock || 0);
      setValue("timeUse", Number(initialData.timeUse) || 0);
      setValue(
        "timeIn",
        initialData.timeIn ? new Date(initialData.timeIn) : new Date()
      );
      setValue(
        "timeOut",
        initialData.timeOut ? new Date(initialData.timeOut) : new Date()
      );
      setValue("department", initialData.department || "");
      setValue("warehouse", initialData.warehouse || "");
      setValue(
        "classification",
        initialData.classification ?? IClassification.A
      );
      setValue("category", initialData.category ?? ECategory.CDHA);
      setValue("quantity", initialData.quantity || 0);
      setValue("assetSource", initialData.assetSource || "");
      setValue("price", initialData.price || "0");
      setValue("image", initialData.image || []);
      setValue("status", initialData.status ?? IStatus.NEW);
      setValue("statusOfUse", initialData.statusOfUse ?? IStatusOfUse.USING);
      setValue("model", initialData.model || "");
      setValue("manufacturer", initialData.manufacturer || "");
      setValue("note", initialData.note || "");
      setValue(
        "timeCheck",
        initialData.timeCheck ? new Date(initialData.timeCheck) : new Date()
      );
      setValue("maintenance", Number(initialData.maintenance) || 0);
      setValue("wearRate", initialData.wearRate || "");
    }
  };
  const timeIn = watch("timeIn") || new Date(); // Giá trị mặc định nếu timeIn là undefined
  const timeOut = watch("timeOut") || new Date();
  const timeCheck = watch("timeCheck") || new Date();
  const yearOfSupply = watch("yearOfSupply") || new Date();

  const handleDateChange =
    (field: keyof Device) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const parsedDate = parseDate(event.target.value);
      setValue(field, parsedDate);
    };

  const parseDate = (dateString: string) => {
    return new Date(dateString);
  };
  useEffect(() => {
    if (initialData !== null) setValueEdit();
    else setDefaultValues();
  }, [initialData]);

  const fetchData = async () => {
    const departmentsData = await fetchDepartments();
    const warehousesData = await fetchWarehouses();
    const categoriesData = await fetchCategoryEquipments();
    setDepartments(departmentsData);
    setWarehouses(warehousesData);
    setCategories(categoriesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = (data: Device) => {
    onSubmit(data);
  };

  const handleUploadImage = async (images: Image[]) => {
    setValue("image", images); // Cập nhật giá trị ảnh trong form
    setOpenImage(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-screen mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {initialData ? "Cập nhật thiết bị" : "Thêm thiết bị mới"}
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="flex gap-2 w-full">
          <div className="w-1/2 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mã TTB
              </label>
              <input
                {...register("deviceCode", { required: true })}
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập mã TTB..."
              />
              {errors.deviceCode && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tên TTB
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập tên TTB..."
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Model, series
              </label>
              <input
                {...register("model", { required: true })}
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập model TTB..."
              />
              {errors.model && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Hãng, Nước SX
              </label>
              <input
                {...register("manufacturer", { required: true })}
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập hãng sản xuất..."
              />
              {errors.manufacturer && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Số lượng
              </label>
              <input
                {...register("quantity", {
                  required: true,
                  valueAsNumber: true,
                })}
                type="number"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập số lượng TTB..."
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nguồn tài sản
              </label>
              <input
                {...register("assetSource", {
                  required: true,
                })}
                type="text"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập nguồn tài sản..."
              />
              {errors.assetSource && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Năm cấp
              </label>
              <input
                onChange={handleDateChange("yearOfSupply")}
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập năm cấp TTB..."
                defaultValue={yearOfSupply.toISOString().split("T")[0]} // Chuyển đổi về định dạng date
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Giá TTB (VNĐ)
              </label>
              <input
                {...register("price", {
                  required: true,
                })}
                type="number"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập giá TTB..."
              />
              {errors.price && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tình trạng sử dụng tài sản
              </label>
              <select
                {...register("statusOfUse", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="" disabled>
                  Chọn tình trạng sử dụng...
                </option>
                {Object.entries(IStatusOfUse).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.statusOfUse && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Số năm sử dụng
              </label>
              <input
                {...register("timeUse", {
                  required: true,
                })}
                type="number"
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập số năm sử dụng..."
              />
              {errors.timeUse && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tình trạng TTB YT
              </label>
              <select
                {...register("status", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="" disabled>
                  Chọn tình trạng TTB YT...
                </option>
                {Object.entries(IStatus).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
          </div>
          <div className="w-1/2 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Thời gian nhập kho
              </label>
              <input
                type="date"
                onChange={handleDateChange("timeIn")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                defaultValue={timeIn.toISOString().split("T")[0]} // Chuyển đổi về định dạng date
              />
              {errors.timeIn && (
                <p className="text-red-500">Không được để trống</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Thời gian xuất kho
              </label>
              <input
                type="date"
                onChange={handleDateChange("timeOut")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                defaultValue={timeIn.toISOString().split("T")[0]} // Chuyển đổi về định dạng date
              />
              {errors.timeOut && (
                <p className="text-red-500">Không được để trống</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Thời gian kiểm định
              </label>
              <input
                type="date"
                onChange={handleDateChange("timeCheck")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                defaultValue={timeCheck.toISOString().split("T")[0]} // Chuyển đổi về định dạng date
              />
              {errors.timeCheck && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tồn kho
              </label>
              <input
                type="number"
                {...register("stock", { required: true, valueAsNumber: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập tồn kho..."
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nhóm thiết bị
              </label>
              <select
                {...register("category", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="" disabled>
                  Chọn Nhóm thiết bị...
                </option>
                {Object.entries(categories).map(([key, value]) => (
                  <option key={key} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phân loại TTB (A, B, C, D)
              </label>
              <select
                {...register("classification", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="" disabled>
                  Chọn phân loại TTB...
                </option>
                {Object.entries(IClassification).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.classification && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Khoa/phòng
              </label>
              <select
                {...register("department", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                {departments?.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Vị trí
              </label>
              <select
                {...register("warehouse", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="" disabled>
                  Chọn vị trí...
                </option>
                {Object.entries(warehouses).map(([key, value]) => (
                  <option key={key} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>
              {errors.warehouse && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bảo dưỡng sửa chữa
              </label>
              <input
                type="number"
                min="0"
                {...register("maintenance", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập số lần bảo dưỡng sửa chữa TTB..."
              />
              {errors.maintenance && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Ghi chú
              </label>
              <textarea
                {...register("note", { required: false })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                rows={3}
                placeholder="Nhập ghi chú..."
              />
              {errors.note && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>

            <div>
              <button
                onClick={() => setOpenImage(true)}
                type="button"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
              >
                Thêm ảnh
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition"
          >
            Huỷ
          </button>
          <button
            type="button"
            onClick={setDefaultValues}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
          >
            {initialData ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
      <Modal
        open={openImage}
        footer={null}
        closeIcon={false}
        centered
        onCancel={() => setOpenImage(false)}
      >
        <ImageUpload onImagesSelected={handleUploadImage} />
      </Modal>
    </div>
  );
}
