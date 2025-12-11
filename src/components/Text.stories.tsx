import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
  title: 'Design System/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // variant를 선택할 때 직접 입력하지 않고, 드롭다운으로 선택하게 설정
    variant: {
      control: 'select',
      options: [
        'displayLarge', 'displayMedium',
        'h1', 'h2',
        'bodyLarge', 'bodyMedium',
        'label', 'caption'
      ],
    },
    color: { control: 'color' },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Display (큰 제목)
export const DisplayLarge: Story = {
  args: {
    variant: 'displayLarge',
    children: 'Display Large (64px)',
  },
};

// 2. Heading (중간 제목)
export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1 (32px)',
  },
};

// 3. Body (본문)
export const BodyMedium: Story = {
  args: {
    variant: 'bodyMedium',
    children: '본문 텍스트입니다. Pretendard 폰트가 적용되어 가독성이 좋습니다.',
  },
};

// 4. Label & Caption
export const Label: Story = {
  args: {
    variant: 'label',
    children: '라벨 텍스트',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: '캡션 텍스트입니다.',
    color: '#848B93', // coolgray 300
  },
};