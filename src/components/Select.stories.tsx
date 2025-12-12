import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import Select, { OptionType } from './Select';

const OPTIONS: OptionType[] = [
  { value: 'react', label: 'React (UI 라이브러리)' },
  { value: 'vue', label: 'Vue (프레임워크)' },
  { value: 'angular', label: 'Angular (플랫폼)' },
  { value: 'svelte', label: 'Svelte (컴파일러)' },
  { value: 'next', label: 'Next.js (풀스택)' },
  { value: 'jquery', label: 'jQuery (레거시)' },
];

const LONG_OPTIONS = Array.from({ length: 20 }, (_, i) => ({
  label: `옵션 아이템 ${i + 1}`,
  value: `option-${i + 1}`,
}));

const meta = {
  title: 'Design System/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '드롭다운 위치 자동 계산 및 스크롤 기능이 포함된 Select 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    width: { control: 'text' },
    menuWidth: { control: 'text' },
    maxHeight: { control: 'number' },
  },
  // ⭐️ [해결 핵심] 여기에 필수값인 onChange의 기본 함수를 넣어줍니다.
  args: {
    value: '', 
    options: OPTIONS,
    label: '기술 스택 선택',
    width: '320px',
    onChange: () => {}, // 👈 이 줄이 없어서 빨간 줄이 떴던 겁니다!
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);

    useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    const onChange = (newValue: string) => {
      setValue(newValue); 
      args.onChange?.(newValue); 
    };

    return <Select {...args} value={value} onChange={onChange} />;
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본 스토리
export const Default: Story = {
  args: {}, // 빈 객체라도 넣어주면 상위 args를 잘 물려받습니다.
};

// 2. 값이 선택된 상태
export const WithValue: Story = {
  args: {
    label: '이미 선택된 상태',
    value: 'react',
  },
};

// 3. 옵션이 많은 경우
export const ManyOptions: Story = {
  args: {
    label: '스크롤 테스트 (maxHeight: 200)',
    maxHeight: 200,
    options: LONG_OPTIONS,
  },
};

// 4. 비활성화 상태
export const Disabled: Story = {
  args: {
    label: '비활성화 상태',
    value: 'vue',
    disabled: true,
  },
};