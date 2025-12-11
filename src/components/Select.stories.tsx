import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Select, { OptionType } from './Select';

// 1. 스토리북 설정
const meta = {
  title: 'Design System/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '드롭다운 위치 자동 계산(Top/Bottom) 및 스크롤 기능이 포함된 Select 컴포넌트',
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
  // ⭐️ [핵심 해결] 여기에 공통 필수값을 미리 넣어두면 에러가 사라집니다!
  args: {
    value: '', // 필수값 (초기값)
    onChange: (val) => console.log(`선택됨: ${val}`), // 필수값 (빈 함수)
    options: [], // 필수값 (빈 배열)
    label: '기본 라벨', // 필수값
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 2. 테스트용 데이터
const OPTIONS: OptionType[] = [
  { value: 'react', label: 'React (UI 라이브러리)' },
  { value: 'vue', label: 'Vue (프레임워크)' },
  { value: 'angular', label: 'Angular (플랫폼)' },
  { value: 'svelte', label: 'Svelte (컴파일러)' },
  { value: 'next', label: 'Next.js (풀스택)' },
  { value: 'nuxt', label: 'Nuxt.js (Vue 기반)' },
  { value: 'jquery', label: 'jQuery (레거시)' },
];

// 옵션 20개 자동 생성 (스크롤 테스트용)
const LONG_OPTIONS = Array.from({ length: 20 }, (_, i) => ({
  label: `옵션 아이템 ${i + 1}`,
  value: `option-${i + 1}`,
}));

// 3. 스토리 정의

// [케이스 1] 기본 상태 (Default)
export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <Select 
        {...args} 
        value={val} 
        onChange={setVal} 
      />
    );
  },
  args: {
    label: '기술 스택 선택',
    options: OPTIONS,
    width: '320px',
    // value, onChange는 위 meta.args에서 기본값을 가져오므로 생략 가능!
  },
};

// [케이스 2] 값이 이미 선택된 상태
export const WithValue: Story = {
  render: (args) => {
    const [val, setVal] = useState('react'); 
    return (
      <Select 
        {...args} 
        value={val} 
        onChange={setVal} 
      />
    );
  },
  args: {
    label: '이미 선택된 상태',
    options: OPTIONS,
    width: '320px',
  },
};

// [케이스 3] 옵션이 많을 때 (스크롤 테스트)
export const ManyOptions: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    
    return (
      <Select 
        {...args} 
        // 여기서 options를 덮어씌웁니다.
        options={LONG_OPTIONS}
        value={val} 
        onChange={setVal} 
      />
    );
  },
  args: {
    label: '스크롤 테스트 (maxHeight: 200)',
    width: '320px',
    maxHeight: 200, 
    options: LONG_OPTIONS, // ⭐️ TS 에러 방지용: 여기서도 넣어줘야 함
  },
};

// [케이스 4] 비활성화 상태
export const Disabled: Story = {
  args: {
    label: '비활성화 상태',
    options: OPTIONS,
    value: 'vue',
    disabled: true,
    width: '320px',
  },
};