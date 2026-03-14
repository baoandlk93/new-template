import axios from 'axios';
import {
  Device,
  ICategory,
  IDepartment,
  IMaintenance,
  IPatientCOPD,
  IRole,
  IUser,
  IWarehouse,
  FilterDevice,
  IBiddingInformation,
} from './entity';
import { getUserFromLocalStorage } from '@/utils/security';
// MANAGER
export const fetchCategoryEquipments = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      number: 0,
      size: 20,
      name: '',
    },
  })
    .then(res => res.data.content)
    .catch((err: Error) => {
      console.log(err.stack, 'ERROR');
    });
};
export const fetchCategoryEquipment = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch((err: Error) => {
      console.log(err.stack, 'ERROR');
    });
};
export const addCategoryEquipment = async (method: string, value: ICategory) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(value),
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};
export const removeCategoryEquipment = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};
export const removeDepartment = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/departments/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};
// Patient COPD
export const fetchCopdPatients = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/patient-copd`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch((err: Error) => {
      console.log(err.stack, 'ERROR');
    });
};
export const searchCopdPatients = async (query: string) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/patient-copd/search`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      query: query,
    },
  })
    .then(res => res)
    .catch((err: Error) => {
      console.log(err.stack, 'ERROR');
    });
};
export const fetchCopdPatient = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/patient-copd/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch((err: Error) => {
      console.log(err.stack, 'ERROR');
    });
};
export const countPatientOfYear = async (year: string) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/patient-copd/count`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      year: year,
    },
  })
    .then(res => res)
    .catch((err: Error) => {
      console.log(err.stack, 'ERROR');
    });
};
export const addCopdPatients = async (method: string, value: IPatientCOPD) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/patient-copd`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(value),
  })
    .then(res => res)
    .catch(e => console.log(e));
};
export const importCopdPatients = async (file: FormData) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/patient-copd/import`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: file,
  })
    .then(res => res)
    .catch(e => e);
};
export const removeCopdPatients = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/patient-copd/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(e => console.log(e));
};

export const fetchDepartment = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/departments/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};
export const fetchDepartments = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/departments`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 0,
      size: 20,
      name: '',
    },
  })
    .then(res => res.data.content)
    .catch(e => console.log(e));
};
export const addDepartments = async (method: string, value: IDepartment) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/departments`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(value),
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};
export const fetchWarehouses = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/warehouses`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 0,
      size: 20,
      name: '',
    },
  })
    .then(res => res.data.content)
    .catch(e => console.log(e));
};
export const fetchWarehouse = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/warehouses/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};
export const addWarehouse = async (method: string, value: IWarehouse) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/warehouses`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(value),
  })
    .then(res => res.data)
    .catch((e: unknown) => {
      console.error(e);
      throw e;
    });
};
export const removeWarehouse = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/warehouses/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(e => e);
};
export const filterEquipments = async (filterEquipmentDto: FilterDevice) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/equipments/filter`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: filterEquipmentDto,
  })
    .then(res => res.data.content)
    .catch(e => console.log(e));
};
export const fetchEquipments = async (
  page: number | '',
  size: number | '',
  name: string | '',
  code: string | '',
  note: string | '',
  model: string | '',
  manufacturer: string | '',
  assetSource: string | '',
  price: number | '',
  maintenance: number | '',
  statusOfUse: string | '',
  status: string | '',
  stock: number | '',
  classification: string | ''
) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/equipments`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 0,
      size: 20,
      name: '',
      code: '',
      note: '',
      model: '',
      manufacturer: '',
      assetSource: '',
      yearOfSupply: '',
      price: '',
      maintenance: '',
      statusOfUse: '',
      status: '',
      stock: '',
      classification: '',
    },
  })
    .then(res => res.data.content)
    .catch(e => console.log(e));
};
export const addEquipment = async (method: string, value: Device) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/equipments`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(value),
  })
    .then(res => res)
    .catch(e => e);
};
export const removeEquipment = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/equipments/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(e => e);
};
export const fetchEquipment = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/equipments/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};
export const fetchBiddingInformations = async (
  page: number | '',
  size: number | '',
  name: string | '',
  code: string | '',
  note: string | '',
  model: string | '',
  manufacturer: string | '',
  assetSource: string | '',
  price: number | '',
  maintenance: number | '',
  statusOfUse: string | '',
  status: string | '',
  stock: number | '',
  classification: string | ''
) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/bidding-informations`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 0,
      size: 20,
      name: '',
      code: '',
      note: '',
      model: '',
      manufacturer: '',
      assetSource: '',
      yearOfSupply: '',
      price: '',
      maintenance: '',
      statusOfUse: '',
      status: '',
      stock: '',
      classification: '',
    },
  })
    .then(res => res)
    .catch(e => console.log(e));
};
export const fetchPublicBiddingInformations = async (page: number) => {
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/public/bidding-informations`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      page: page,
    },
  })
    .then(res => res)
    .catch(e => console.log(e));
};
export const addBiddingInformation = async (method: string, value: IBiddingInformation) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/bidding-informations`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(value),
  })
    .then(res => res)
    .catch(e => e);
};
export const removeBiddingInformation = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/bidding-informations/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(e => e);
};
export const fetchBiddingInformation = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/bidding-informations/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(e => console.log(e));
};

// GUEST
export const login = async (username: string, password: string) => {
  const response = await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ username, password }),
  })
    .then(res => res)
    .catch(e => e);
  return response;
};
export const checkToken = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(e => e.response);
};
export const uploadImage = async (formData: FormData) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
    method: 'POST',
    data: formData,
  })
    .then(res => res)
    .catch(e => e);
};
export const fetchPublicEquipment = async (id: number, token: string) => {
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/equipments/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};

//ADMIN
export const fetchRoles = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/roles`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 0,
      size: 20,
      name: '',
    },
  })
    .then(res => res)
    .catch(err => err);
};
export const addRoles = async (method: string, value: IRole) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/roles`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(value),
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};
export const resetPassword = async (username: string | '') => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/reset-password`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      username: username,
    },
  })
    .then(res => res)
    .catch(e => e?.response);
};
export const fetchUsers = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 0,
      size: 20,
      fullName: '',
    },
  })
    .then(res => res)
    .catch(e => e?.response);
};
export const addUser = async (method: string, value: IUser) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(value),
  })
    .then(res => res.data)
    .catch(e => console.log(e));
};
export const fetchMaintenances = async (status: string) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/maintenances`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      equipmentId: 0,
      timeIn: new Date(),
      status: status,
      equipmentCode: '',
    },
  })
    .then(res => res)
    .catch(err => err);
};
export const addMaintenance = async (method: string, value: IMaintenance) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/maintenances`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(value),
  })
    .then(res => res)
    .catch(err => err);
};
export const fetchMaintenance = async (id: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/maintenances/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(err => err);
};
export const exportExcelEquipment = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/equipments/export/excel`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // Thay đổi để nhận file blob
    });

    // Trả về response chứa file
    return response;
  } catch (err) {
    console.error('Error exporting Excel:', err);
    throw err; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};
export const fetchStatitics = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/analytics`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(err => err);
};
export const requestStatitic = async () => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/analytics`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(err => err);
};

export const getAllLogs = async (
  name: string,
  ipAddress: string,
  username: string,
  method: string,
  loggingType: string,
  actionType: string,
  startDate: Date,
  endDate: Date
) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/logs`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      name: name || '',
      ipAddress: ipAddress || '',
      username: username || '',
      method: method || '',
      loggingType: loggingType || '',
      actionType: actionType || '',
      startDate: startDate || null,
      endDate: endDate || null,
    },
  })
    .then(res => res)
    .catch(err => err);
};
export const fetchPatientStatitics = async (fromDate: Date, toDate: Date) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/patients/monthly`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      fromDate: fromDate,
      toDate: toDate,
    },
  })
    .then(res => res)
    .catch(err => err);
};
export const fetchPatientCountByYear = async (year: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/patients/count/year`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      year: year,
    },
  })
    .then(res => res)
    .catch(err => err);
};
export const fetchPatientCountByMonth = async (year: number) => {
  const user = getUserFromLocalStorage();
  const token = user?.accessToken;
  return await axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/patients/monthly/stats`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      year: year,
    },
  })
    .then(res => res)
    .catch(err => err);
};
