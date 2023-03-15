import clsx from 'clsx';
import { BaseProps } from 'src/types/BaseProps';

export type MainProps = BaseProps;

export const Main = ({ children }: MainProps) => {
  return (
    <main className={clsx('h-[calc(100%_-_70px-_32px)]', 'overflow-y-scroll')}>
      {children}
    </main>
  );
};
