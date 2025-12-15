import type { Meta, StoryObj } from '@storybook/react';

// ⚠️ 중요: TextTest 컴포넌트가 위치한 경로를 정확히 맞춰야 합니다.
// 만약 TextTest.tsx가 src 폴더 바로 아래에 있다면 '../TextTest'가 맞습니다.
import TextTest from '../TextTest'; 

const meta: Meta<typeof TextTest> = {
  // 사이드바에 표시될 이름 (폴더/이름)
  title: 'Design System/Typography Guide', 
  component: TextTest,
  parameters: {
    // 화면에 꽉 차게 보여주기 옵션
    layout: 'fullscreen', 
  },
};

// ⭐️ 이 부분이 핵심입니다! (이게 없으면 에러 발생)
export default meta;

type Story = StoryObj<typeof TextTest>;

// 실제 렌더링될 스토리
export const Guide: Story = {};
