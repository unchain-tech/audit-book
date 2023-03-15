import clsx from 'clsx';
import { BaseProps } from 'src/types/BaseProps';

export type UNCHAINProps = BaseProps;

export const UNCHAIN = ({ className }: UNCHAINProps) => {
    return (
        <a
            className={clsx('text-secondary', 'font-bold', className)}
            href="https://unchain.tech/"
        >
            UNCHAIN
        </a>
    );
};
