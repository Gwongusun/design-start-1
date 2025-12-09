/* src/components/Select.stories.tsx */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Select from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered', // 화면 중앙 정렬
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { label: '옵션 1 (React)', value: 'react' },
  { label: '옵션 2 (Vue)', value: 'vue' },
  { label: '옵션 3 (Angular)', value: 'angular' },
  { label: '옵션 4 (React)', value: 'react' },
  { label: '옵션 5 (Vue)', value: 'vue' },
  { label: '옵션 6 (Angular)', value: 'angular' },
];

export const Default: Story = {
  args: {
    label: '프레임워크 선택',
    options: sampleOptions,
    value: 'react',
    width: '300px',
    onChange: () => {},
  },
  // 실제 동작(클릭) 확인을 위한 설정
  render: (args) => {
    // eslint-disable-next-line
    const [val, setVal] = useState(args.value);
    return (
      <div style={{ height: '300px' }}> {/* 드롭다운 펼쳐질 공간 확보 */}
        <Select 
          {...args} 
          value={val} 
          onChange={(newValue) => setVal(newValue)} 
        />
      </div>
    );
  },
};