import React, { CSSProperties, MouseEvent, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonClasses = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95',
  {
    variants: {
      variant: {
        primary: 'focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 bg-transparent hover:bg-opacity-10 focus:ring-blue-500',
      },
      size: {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonClasses>;

interface ButtonProps extends ButtonVariants {
  text?: string;
  text_font_size?: string;
  text_font_family?: string;
  text_font_weight?: string;
  text_line_height?: string;
  text_text_align?: CSSProperties['textAlign'];
  text_color?: string;
  fill_background_color?: string;
  border_border_radius?: string;
  border_border?: string;
  layout_width?: string;
  padding?: string;
  position?: string;
  margin?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: unknown;
}

const Button = ({
  text = 'Hover to see what changes with us',
  text_font_size = '20',
  text_font_family = 'Satoshi',
  text_font_weight = '400',
  text_line_height = '27px',
  text_text_align = 'center',
  text_color = '#03030d',
  fill_background_color = '#dabf67',
  border_border_radius = '24px',
  border_border,
  layout_width,
  padding,
  position,
  margin,
  variant,
  size,
  disabled = false,
  className,
  children,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) => {
  const hasValidBorder = border_border && border_border.trim() !== '';
  const hasValidWidth = layout_width && layout_width.trim() !== '';
  const hasValidPadding = padding && padding.trim() !== '';
  const hasValidMargin = margin && margin.trim() !== '';
  const hasValidPosition = position && position.trim() !== '';

  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidMargin ? `m-[${margin}]` : '',
    hasValidPosition ? position : '',
    hasValidBorder ? `border-[${border_border}]` : '',
  ].filter(Boolean).join(' ');

  const buttonStyles: CSSProperties = {
    fontSize: `${text_font_size}px`,
    fontFamily: text_font_family,
    fontWeight: text_font_weight,
    lineHeight: text_line_height,
    textAlign: text_text_align,
    color: text_color,
    backgroundColor: fill_background_color,
    borderRadius: border_border_radius,
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(event);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={buttonStyles}
      className={twMerge(
        buttonClasses({ variant, size }),
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children || text}
    </button>
  );
};

export default Button;
