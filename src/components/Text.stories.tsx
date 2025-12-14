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
    // ✅ 올바른 타입으로 옵션 변경
    variant: {
      control: 'select',
      options: [
        '900-64', 
        '700-32', 
        '500-18', 
        '400-16', 
        '700-14', 
        '400-12', 
      ],
    },
    color: { control: 'color' },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DisplayLarge: Story = {
  args: {
    variant: '900-64', 
    children: 'Display Large',
  },
};

export const Heading1: Story = {
  args: {
    variant: '700-32', 
    children: 'Heading 1',
  },
};

export const BodyMedium: Story = {
  args: {
    variant: '400-16', 
    children: 'Body text example.',
  },
};

export const Label: Story = {
  args: {
    variant: '700-14', 
    children: 'Label',
  },
};

export const Caption: Story = {
  args: {
    variant: '400-12', 
    children: 'Caption text',
    color: '#848B93',
  },
};