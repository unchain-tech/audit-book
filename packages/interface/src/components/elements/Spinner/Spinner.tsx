import clsx from 'clsx';
import { BaseProps } from 'src/types/BaseProps';

export type SpinnerProps = BaseProps;

/**
 * ローディング中にくるくる回るやつ
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 */
export const Spinner = ({ className }: SpinnerProps) => {
    return (
        <div
            className={clsx(
                'animate-spin',
                'rounded-full',
                'border-t-transparent',
                className
            )}
        ></div>
    );
};
