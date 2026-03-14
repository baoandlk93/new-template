import {
  Device,
  EStatusMaintenance,
  IStatus,
  IStatusOfUse,
  IUser,
} from "@/server/entity";

export const getStatusName = (
  status: IStatus
): { label: string; color: string } => {
  switch (status) {
    case IStatus.NEW:
      return { label: "Mới chưa cấp", color: "#87d068" }; // Màu xanh lá
    case IStatus.OLD:
      return { label: "Cũ còn SD tốt", color: "#faad14" }; // Màu vàng
    case IStatus.DAMAGED:
      return { label: "Hỏng, chờ thanh lý", color: "#f50" }; // Màu đỏ
    case IStatus.SOLD:
      return { label: "Xuất kho", color: "#1890ff" }; // Màu xanh dương
    default:
      return { label: "Không xác định", color: "#d9d9d9" }; // Màu xám
  }
};
export const getStatus = (status: IStatusOfUse) => {
  switch (status) {
    case IStatusOfUse.USING:
      return { label: "Sử dụng", color: "#87d068" };
    case IStatusOfUse.UNUSED:
      return { label: "Chưa sử dụng", color: "#faad14" };
    case IStatusOfUse.MAINTENANCE:
      return { label: "Bảo trì", color: "#f50" }; // Màu vàng
    default:
      return { label: "Không xác định", color: "#d9d9d9" };
  }
};
export const mapStatusOfUse = (status: string): IStatusOfUse => {
  switch (status) {
    case "USING":
      return IStatusOfUse.USING;
    case "UNUSED":
      return IStatusOfUse.UNUSED;
    case "MAINTENANCE":
      return IStatusOfUse.MAINTENANCE;
    default:
      throw new Error(`Unknown statusOfUse: ${status}`);
  }
};
export const mapStatusOfUseFromTable = (status: string): IStatusOfUse => {
  switch (status) {
    case "Sử dụng":
      return IStatusOfUse.USING;
    case "Không sử dụng":
      return IStatusOfUse.UNUSED;
    case "Bảo trì":
      return IStatusOfUse.MAINTENANCE;
    default:
      throw new Error(`Unknown statusOfUse: ${status}`);
  }
};
export const mapStatusFromTable = (status: string): IStatus => {
  switch (status) {
    case "Mới chưa cấp":
      return IStatus.NEW;
    case "Cũ còn SD tốt ":
      return IStatus.OLD;
    case "Hỏng, chờ thanh lý":
      return IStatus.DAMAGED;
    case "Xuất kho":
      return IStatus.SOLD;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};
export const mapStatus = (status: string): IStatus => {
  switch (status) {
    case "NEW":
      return IStatus.NEW;
    case "OLD":
      return IStatus.OLD;
    case "DAMAGED":
      return IStatus.DAMAGED;
    case "SOLD":
      return IStatus.SOLD;
    default:
      throw new Error(`Unknown status: ${status}`); // Ném lỗi nếu không tìm thấy trạng thái
  }
};

export const transformApiDataToDevice = (apiData: any[]): Device[] => {
  return apiData.map((item) => ({
    id: item.id,
    deviceCode: item.deviceCode,
    name: item.name,
    model: item.model,
    manufacturer: item.manufacturer,
    quantity: item.quantity,
    assetSource: item.assetSource,
    yearOfSupply: new Date(item.yearOfSupply),
    price: item.price,
    statusOfUse: mapStatusOfUse(item.statusOfUse), // Chuyển đổi thành enum
    status: mapStatus(item.status), // Chuyển đổi thành enum
    timeIn: new Date(item.timeIn),
    timeOut: new Date(item.timeOut),
    timeUse: item.timeUse,
    stock: item.stock,
    classification: item.classification, // Giả sử đã có ánh xạ cho classification
    category: item.category, // Giả sử đã có ánh xạ cho category
    warehouse: item.warehouse, // Giả sử đã có ánh xạ cho location
    department: item.department,
    timeCheck: new Date(item.timeCheck),
    maintenance: item.maintenance,
    image: item.image,
    note: item.note,
    wearRate: item.wearRate,
  })) as Device[];
};
export const transformDataToDevice = (item: any): Device => {
  return {
    id: item.id,
    deviceCode: item.deviceCode,
    name: item.name,
    model: item.model,
    manufacturer: item.manufacturer,
    quantity: item.quantity,
    assetSource: item.assetSource,
    yearOfSupply: new Date(item.yearOfSupply),
    price: item.price,
    statusOfUse: mapStatusOfUse(item.statusOfUse), // Chuyển đổi thành enum
    status: mapStatus(item.status), // Chuyển đổi thành enum
    timeIn: new Date(item.timeIn),
    timeOut: new Date(item.timeOut),
    timeUse: item.timeUse,
    stock: item.stock,
    classification: item.classification, // Giả sử đã có ánh xạ cho classification
    category: item.category, // Giả sử đã có ánh xạ cho category
    warehouse: item.warehouse, // Giả sử đã có ánh xạ cho location
    department: item.department,
    timeCheck: new Date(item.timeCheck),
    maintenance: item.maintenance,
    image: item.image,
    note: item.note,
    wearRate: item.wearRate,
  } as Device;
};
export const transformApiDataToUser = (apiData: any[]): IUser[] => {
  return apiData.map((item) => ({
    id: item.id,
    avatar: item.avatar,
    fullName: item.fullName,
    username: item.username,
    password: item.password,
    roles: item.roles,
    email: item.email,
    phoneNumber: item.phoneNumber,
    address: item.address,
    accessToken: item.accessToken,
  })) as IUser[];
};
export const transformDataToUser = (item: any): IUser => {
  return {
    id: item.id,
    avatar: item.avatar,
    fullName: item.fullName,
    username: item.username,
    password: item.password,
    roles: item.roles,
  };
};

export function generatePassword(length: number = 8): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  // Đảm bảo mật khẩu có ít nhất 1 ký tự từ mỗi loại
  const allCharacters = lowercase + uppercase + numbers + specialChars;
  let password = "";

  // Thêm ít nhất 1 ký tự từ mỗi loại
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Tạo các ký tự còn lại để đạt độ dài yêu cầu
  for (let i = password.length; i < length; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  // Trộn mật khẩu để không có quy tắc
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
export const getStatusMaintenance = (status: EStatusMaintenance) => {
  switch (status) {
    case EStatusMaintenance.REQUEST:
      return { label: "Yêu cầu sửa chữa", color: "#f34611ff" };
    case EStatusMaintenance.IN_PROGRESS:
      return { label: "Đang sửa chữa", color: "#faad14" };
    case EStatusMaintenance.COMPLETED:
      return { label: "Hoàn thành sửa chữa", color: "rgba(43, 255, 0, 1)" }; // Màu vàng
    default:
      return { label: "Không xác định", color: "#d9d9d9" };
  }
};
const formatDate = (date: Date) => {
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
