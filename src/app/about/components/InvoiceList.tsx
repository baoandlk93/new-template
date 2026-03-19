import SimplebarClient from '@/components/client-wrapper/SimplebarClient';
import { IDepartment } from '@/server/entity';
import Link from 'next/link';
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu';

type Invoice = {
  id: string;
  hastag: string;
  name: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Unpaid' | 'Cancel' | 'Refund';
};

type InvoiceListProps = {
  data: IDepartment[];
};

const InvoiceList = ({ data }: InvoiceListProps) => {
  const convertToHashtag = (name: string): string => {
    // Loại bỏ khoảng trắng dư thừa và kiểm tra độ dài
    if (!name || name.trim().length === 0) {
      return '';
    }

    // Tách chuỗi thành các từ, chuyển đổi thành chữ hoa và nối lại với # ở đầu
    const hashtag = name
      .trim()
      .split(/\s+/) // Tách theo khoảng trắng
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Chuyển ký tự đầu tiên thành chữ hoa
      .join(''); // Nối lại thành chuỗi không có khoảng trắng

    return `#${hashtag}`; // Thêm # ở đầu
  };
  const convertDepartmentsToInvoices = (departments: IDepartment[]): Invoice[] => {
    return departments.map(department => {
      return {
        id: department.id?.toString() || Math.random().toString(), // Chuyển id thành chuỗi, nếu không có thì tạo id ngẫu nhiên
        hastag: convertToHashtag(department.name ?? ''),
        name: department.name || 'Unknown Department', // Sử dụng tên bộ phận, nếu không có thì mặc định
        amount: '0.00', // Giả định số tiền là 0.00 cho tất cả hóa đơn
        date: new Date().toISOString().split('T')[0], // Ngày hiện tại dưới dạng chuỗi YYYY-MM-DD
        status: 'Unpaid', // Giả định trạng thái là 'Unpaid'
      };
    });
  };
  const invoices: Invoice[] = convertDepartmentsToInvoices(data);

  return (
    <div className="lg:col-span-1 col-span-1 card print:hidden">
      <div className="sticky top-24">
        <div className="card-body">
          <h6 className="mb-4 card-title">Invoice List</h6>

          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <input
                type="text"
                className="ps-11 form-input form-input-sm"
                placeholder="Search for..."
              />
              <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3">
                <LuSearch className="size-4 text-default-500" />
              </div>
            </div>

            <button
              type="button"
              className="btn size-7.5 bg-info/15 text-primary hover:text-white hover:bg-sky-600"
            >
              <LuSlidersHorizontal className="size-4" />
            </button>
          </div>
        </div>

        <SimplebarClient className="overflow-x-auto h-150">
          {invoices.map(invoice => (
            <Link
              href={`/about/${invoice.id}`}
              key={invoice.id}
              className="block border-t p-5 border-default-200 hover:bg-default-100 active"
            >
              <div className="flex justify-between">
                <div className="w-full">
                  <h6 className="font-semibold text-sm text-default-700">{invoice.hastag}</h6>
                  <div>
                    <h6 className="mt-3 mb-2 text-base font-semibold text-default-800">
                      {invoice.name}
                    </h6>
                    <div className="flex items-center justify-between gap-6">
                      {/* <p className="text-default-500 text-sm">{invoice.amount}</p> */}
                      {/* <button type="button" className="inline-flex text-sm items-center">
                        <LuCalendarClock className="size-4 text-default-500 me-1.5" />
                        {invoice.date}
                      </button> */}
                    </div>
                  </div>
                </div>

                <div>
                  {/* <span className={statusClasses[invoice.status]}>{invoice.status}</span> */}
                </div>
              </div>
            </Link>
          ))}
        </SimplebarClient>
      </div>
    </div>
  );
};

export default InvoiceList;
