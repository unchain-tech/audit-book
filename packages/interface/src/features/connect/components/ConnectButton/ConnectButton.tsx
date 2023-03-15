import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { Button } from 'src/components/elements/Button';
import { Spinner } from 'src/components/elements/Spinner';
import { useUserState } from 'src/hooks/useUser';
import { isInitUserState } from 'src/stores/isInitUserState';
import { BaseProps } from 'src/types/BaseProps';

export type ConnectButtonProps = BaseProps;

export const ConnectButton = ({ className }: ConnectButtonProps) => {
    const [user, userController] = useUserState();
    const isInitUser = useRecoilValue(isInitUserState);

    const handleClick = async () => {
        if (user.id !== '') return;
        try {
            await userController.login();
        } catch (e) {
            if (e instanceof Error) {
                alert(e.message);
                console.error(e.message);
                return;
            }
            alert(e);
            console.error(e);
        }
    };

    if (!isInitUser)
        return (
            <Button
                disable
                className={clsx(
                    'flex',
                    'justify-center',
                    'text-white',
                    className
                )}
            >
                <Spinner
                    className={clsx('w-[20px]', 'h-[20px]', 'border-[2px]')}
                />
            </Button>
        );
    return (
        <Button
            disable={user.id !== ''}
            className={clsx('text-white', className)}
            onClick={handleClick}
        >
            {user.id === '' ? 'ウォレットを接続' : user.id}
        </Button>
    );
};
