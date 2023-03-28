import { useRecoilValue } from 'recoil';
import { ALREADY_OWNED_NFT } from 'src/const/message';
import { useUserValue } from 'src/hooks/useUser';
import { isInitUserState } from 'src/stores/isInitUserState';
import { BaseProps } from 'src/types/BaseProps';

export type RedirectIfOwnedNFTProps = BaseProps;

export const RedirectIfOwnedNFT = ({ children }: RedirectIfOwnedNFTProps) => {
  const user = useUserValue();
  const isInitUser = useRecoilValue(isInitUserState);

  if (isInitUser && user.isOwnAuditBook) {
    alert(ALREADY_OWNED_NFT);
    window.location.href = 'https://ninjaudit.com/';
  }
  return <>{children}</>;
};
