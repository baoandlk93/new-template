export enum ERole {
  ADMIN = "ADMIN",
  USER = "USER",
  MANAGER = "MANAGER",
}
export interface IRole {
  id?: number;
  name?: string;
  description?: string;
}
export interface IUser {
  id?: number;
  avatar?: string;
  fullName?: string;
  username?: string;
  password?: string;
  roles: IRole[];
  email?: string;
  phoneNumber?: string;
  address?: string;
  accessToken?: string;
}
export interface IWarehouse {
  id?: number;
  name?: string;
  description?: string;
}
export enum IStatus {
  NEW = "Mới chưa  cấp",
  OLD = "Cũ còn SD tốt ",
  DAMAGED = "Hỏng, chờ thanh lý  ",
  SOLD = "Xuất  kho",
}
export enum IStatusOfUse {
  USING = "Sử dụng",
  UNUSED = "Không sử dụng",
  MAINTENANCE = "Bảo trì",
}
export enum EStatusMaintenance {
  REQUEST = "Yêu cầu sửa chữa",
  IN_PROGRESS = "Đang sửa chữa",
  COMPLETED = "Hoàn thành sửa chữa",
}
export interface ICategory {
  id?: number;
  name?: string;
}
export enum ECategory {
  CDHA = "Thiết bị chẩn đoán hình ảnh",
  HSCC = "Thiết bị hồi sức - cấp cứu",
  XN = "Thiết bị xét nghiệm",
  PTTT = "Thiết bị phẫu thuật - thủ thuật",
  DT = "Thiết bị điều trị",
  TKKT = "Thiết bị tiệt khuẩn - khử trùng",
  VCHT = "Thiết bị vận chuyển, hỗ trợ",
  VPHC = "Thiết bị văn phòng - hành chính",
  VSMT = "Thiết bị vệ sinh - môi trường",
  PHCN = "Thiết bị hỗ trợ - phục hồi chức năng",
}
export enum ELocation {
  HSCC = "KHU HỒI SỨC CẤP CỨU",
  PNS = "PHÒNG NỘI SOI",
  COPD = "PHÒNG KHÁM, COPD",
  NH = " NHÀ HẤP",
  XQUANG = "PHÒNG XQUANG",
  PSA = "PHÒNG SIÊU ÂM ",
  KLNP = "KHO LAO NGOÀI PHỔI",
  KNA = "KHO NHÀ ĂN ",
  CTHC = "Cầu thang  Hành chính ",
  XLNT = "Nhà xử lý nươc thải",
  KMT = "Nhà kho mái tôn cổng 2",
  GAXE = "GARA XE",
}
export interface IDepartment {
  id?: number;
  name?: string;
  description?: string;
}
export enum IClassification {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}
export interface Device {
  id: number;
  deviceCode: string;
  name: string;
  model: string;
  manufacturer: string;
  quantity: number;
  assetSource: string;
  yearOfSupply: Date;
  price: string;
  statusOfUse: IStatusOfUse;
  status: IStatus;
  timeIn: Date;
  timeOut: Date;
  timeUse: number;
  timeCheck: Date;
  stock: number;
  classification: IClassification;
  category: ECategory;
  warehouse: string;
  department: string;
  maintenance: number;
  wearRate: string;
  image: Image[];
  note: string;
}
export interface FilterDevice {
  departmentIds: number[];
  categoryIds: number[];
  warehouseIds: number[];
}
export interface APIResponse {
  id: string;
  deviceCode: string;
  name: string;
  model: string;
  manufacturer: string;
  quantity: string;
  assetSource: string;
  yearOfSupply: string;
  price: string;
  statusOfUse: string;
  status: string;
  timeIn: string;
  timeOut: string;
  timeUse: string;
  stock: string;
  classification: string;
  category: string;
  warehouse: string;
  department: string;
  timeCheck: string;
  maintenance: string;
  image: string;
  note: string;
  wearRate: string;
}
export interface Image {
  id?: number;
  name?: string;
  image?: File;
  url?: string;
}

export interface IMaintenance {
  id: number;
  repairingDate: Date;
  repairStatus: string;
  equipmentId: number;
  equipmentCode: string;
  requestingDate: Date;
  username: string;
}

export interface IStatitics {
  statisticsDay: Date;
  totalAssetValue: number;
  totalQuantityOfEmployees: number;
  totalQuantityOfEquipment: number;
  totalQuantityOfImages: number;
  totalQuantityOfRepairing: number;
  totalQuantityOfUsers: number;
  totalQuantityOfWarehouse: number;
}
export interface IStatiticsPatient {
  statisticsDay: Date;
  periodMonth: string;
  bronchialAsthmaLevel: string;
  bronchialAsthmaGroup: string;
  diseaseLevel: string;
  copdType: string;
  illness: string;
  patientCount: number;
}
export interface IActivityLog {
  id?: number;
  name?: string;
  ipAddress?: string;
  username?: string;
  method?: string;
  timeAction?: Date;
  loggingType?: string;
  message?: string;
  actionType?: string;
}
export interface IPatientCOPD {
  id?: number;
  year?: string;
  profileCode?: string;
  name?: string;
  illness?: string;
  gender?: string;
  dateOfBirth?: Date;
  address?: string;
  phoneNumber?: string;
  paymentObject?: string;
  startDate?: Date;
  copdType?: string;
  diseaseLevel?: string;
  bronchialAsthmaLevel?: string;
  bronchialAsthmaGroup?: string;
}
export interface IBiddingInformation {
  id?: number;
  name?: string;
  title?: string;
  files?: Image[];
  receiver?: string;
  postDate?: Date;
}
