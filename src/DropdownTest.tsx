/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import Dropdown, { OptionItem } from './components/Dropdown';
import Text from './components/Text';
import Button from './components/Button';

// -------------------------------------------------------------------------
// 스타일 정의 (Layout)
// -------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  max-width: 100%;
  margin: 0 auto;
  gap: 50px;
  min-height: 150vh;
  background-color: #F9FAFB;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 30px;
  }
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const SectionTitleWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.coolgray[900]};
`;

const CodeBox = styled.div`
  background-color: ${({ theme }) => theme.colors.coolgray[900]};
  border-radius: 8px;
  padding: 30px;
  overflow-x: auto;
  font-family: 'Menlo', 'Monaco', monospace;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Pre = styled.pre`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  line-height: 1.6;
`;

const PropList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const PropItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.coolgray[200]};

  &:first-of-type {
    border-top: 1px dashed ${({ theme }) => theme.colors.coolgray[200]};
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const PropBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.indigo[50]};
  color: ${({ theme }) => theme.colors.indigo[600]};
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 700;
  font-family: monospace;
  font-size: 14px;
  min-width: 120px;
`;

const DemoArea = styled.div`
  position: relative;
  height: 250px; /* 드롭다운이 펼쳐질 공간 확보 */
  border: 1px dashed ${({ theme }) => theme.colors.coolgray[200]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.coolgray[50]};
`;

// Demo용 Wrapper (Trigger + Dropdown 관계 설정)
const RelativeWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export default function DropdownTest() {
    const theme = useTheme();

    // Demo States
    // Selection States (Optional, visual feedback)
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const SectionHeader = ({ title }: { title: string }) => (
        <SectionTitleWrapper>
            <Text
                as="h2"
                variant="700-24"
                color={theme.colors.coolgray[900]}
                style={{ wordBreak: 'keep-all' }}
            >
                {title}
            </Text>
        </SectionTitleWrapper>
    );

    return (
        <Container>
            <Header>
                <Text as="h1" variant="900-48" style={{ marginBottom: '10px', fontSize: 'clamp(32px, 5vw, 48px)' }}>
                    Dropdown Component
                </Text>
                <Text variant="400-18" color={theme.colors.coolgray[500]}>
                    Floating menus and option lists.
                </Text>
            </Header>

            {/* 1. Quick Start & Props */}
            <Section>
                <SectionHeader title="1. Quick Start & Props" />
                <Text variant="400-14" color={theme.colors.coolgray[600]}>
                    Dropdown은 절대 위치(absolute)로 렌더링되므로, <b>position: relative</b>를 가진 부모 요소가 필요합니다.
                </Text>
                <CodeBox>
                    <Pre>
                        {`import Dropdown, { OptionItem } from './components/Dropdown';

// 부모 요소에 position: relative 필요
<div style={{ position: 'relative' }}>

  {/* Trigger Element (e.g., Button, Icon) */}
  <button onClick={toggle}>Menu</button>

  {/* 방법 1: Options 배열 사용 (데이터 기반) */}
  <Dropdown
    isOpen={isOpen}
    width="200px"
    options={[
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ]}
    onSelect={(value) => console.log('Selected:', value)}
  />

  {/* 방법 2: Children 사용 (커스텀 구성) */}
  <Dropdown
    isOpen={isOpen}
    width="200px"
  >
    <OptionItem onClick={() => handleSelect('1')} isSelected={selected === '1'}>
      <Text>Option 1</Text>
    </OptionItem>
    <OptionItem onClick={() => handleSelect('2')} isSelected={selected === '2'}>
      <Text>Option 2</Text>
    </OptionItem>
  </Dropdown>
