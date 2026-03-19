import Link from 'next/link';
import React from 'react';
import { LuRocket, LuShoppingCart } from 'react-icons/lu';
import bgImage from '@/assets/images/anh-nen-benh-vien.jpg';
const Hero = () => {
  return (
    <section
      className="relative lg:pt-44 lg:pb-36 md:pt-34 md:pb-20 pt-30 pb-16"
      style={{
        backgroundImage: `url(${bgImage.src})`, // Đường dẫn đến ảnh nền
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute rotate-45 size-125 border border-dashed border-t-default-300  border-l-default-300  border-r-default-300/40 border-b-default-700  rounded-full end-40 -bottom-62.5 z-20 lg:block hidden"></div>

      <div className="absolute rotate-45 size-175 border border-dashed border-t-default-300  border-l-default-300  border-r-default-300/40 border-b-default-700 rounded-full end-16 -bottom-87.5 z-20 lg:block hidden"></div>

      <div className="container">
        <div className="grid lg:grid-cols-2">
          <div className="relative z-20">
            <div className="bg-gray-200 rounded-4xl p-6 shadow-lg">
              {' '}
              {/* Lớp nền trong suốt */}
              <h1 className="mb-8 leading-relaxed md:text-5xl text-4xl font-semibold text-default-800">
                Bệnh viện
                <span className="relative inline-block px-2 mx-2 before:block before:absolute before:-inset-1 before:-skew-y-6 before:bg-gray-400/10 before:rounded-md before:backdrop-blur-xl">
                  <span className="relative text-primary"> Phổi Khánh Hòa</span>
                </span>
              </h1>
              <p className="mb-6 text-lg text-default-700">
                Bệnh viện Phổi Khánh Hòa là một cơ sở y tế chuyên khoa hàng đầu tại tỉnh Khánh Hòa,
                Việt Nam, chuyên điều trị các bệnh lý liên quan đến phổi và đường hô hấp. Với đội
                ngũ bác sĩ và nhân viên y tế nhiều kinh nghiệm, bệnh viện cam kết cung cấp dịch vụ
                chăm sóc sức khỏe chất lượng cao cho bệnh nhân. Bệnh viện được trang bị thiết bị y
                tế hiện đại và các phương tiện chẩn đoán tiên tiến nhằm hỗ trợ việc phát hiện và
                điều trị kịp thời các bệnh lý phổi, bao gồm bệnh phổi tắc nghẽn mãn tính (COPD), hen
                suyễn, viêm phổi, và các bệnh liên quan đến lao. Ngoài ra, ...
              </p>
              <div className="flex items-center gap-2.5">{/* Các nút bấm nếu cần */}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
