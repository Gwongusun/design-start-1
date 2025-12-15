import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text'; // 경로 확인해주세요 (같은 폴더에 있다면 ./Text)

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    // variant를 선택 상자로 변경
    variant: {
      control: 'select',
      options: [
        '400-12', '400-14', '400-16', '400-18', '400-24',
        '700-14', '700-16', '700-24', '700-32', '900-48', '900-64'
      ], 
      description: 'Font Weight - Font Size 조합',
    },
    // align 컨트롤 (이번에 추가된 기능 테스트)
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
    },
    // as 컨트롤 (태그 변경 테스트)
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'a'],
    },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: '400-16',
    align: 'left',
  },
};

// 중앙 정렬 테스트 (요청하신 기능)
export const CenterAligned: Story = {
  args: {
    children: '이 텍스트는 중앙 정렬됩니다.',
    variant: '700-24',
    align: 'center',
    style: { 
      border: '1px dashed #ddd', 
      padding: '10px', 
      width: '100%' 
    },
  },
};

// 링크 태그 테스트 (a 태그)
export const Link: Story = {
  args: {
    as: 'a',
    href: 'https://google.com',
    target: '_blank',
    children: 'Google 바로가기 (새창)',
    variant: '400-16',
    color: '#2563EB', // blue-600
    style: { textDecoration: 'underline', cursor: 'pointer' },
  },
};