</div>`}
                    </Pre>
                </CodeBox>

                <div>
                    <Text as="h3" variant="700-16" style={{ marginBottom: '16px', marginTop: '20px' }}>
                        Dropdown Props
                    </Text>
                    <PropList>
                        {[
                            { name: 'isOpen', desc: '드롭다운 표시 여부 (boolean)' },
                            { name: 'width', desc: '드롭다운 너비 (예: "200px", "100%")' },
                            { name: 'options', desc: '데이터 기반 렌더링을 위한 옵션 배열 (선택 사항)' },
                            { name: 'onSelect', desc: 'options 사용 시 선택 이벤트 핸들러' },
                            { name: 'selectedValue', desc: 'options 사용 시 현재 선택된 값' },
                            { name: 'verticalPos', desc: "'top' | 'bottom' (기본값: 'bottom')" },
                            { name: 'alignPos', desc: "'left' | 'right' (기본값: 'left')" },
                            { name: 'maxHeight', desc: '최대 높이 (내부 스크롤 생성, 기본값: 200)' },
                            { name: 'mode', desc: "'light' | 'dark' | 'transparent'" },
                            { name: 'disabled', desc: '비활성화 여부' },
                        ].map((prop) => (
                            <PropItem key={prop.name}>
                                <PropBadge>{prop.name}</PropBadge>
                                <Text variant="400-14" color={theme.colors.coolgray[700]}>{prop.desc}</Text>
                            </PropItem>
                        ))}
                    </PropList>

                    <Text as="h3" variant="700-16" style={{ marginBottom: '16px', marginTop: '40px' }}>
                        OptionItem Props (Children 방식 사용 시)
                    </Text>
                    <PropList>
                        {[
                            { name: 'isSelected', desc: '선택된 상태 여부 (스타일 변경)' },
                            { name: 'mode', desc: "Dropdown과 동일한 mode 전달 필요" },
                            { name: 'onClick', desc: '클릭 이벤트 핸들러' },
                        ].map((prop) => (
                            <PropItem key={prop.name}>
                                <PropBadge>{prop.name}</PropBadge>
                                <Text variant="400-14" color={theme.colors.coolgray[700]}>{prop.desc}</Text>
                            </PropItem>
                        ))}
                    </PropList>
                </div>
            </Section>

            {/* 2. Basic Usage */}
            <Section>
                <SectionHeader title="2. Basic Usage" />
                <DemoArea>
                    <Button
                        color="indigo"
                        variant="filled"
                        mode="light"
                        size="medium"
                        width="200px"
                        justifyContent='space-between'
                        disabled={false}
                        isLoading={false}
                        rightIcon={<ChevronDown />}
                        dropdownOptions={[
                            { label: 'My Profile', value: 'profile' },
                            { label: 'Account Settings', value: 'settings' },
                            { label: 'Notifications', value: 'notifications' },
                            { label: 'Privacy Policy', value: 'privacy' },
                            { label: 'Help & Support', value: 'help' },
                            { label: 'Sign Out', value: 'logout', onClick: () => alert('Signed out!') },
                        ]}
                        menuWidth="200px"
                        maxHeight={150}
                        onDropdownSelect={(value) => {
                            console.log('Selected Value:', value);
                            setSelectedItem(value);
                        }}
                    >
                        Menu
                    </Button>
                </DemoArea>
            </Section>


            {/* 3. Positioning */}
            <Section>
                <SectionHeader title="3. Positioning" />

                <DemoArea style={{ gap: '20px', flexWrap: 'wrap' }}>
                    {/* Bottom Left */}
                    <Button
                        rightIcon={<ChevronDown />}
                        dropdownOptions={[
                            { label: 'Menu Item 1', value: '1' },
                            { label: 'Menu Item 2', value: '2' },
                        ]}
                        menuWidth="200px"
                        dropdownProps={{ verticalPos: 'bottom', alignPos: 'left' }}
                    >
                        Bottom Left
                    </Button>

                    {/* Bottom Right */}
                    <Button
                        rightIcon={<ChevronDown />}
                        dropdownOptions={[
                            { label: 'Menu Item 1', value: '1' },
                            { label: 'Menu Item 2', value: '2' },
                        ]}
                        menuWidth="200px"
                        dropdownProps={{ verticalPos: 'bottom', alignPos: 'right' }}
                    >
                        Bottom Right
                    </Button>

                    {/* Top Left */}
                    <Button
                        rightIcon={<ChevronDown />}
                        dropdownOptions={[
                            { label: 'Menu Item 1', value: '1' },
                            { label: 'Menu Item 2', value: '2' },
                        ]}
                        menuWidth="200px"
                        dropdownProps={{ verticalPos: 'top', alignPos: 'left' }}
                    >
                        Top Left
                    </Button>

                    {/* Top Right */}
                    <Button
                        rightIcon={<ChevronDown />}
                        dropdownOptions={[
                            { label: 'Menu Item 1', value: '1' },
                            { label: 'Menu Item 2', value: '2' },
                        ]}
                        menuWidth="200px"
                        dropdownProps={{ verticalPos: 'top', alignPos: 'right' }}
                    >
                        Top Right
                    </Button>
                </DemoArea>
            </Section>

            {/* 4. Modes */}
            <Section>
                <SectionHeader title="4. Modes (Light / Dark / Transparent)" />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
                    {/* Light */}
                    <div style={{ padding: 20, border: '1px dashed #B8BFC6', borderRadius: 8, textAlign: 'center' }}>
                        <Text variant="700-16" style={{ marginBottom: 10 }}>Light Mode</Text>
                        <Button
                            color="indigo"
                            variant="filled"
                            rightIcon={<ChevronDown />}
                            dropdownOptions={[
                                { label: 'Selected', value: '1' },
                                { label: 'Option', value: '2' },
                            ]}
                            menuWidth="150px"
                            menuMode="light"
                        >
                            Open Light
                        </Button>
                    </div>

                    {/* Dark */}
                    <div style={{ padding: 20, background: '#111827', border: '1px dashed #111827', borderRadius: 8, textAlign: 'center' }}>
                        <Text variant="700-16" color="white" style={{ marginBottom: 10 }}>Dark Mode</Text>
                        <Button
                            color="gray"
                            variant="filled"
                            rightIcon={<ChevronDown />}
                            dropdownOptions={[
                                { label: 'Selected', value: '1' },
                                { label: 'Option', value: '2' },
                            ]}
                            menuWidth="150px"
                            menuMode="dark"
                        >
                            Open Dark
                        </Button>
                    </div>

                    {/* Transparent */}
                    <div style={{ padding: 20, background: '#F4F6F9', border: '1px dashed #B8BFC6', borderRadius: 8, textAlign: 'center' }}>
                        <Text variant="700-16" style={{ marginBottom: 10 }}>Transparent Mode</Text>
                        <Button
                            variant="transparent"
                            rightIcon={<ChevronDown />}
                            dropdownOptions={[
                                { label: 'Selected', value: '1' },
                                { label: 'Option', value: '2' },
                            ]}
                            menuWidth="150px"
                            menuMode="transparent"
                        >
                            Open Trans
                        </Button>
                    </div>
                </div>
            </Section>

        </Container >
    );
}
