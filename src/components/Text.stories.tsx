/* src/components/Text.stories.tsx */
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
    variant: {
      control: 'select',
      options: ['displayLarge', 'displayMedium', 'h1', 'h2', 'bodyLarge', 'bodyMedium', 'caption'],
    },
    color: { control: 'color' },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof Text>;

/* ▼▼▼ 이 부분이 빠져서 에러가 난 것입니다! ▼▼▼ */
export default meta; 
/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Design System Text',
    variant: 'displayMedium',
    color: '#333',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Text variant="displayLarge">Display Large (64px)</Text>
      <Text variant="displayMedium">Display Medium (48px)</Text>
      <Text variant="h1">Heading 1 (32px)</Text>
      <Text variant="h2">Heading 2 (24px)</Text>
      <Text variant="bodyLarge">Body Large (18px)</Text>
      <Text variant="bodyMedium">Body Medium (16px)</Text>
      <Text variant="caption" color="#999">Caption (12px)</Text>
    </div>
  ),
};