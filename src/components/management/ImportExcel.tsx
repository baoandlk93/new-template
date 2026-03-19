import { IPatientCOPD, IStatus, IStatusOfUse } from "@/server/entity";
import React from "react";
import * as XLSX from "xlsx";
const mapGender = (gender: string): string => {
  switch (gender) {
    case "nam":
      return "male";
    case "nữ":
      return "female";
    default:
      return "other";
  }
};
const convertExcelDateToJSDate = (excelDate: number): Date => {
  // Excel lưu trữ ngày dưới dạng số nguyên, bắt đầu từ 30/12/1899
  const excelEpoch = new Date(1899, 11, 30); // Tháng 11 là tháng 12 trong JS
  return new Date(excelEpoch.getTime() + excelDate * 24 * 60 * 60 * 1000); // Chuyển đổi sang milliseconds
};
interface ImportExcelProps {
  onDataChange: (devices: IPatientCOPD[]) => void; // Định nghĩa prop để nhận dữ liệu
}
const ImportExcelPatient: React.FC<ImportExcelProps> = ({ onDataChange }) => {
  const mapPatientFromExcel = (excelData: any): IPatientCOPD => {
    return {
      id: 0,
      year: excelData["Năm"] || "",
      name: excelData["Họ và tên"] || "",
      profileCode: excelData["Mã số ĐKĐT"] || "",
      illness: excelData["Bệnh"] || "",
      gender: mapGender(excelData["Giới tính"]) || "",
      dateOfBirth: convertExcelDateToJSDate(excelData["Năm sinh"]) || "",
      address: excelData["Địa chỉ"] || "",
      phoneNumber: excelData["Số điện thoại"] || "",
      paymentObject: excelData["Đối tượng thanh toán"] || "",
      startDate:
        convertExcelDateToJSDate(excelData["Ngày bắt đầu điều trị"]) || "",
      copdType: excelData["COPD"] || "",
      diseaseLevel: excelData["Hạng COPD"] || "",
      bronchialAsthmaLevel: excelData["Hen"] || "",
      bronchialAsthmaGroup: excelData["Nhóm Hen"] || "",
    };
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Chuyển đổi từng đối tượng trong jsonData thành Device
      const devices: IPatientCOPD[] = jsonData.map((data) =>
        mapPatientFromExcel(data),
      );
      onDataChange(devices); // Gửi dữ liệu đến parent component
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  );
};

export default ImportExcelPatient;
