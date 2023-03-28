import clsx from 'clsx';
import { BaseProps } from 'src/types/BaseProps';

const colors = {
  primary: clsx('bg-primary-300'),
  secondary: clsx('bg-secondary'),
  black: clsx('bg-myblack'),
};

export type ButtonProps = {
  disable?: boolean;
  variant?: 'primary' | 'secondary' | 'black';
  onClick?: () => void;
} & BaseProps;

export const Button = ({
  className,
  children,
  disable = false,
  variant = 'primary',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'px-[10px]',
        'py-[8px]',
        'font-bold',
        'rounded-full',
        'disabled:cursor-default',
        'select-none',
        colors[variant],
        className
      )}
      disabled={disable}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
