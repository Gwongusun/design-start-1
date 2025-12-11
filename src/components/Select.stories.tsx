import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import Select, { OptionType } from './Select';

// 1. 테스트용 데이터
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

// 2. 스토리북 설정
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
  args: {
    // 공통 기본값
    value: '', 
    options: OPTIONS,
    label: '기술 스택 선택',
    width: '320px',
    onChange: (val) => console.log(`[Action] 선택됨: ${val}`),
  },
  // ⭐️ 핵심: 모든 스토리에 공통으로 적용될 렌더 함수 (상태 동기화 로직)
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: string) => {
      updateArgs({ value: newValue }); // Storybook Args 업데이트 (UI 반영)
      args.onChange?.(newValue);       // 콘솔 로그 출력
    };

    return <Select {...args} value={value} onChange={onChange} />;
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 3. 스토리 정의 (코드가 훨씬 간결해집니다)

// [케이스 1] 기본 상태
export const Default: Story = {
  // meta에 정의된 render와 args를 그대로 사용하므로 내용 불필요
};

// [케이스 2] 값이 이미 선택된 상태
export const WithValue: Story = {
  args: {
    label: '이미 선택된 상태',
    value: 'react', // 초기값 설정
  },
};

// [케이스 3] 옵션이 많을 때 (스크롤 테스트)
export const ManyOptions: Story = {
  args: {
    label: '스크롤 테스트 (maxHeight: 200)',
    maxHeight: 200,
    options: LONG_OPTIONS, // 긴 옵션 리스트로 교체
  },
};

// [케이스 4] 비활성화 상태
export const Disabled: Story = {
  args: {
    label: '비활성화 상태',
    value: 'vue',
    disabled: true,
  },
};