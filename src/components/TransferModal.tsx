import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Device, IDepartment, IWarehouse } from "@/server/entity";

interface TransferModalProps {
  openModalTransfer: boolean;
  handleTransfer: (updatedEquipment: Device) => Promise<void>;
  confirmTransferLoading: boolean;
  handleCancelTransfer: () => void;
  transferEquipment: Device | null;
  departments: IDepartment[];
  warehouses: IWarehouse[];
}

export default function TransferModal({
  openModalTransfer,
  handleTransfer,
  confirmTransferLoading,
  handleCancelTransfer,
  transferEquipment,
  departments,
  warehouses,
}: TransferModalProps) {
  const [department, setDepartment] = useState("");
  const [warehouse, setWarehouse] = useState("");

  useEffect(() => {
    if (transferEquipment) {
      setDepartment(transferEquipment.department || "");
      setWarehouse(transferEquipment.warehouse || "");
    }
  }, [transferEquipment]);

  const hasDataChanged = () => {
    return (
      department !== transferEquipment?.department ||
      warehouse !== transferEquipment?.warehouse
    );
  };
  const onOk = () => {
    // Create updated equipment object
    const updatedEquipment: Device = {
      ...transferEquipment!,
      department,
      warehouse,
    };
    handleTransfer(updatedEquipment);
    console.log(updatedEquipment);
  };
  return (
    <Modal
      title="Chuyển kho"
      open={openModalTransfer}
      onOk={onOk}
      confirmLoading={confirmTransferLoading}
      onCancel={handleCancelTransfer}
      okButtonProps={{ disabled: !hasDataChanged() }}
    >
      <div>
        <label className="block text-gray-700 font-medium mb-1">Mã TTB</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={transferEquipment?.deviceCode}
          required
          disabled
          placeholder="Nhập mã TTB..."
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Tên TTB</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={transferEquipment?.name}
          disabled
          required
          placeholder="Nhập tên TTB..."
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Khoa/phòng
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
          required
        >
          <option value="" disabled>
            Chọn khoa/phòng...
          </option>
          {departments?.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Vị trí</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={warehouse}
          onChange={(e) => {
            setWarehouse(e.target.value);
          }}
          required
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
      </div>
    </Modal>
  );
}
