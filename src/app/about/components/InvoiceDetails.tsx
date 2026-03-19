'use client';
import logosm from '@/assets/images/logo-benh-vien.jpeg';
import Image from 'next/image';
import Link from 'next/link';
import { LuEllipsis, LuSave, LuSquarePen, LuTrash2 } from 'react-icons/lu';
import { fetchPublicDepartment } from '@/server/api';
import { useEffect, useState } from 'react';
import { IDepartment } from '@/server/entity';
type InvoiceDetailsProps = {
  id: number;
};

const InvoiceDetails = ({ id }: InvoiceDetailsProps) => {
  const [department, setDepartment] = useState<IDepartment | null>(null);
  const [hashtag, setHashtag] = useState('');
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
  useEffect(() => {
    if (id) {
      fetchPublicDepartment(id).then(res => {
        setDepartment(res);
        setHashtag(convertToHashtag(res.name));
      });
    }
  }, []);
  return (
    <div className="lg:col-span-3 col-span-1">
      <div className="card">
        <div className="card-body">
          <div className="flex flex-wrap justify-between items-center md:gap-0 gap-4">
            <div>
              <h6 className="mb-1 text-base font-semibold text-default-800">
                {department ? department.name : ''}
              </h6>
              <ul className="flex items-center gap-3 text-default-500 text-sm">
                <li>{hashtag}</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="card-body">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-8">
              <div className="text-default-500">
                <p className="mb-2 text-sm uppercase">Lãnh đạo</p>
                <h6 className="mb-1 text-base font-semibold text-default-800">Paula Keenan</h6>
                <p className="mb-1 text-sm">176 Arvid Crest Sheastad, IA</p>
                <p className="mb-1 text-sm">+(211) 0123 456 897</p>
              </div>

              <div className="text-default-500">
                <p className="mb-2 text-sm uppercase ">Billing Address</p>
                <h6 className="mb-1 text-base font-semibold text-default-800">Paula Keenan</h6>
                <p className="mb-1 text-sm">176 Arvid Crest Sheastad, IA</p>
                <p className="mb-1 text-sm">+(211) 0123 456 897</p>
                <p className="mb-1 text-sm">TAX No. 5415421</p>
              </div>
            </div>

            <div className="my-5 text-default-500 text-sm">
              <p className="mb-2 text-sm uppercase">Payments Details</p>
              <p className="mb-1">Payment Method: Credit Card</p>
              <p className="mb-1">Card Holder: Paula Keenan</p>
              <p className="mb-1">Card Number: xxxx xxxx xxxx 1402</p>
              <p>Total Amount: $755.96</p>
            </div>

            <p className="px-4 py-3 text-sm rounded-lg border border-info/20 text-info bg-info/10">
              <b>NOTES:</b> All accounts are to be paid within 7 days from receipt of invoice. To be
              paid by cheque or credit card or direct payment online. If account is not paid within
              7 days the credits details supplied as confirmation of work undertaken will be charged
              the agreed quoted fee noted above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
