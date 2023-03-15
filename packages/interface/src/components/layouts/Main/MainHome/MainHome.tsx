import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { Abstract } from 'src/components/elements/Abstract';
import { Book } from 'src/components/elements/Book';
import { Credit } from 'src/components/elements/Credit';
import { Title } from 'src/components/elements/Title';
import { BuyButton } from 'src/features/buy/components/BuyButton';
import { ConnectButton } from 'src/features/connect';
import { useUserValue } from 'src/hooks/useUser';
import { isInitUserState } from 'src/stores/isInitUserState';

export const MainHome = () => {
    const user = useUserValue();
    const isInitUser = useRecoilValue(isInitUserState);

    return (
        <div className={clsx('flex', 'flex-col', 'items-center')}>
            <Title className={clsx('m-8', 'text-center')} />
            <Abstract
                className={clsx('mx-[50px]', 'mb-[10px]', 'text-justify')}
            />
            <div className={clsx('relative', 'group')}>
                <Book className={clsx('w-[100%]', 'h-[300px]')} />
                <Credit
                    className={clsx(
                        'opacity-0 invisible',
                        'group-hover:visible opacity-100'
                    )}
                />
            </div>
            {!isInitUser || user.id === '' ? (
                <ConnectButton
                    className={clsx(
                        'm-[30px]',
                        'truncate',
                        'w-[160px]',
                        'h-[40px]'
                    )}
                />
            ) : (
                <BuyButton
                    className={clsx('m-[30px]', 'w-[300px]', 'h-[40px]')}
                />
            )}
        </div>
    );
};
