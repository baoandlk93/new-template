import React from 'react';
import { Select } from 'antd';

const onSearch = (value: string) => {
  console.log('search:', value);
};

const FilterCategory = ({
  options,
  onChange,
  status,
}: {
  options: any[];
  onChange: (value: number[]) => void; // Định nghĩa type cho onChange
  status: '' | 'error' | 'warning' | undefined;
}) => (
  <Select
    showSearch
    mode="multiple"
    optionFilterProp="label"
    onSearch={onSearch}
    style={{ width: 500 }}
    placeholder="Chọn Nhóm TTB"
    onChange={onChange}
    options={options}
    status={status}
  />
);

export default FilterCategory;
