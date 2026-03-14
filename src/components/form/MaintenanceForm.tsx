import { IMaintenance } from "@/server/entity";
import { toast } from "react-toastify";
import { addMaintenance } from "@/server/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const statusMaintenance = [
  {
    id: 1,
    name: "Yêu cầu sửa chữa",
  },
  {
    id: 2,
    name: "Đang sửa chữa",
  },
  {
    id: 3,
    name: "Hoàn thành sửa chữa",
  },
];
const MaintainanceForm = ({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData: IMaintenance | null;
  onSubmit: (data: IMaintenance) => Promise<void>;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IMaintenance>();
  const handleFinish = async (value: IMaintenance) => {
    try {
      const method = initialData ? "PUT" : "POST";
      const response = await addMaintenance(method, value);
      // Xử lý lỗi phía server trả về
      if (!response) {
        throw new Error("Có lỗi xảy ra trên server!");
      }
      toast.success(
        initialData
          ? "Cập nhật sửa chữa thành công!"
          : "Thêm sửa chữa mới thành công!",
      );
      if (onSubmit) onSubmit(response);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Lỗi khi thêm/cập nhật sửa chữa!");
    }
  };

  const setValueEdit = () => {
    if (initialData?.id) setValue("id", initialData.id);
    if (initialData?.repairStatus)
      setValue("repairStatus", initialData.repairStatus);
    if (initialData?.equipmentId)
      setValue("equipmentId", initialData.equipmentId);
    if (initialData?.equipmentCode)
      setValue("equipmentCode", initialData.equipmentCode);
    if (initialData?.requestingDate)
      setValue("requestingDate", initialData.requestingDate);
    if (initialData?.repairingDate)
      setValue("repairingDate", initialData.repairingDate);
    if (initialData?.username) setValue("username", initialData.username);
  };
  useEffect(() => {
    if (initialData !== null) setValueEdit();
  }, [initialData]);
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleFinish)} className="space-y-5">
          <div className="flex gap-2 w-full">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mã TTB
              </label>
              <input
                {...register("equipmentCode", { required: true })}
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Nhập mã TTB..."
                defaultValue={initialData?.equipmentCode}
                disabled
              />
              {errors.equipmentCode && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Trạng thái sửa chữa
              </label>
              <select
                {...register("repairStatus", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="" disabled>
                  Chọn trạng thái sửa chữa...
                </option>
                {Object.entries(statusMaintenance).map(([key, value]) => (
                  <option key={key} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>
              {errors.repairStatus && (
                <p className="text-red-500 text-sm">Không được để trống</p>
              )}
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
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
            >
              {initialData ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MaintainanceForm;
