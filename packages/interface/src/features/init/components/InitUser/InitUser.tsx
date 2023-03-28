import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useUserController } from 'src/hooks/useUser';
import { isInitUserState } from 'src/stores/isInitUserState';
import { BaseProps } from 'src/types/BaseProps';

export type InitUserProps = BaseProps;

export const InitUser = ({ children }: InitUserProps) => {
  const userController = useUserController();
  const isInitUser = useRecoilValue(isInitUserState);

  const init = async () => {
    if (isInitUser) return;
    try {
      await userController.init();
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

  useEffect(() => {
    init();
  }, []);

  return <>{children}</>;
};
