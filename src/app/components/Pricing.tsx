import React from 'react';
import { LuCheckCheck, LuX } from 'react-icons/lu';
import { SiWorldhealthorganization } from 'react-icons/si';
import { RiLungsLine } from 'react-icons/ri';
import { FaLungsVirus } from 'react-icons/fa6';
import { GiHealthNormal } from 'react-icons/gi';
import Link from 'next/link';
type Feature = {
  name: string;
  included: boolean;
};

type PricingPlan = {
  id: number;
  title: string;
  description: string;
  price: string;
  period: string;
  icon: React.ElementType;
  iconColor: string;
  buttonText: string;
  highlight?: string;
  href: string;
  features: Feature[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    title: 'Khám bệnh lý phổi',
    description: 'Perfect plan for Lite',
    price: '200',
    period: '/Mỗi tháng',
    icon: RiLungsLine,
    iconColor: 'text-success',
    buttonText: 'Đặt lịch ngay',
    href: '/booking',
    features: [
      { name: 'Các bệnh đường hô hấp (Ảnh hưởng đến ống dẫn khí)', included: true },
      { name: 'Các bệnh về mô phổi (Ảnh hưởng đến phế nang/nhu mô phổi)', included: true },
      { name: 'Các bệnh tuần hoàn phổi (Ảnh hưởng đến mạch máu phổi)', included: true },
      { name: 'Các bệnh về màng phổi', included: true },
      { name: 'Ung thư phổi', included: true },
    ],
  },
  {
    id: 2,
    title: 'Sàng lọc và chẩn đoán lao',
    description: 'For users who want to do more.',
    price: '300',
    period: '/Mỗi đợt',
    icon: FaLungsVirus,
    iconColor: 'text-secondary',
    buttonText: 'Đặt lịch ngay',
    href: '/booking',
    features: [
      { name: 'Bệnh phổi tắc nghẽn mạn tính (COPD)', included: true },
      { name: 'Hen phế quản (Suyễn)', included: true },
      { name: 'Lao phổi', included: true },
    ],
  },
  {
    id: 3,
    title: 'Khám và điều trị chuyên khoa',
    description: 'Run your company on your teams',
    price: '100',
    period: '/Mỗi tháng',
    icon: SiWorldhealthorganization,
    iconColor: 'text-primary',
    buttonText: 'Đặt lịch ngay',
    highlight: 'Tốt nhất',
    href: '/booking',
    features: [
      { name: 'Bệnh phổi tắc nghẽn mạn tính (COPD)', included: true },
      { name: 'Viêm phế quản cấp tính', included: true },
      { name: 'Hen phế quản (Suyễn)', included: true },
      { name: 'Viêm phổi', included: true },
      { name: 'Lao phổi', included: true },
      { name: 'Bệnh phổi kẽ (xơ phổi)', included: true },
      { name: 'Bệnh bụi phổi', included: true },
      { name: 'Thuyên tắc phổi', included: true },
      { name: 'Tràn dịch/Tràn khí màng phổi', included: true },
    ],
  },
  {
    id: 4,
    title: 'Tư vấn - Khám sức khỏe định kỳ',
    description: 'Your entire team in one place',
    price: '500',
    period: '/Mỗi tháng',
    icon: GiHealthNormal,
    iconColor: 'text-danger',
    buttonText: 'Đặt lịch ngay',
    href: '/booking',
    features: [
      { name: 'Ho kéo dài (trên 3 tuần) hoặc ho ra máu.', included: true },
      { name: 'Khó thở, hụt hơi khi hoạt động nhẹ', included: true },
      { name: 'Đau ngực dai dẳng', included: true },
      { name: 'Thở khò khè hoặc thở rít', included: true },
      { name: 'Thường xuyên bị nhiễm trùng đường hô hấp', included: true },
    ],
  },
];
const Pricing = () => {
  return (
    <section id="pricing" className="relative lg:pb-24 md:pb-18 pb-12">
      <div className="container">
        <div className="flex flex-col gap-y-16">
          <div className="text-center lg:w-3xl mx-auto">
            <h1 className="mb-4 leading-relaxed text-4xl font-semibold text-default-800">
              Các hoạt động chuyên môn tại bệnh viện
            </h1>
            <p className="text-lg text-default-500">
              A good web design package will include designing a logo, integration with local SEO,
              linking a site to a social media presence, and more.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-6">
            {pricingPlans.map(plan => (
              <div key={plan.id} className="card relative overflow-hidden">
                <div className="card-body">
                  {plan.highlight && (
                    <div className="size-16 absolute top-0 end-0">
                      <div className="absolute bg-primary text-center w-42.5 text-white py-1 transform rotate-45 top-6 -end-12 font-semibold">
                        {plan.highlight}
                      </div>
                    </div>
                  )}

                  <h5 className="mb-2 flex items-center gap-1.5">
                    <plan.icon className={`${plan.iconColor} size-5`} />
                    <span className="text-lg font-semibold text-default-800">{plan.title}</span>
                  </h5>

                  <p className="mb-4 text-default-500">{plan.description}</p>
                  <h1 className="mb-4 text-4xl text-default-800 font-normal">
                    {plan.price}
                    <span className="text-default-400">ca</span>
                    <small className="text-base text-default-500">{plan.period}</small>
                  </h1>

                  <Link href={plan.href}>
                    <button
                      type="button"
                      className="btn border w-full border-dashed border-primary bg-transparent text-primary hover:bg-primary/20"
                    >
                      {plan.buttonText}
                    </button>
                  </Link>

                  <ul className="mt-5 flex flex-col gap-3 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        {feature.included ? (
                          <LuCheckCheck className="size-4 text-success" />
                        ) : (
                          <LuX className="size-4 text-danger" />
                        )}
                        {feature.included ? (
                          <span
                            className={feature.included ? 'text-default-900' : 'text-default-500'}
                            dangerouslySetInnerHTML={{ __html: feature.name }}
                          />
                        ) : (
                          <del className="text-default-500">{feature.name}</del>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
