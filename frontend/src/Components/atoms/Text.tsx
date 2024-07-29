import React from 'react';

type TextProps = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  color?: string;
  weight?: 'normal' | 'bold' | 'lighter' | 'bolder';
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  [key: string]: any; // 추가 props를 위한 인덱스 시그니처
};

function Text({
  children,
  size = 'medium',
  color = 'black',
  weight = 'normal',
  as: Tag = 'span',
  className = '',
  ...props
}: TextProps) {
  const styles = {
    fontSize: getSizeValue(size),
    color,
    fontWeight: weight,
  };

  return (
    <Tag className={`text ${className}`} style={styles} {...props}>
      {children}
    </Tag>
  );
}

function getSizeValue(size: TextProps['size']): string {
  const sizes = {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
  };
  return sizes[size as keyof typeof sizes] || size as string;
}

export default Text;