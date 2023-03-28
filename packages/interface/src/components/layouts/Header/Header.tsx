import clsx from 'clsx';
import { ConnectButton } from 'src/features/connect';
import { BaseProps } from 'src/types/BaseProps';

export type HeaderProps = BaseProps;

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={clsx(
        'bg-primary-200',
        'flex',
        'justify-between',
        'items-center',
        'h-[70px]',
        'text-white',
        className
      )}
    >
      <div className={clsx('ml-4', 'text-3xl', 'font-bold')}>Audit Book</div>
      <ConnectButton
        className={clsx('mr-4', 'truncate', 'w-[160px]', 'h-[40px]')}
      />
    </header>
  );
};
