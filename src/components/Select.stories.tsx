/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { css } from '@emotion/react';
import Select, { OptionType } from './Select';

// ----------------------------------------------------------------------
// 1. 공통 데이터 & 헬퍼
// ----------------------------------------------------------------------

const OPTIONS: OptionType[] = [
  { value: 'react', label: 'React (UI 라이브러리)' },
  { value: 'vue', label: 'Vue (프레임워크)' },
  { value: 'angular', label: 'Angular (플랫폼)' },
  { value: 'svelte', label: 'Svelte (컴파일러)' },
  { value: 'next', label: 'Next.js (풀스택)' },
];

const LONG_OPTIONS = Array.from({ length: 20 }, (_, i) => ({
  label: `옵션 아이템 ${i + 1}`,
  value: `option-${i + 1}`,
}));

// 그리드 레이아웃 스타일
const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 800px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const caseTitleStyle = css`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  color: inherit;
  opacity: 0.8;
`;

// 상태 관리를 위한 내부 래퍼 컴포넌트
const StatefulSelect = (props: any) => {
  const [value, setValue] = useState(props.value || '');
  return (
    <Select 
      {...props} 
      value={value} 
      onChange={(v) => {
        setValue(v);
        props.onChange?.(v);
      }} 
    />
  );
};

// ----------------------------------------------------------------------
// 2. 메타 설정
// ----------------------------------------------------------------------

const meta = {
  // 🔴 기존: title: 'Design System/Select',
  // 🟢 수정: Components 그룹으로 이동
  title: 'Components/Select', 
  
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Light, Dark, Transparent 모드와 자동 위치 조정을 지원하는 Select 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['light', 'dark', 'transparent'],
      description: '테마 모드 설정',
    },
    disabled: { control: 'boolean' },
    width: { control: 'text' },
    maxHeight: { control: 'number' },
  },
  args: {
    value: '', 
    options: OPTIONS,
    label: '기술 스택 선택',
    width: '100%',
    mode: 'light',
    onChange: () => {},
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// ----------------------------------------------------------------------
// 3. 스토리 정의
// ----------------------------------------------------------------------

// [Story 1] Playground
export const Playground: Story = {
  render: (args) => <StatefulSelect {...args} />,
};

// [Story 2] Light Mode 모아보기
export const LightModeGroup: Story = {
  render: () => (
    <div css={gridStyle}>
      {/* 1. Default */}
      <div>
        <div css={caseTitleStyle}>Default</div>
        <StatefulSelect label="선택해주세요" options={OPTIONS} mode="light" />
      </div>
      {/* 2. Selected */}
      <div>
        <div css={caseTitleStyle}>Selected</div>
        <StatefulSelect label="기술 스택" options={OPTIONS} value="react" mode="light" />
      </div>
      {/* 3. Disabled */}
      <div>
        <div css={caseTitleStyle}>Disabled</div>
        <StatefulSelect label="선택 불가" options={OPTIONS} disabled mode="light" />
      </div>
      {/* 4. Disabled with Value */}
      <div>
        <div css={caseTitleStyle}>Disabled (Value)</div>
        <StatefulSelect label="값 있음" options={OPTIONS} value="vue" disabled mode="light" />
      </div>
    </div>
  ),
};

// [Story 3] Dark Mode 모아보기
export const DarkModeGroup: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div 
      css={[gridStyle, css`
        background-color: #222529; /* coolgray 800 */
        padding: 40px;
        border-radius: 12px;
        color: white;
      `]}
    >
      <div>
        <div css={caseTitleStyle}>Default</div>
        <StatefulSelect label="선택해주세요" options={OPTIONS} mode="dark" />
      </div>
      <div>
        <div css={caseTitleStyle}>Selected</div>
        <StatefulSelect label="기술 스택" options={OPTIONS} value="react" mode="dark" />
      </div>
      <div>
        <div css={caseTitleStyle}>Disabled</div>
        <StatefulSelect label="선택 불가" options={OPTIONS} disabled mode="dark" />
      </div>
      <div>
        <div css={caseTitleStyle}>Disabled (Value)</div>
        <StatefulSelect label="값 있음" options={OPTIONS} value="vue" disabled mode="dark" />
      </div>
    </div>
  ),
};

// [Story 4] Transparent Mode 모아보기
export const TransparentModeGroup: Story = {
  render: () => (
    <div 
      css={[gridStyle, css`
        background-color: #F5F6F7; /* coolgray 50 */
        padding: 40px;
        border-radius: 12px;
      `]}
    >
      <div>
        <div css={caseTitleStyle}>Default</div>
        <StatefulSelect label="선택해주세요" options={OPTIONS} mode="transparent" />
      </div>
      <div>
        <div css={caseTitleStyle}>Selected</div>
        <StatefulSelect label="기술 스택" options={OPTIONS} value="react" mode="transparent" />
      </div>
      <div>
        <div css={caseTitleStyle}>Disabled</div>
        <StatefulSelect label="선택 불가" options={OPTIONS} disabled mode="transparent" />
      </div>
      <div>
        <div css={caseTitleStyle}>Disabled (Value)</div>
        <StatefulSelect label="값 있음" options={OPTIONS} value="vue" disabled mode="transparent" />
      </div>
    </div>
  ),
};

// [Story 5] Positioning Test
export const PositioningTest: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ 
        height: '150vh', 
        position: 'relative', 
        background: '#f0f0f0',
        padding: '20px'
      }}>
        <div style={{ 
          position: 'absolute', 
          bottom: '50px', 
          right: '50px',
          width: '300px',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{marginBottom: '10px'}}>Corner Positioning Test</h3>
          <p style={{marginBottom: '10px', fontSize: '12px', color: '#666'}}>
            화면 오른쪽 아래 구석에서 위로 열리는지 확인하세요.
          </p>
          <Select 
            label="Corner Case" 
            options={LONG_OPTIONS} 
            value={val} 
            onChange={setVal} 
            width="100%"
            menuWidth="300px"
          />
        </div>
      </div>
    );
  }
};