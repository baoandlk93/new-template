import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import chat from '@/assets/images/landing/chat.jpg';
import email from '@/assets/images/landing/email.jpg';
import order from '@/assets/images/landing/order-overview.jpg';
import { LuMoveRight } from 'react-icons/lu';

type WorkCard = {
  id: number;
  image: StaticImageData;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  link: string;
};

type StatItem = {
  id: number;
  value: number | string;
  suffix?: string;
  label: string;
};

const workCards: WorkCard[] = [
  {
    id: 1,
    image: chat,
    tag: 'Khám - HSCC',
    tagColor: 'border-primary/30 bg-primary/15 text-primary',
    title: 'Khoa Khám - Hồi sức cấp cứu',
    description: `Khoa Khám - Hồi sức cấp cứu của Bệnh viện Phổi Khánh Hòa là một đơn vị chuyên trách, 
    cung cấp dịch vụ chăm sóc y tế nhanh chóng và hiệu quả cho các bệnh nhân gặp tình trạng khẩn cấp liên quan 
    đến bệnh lý hô hấp và các vấn đề sức khỏe nghiêm trọng khác.Khoa được trang bị các thiết bị y tế hiện đại, 
    hỗ trợ chẩn đoán và điều trị kịp thời ... `,
    link: '/about/kham-hscc',
  },
  {
    id: 2,
    image: email,
    tag: 'Lao hô hấp',
    tagColor: 'border-secondary/30 bg-secondary/15 text-secondary',
    title: 'Khoa Lao Hô hấp',
    description:
      'Khoa Lao Hô hấp của Bệnh viện Phổi Khánh Hòa là một đơn vị chuyên trách trong việc chẩn đoán, điều trị và quản lý các bệnh nhân mắc lao phổi và các bệnh lý liên quan. Khoa được trang bị cơ sở vật chất và thiết bị y tế hiện đại, phù hợp cho việc theo dõi và điều trị bệnh nhân nội trú...',
    link: '/about/lao-ho-hap',
  },
  {
    id: 3,
    image: order,
    tag: 'LNP&BP',
    tagColor: 'border-danger/20 bg-danger/15 text-danger',
    title: 'Khoa Lao Ngoài phổi và Bệnh phổi',
    description:
      'Khoa Lao Ngoài Phổi và Bệnh Phổi của Bệnh viện Phổi Khánh Hòa là một đơn vị chuyên khoa chuyên điều trị các bệnh lý lao không chỉ giới hạn ở phổi mà còn ở các cơ quan khác trong cơ thể, cũng như quản lý các bệnh lý phổi khác...',
    link: '/about/lao-ngoai-phoi',
  },
];

const stats: StatItem[] = [
  { id: 1, value: 4, suffix: '+', label: 'Thạc sĩ' },
  { id: 2, value: 8, suffix: '+', label: 'Bác sĩ CKI' },
  { id: 3, value: 8, suffix: '', label: 'Khoa/Phòng' },
  { id: 4, value: 500, suffix: '+', label: 'Danh mục kỹ thuật' },
  { id: 5, value: 36500, suffix: '+', label: 'Bệnh nhân đã chữa khỏi' },
];

const Works = () => {
  return (
    <section className="relative z-20 pb-32 bg-default-100 dark:bg-default-950">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-6">
          {workCards.map((card, index) => (
            <div
              key={card.id}
              className={`card rounded-md shadow-md transition-all duration-300 hover:-translate-y-2 ${
                index === 0 ? '-mt-36' : 'lg:-mt-36'
              }`}
            >
              <div className="card-body">
                <div className="flex flex-col gap-y-6">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={400}
                    height={250}
                    className="rounded-md shadow"
                  />
                  <div>
                    <span
                      className={`inline-flex items-center py-0.5 px-2.5 rounded text-xs font-medium border ${card.tagColor}`}
                    >
                      {card.tag}
                    </span>

                    <h6 className="text-lg font-semibold mt-3 mb-2 text-default-800">
                      <Link href={card.link}>{card.title}</Link>
                    </h6>

                    <p className="mb-3 text-base text-default-500">{card.description}</p>

                    <Link
                      href={card.link}
                      className="text-primary text-base flex items-center gap-1.5"
                    >
                      Đọc tiếp
                      <LuMoveRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-10 rounded-md mt-20 bg-default-900 dark:bg-default-900">
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6">
            {stats.map(stat => (
              <div key={stat.id} className="text-center">
                <h3 className="mb-2 text-white text-2xl font-semibold">
                  <span>{stat.value}</span>
                  {stat.suffix}
                </h3>
                <p className="text-base text-default-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
