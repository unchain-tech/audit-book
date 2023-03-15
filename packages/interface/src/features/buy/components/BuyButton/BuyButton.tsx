import clsx from "clsx";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "src/components/elements/Button";
import { Spinner } from "src/components/elements/Spinner";
import { PRICE } from "src/const";
import { useUserState } from "src/hooks/useUser";
import { isInitUserState } from "src/stores/isInitUserState";
import { BaseProps } from "src/types/BaseProps";

export type BuyButtonProps = BaseProps;

export const BuyButton = ({ className }: BuyButtonProps) => {
  const isInitUser = useRecoilValue(isInitUserState);
  const [user, userController] = useUserState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (user.id === "") return;
    setIsLoading(true);
    try {
      await userController.buy(user.id);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
        console.error(e.message);
        setIsLoading(false);
        return;
      }
      alert(e);
      console.error(e);
    }
    setIsLoading(false);
  };

  if (!isInitUser || isLoading)
    return (
      <Button
        disable
        className={clsx(
          "flex",
          "justify-center",
          "text-white",
          "w-[300px]",
          className
        )}
      >
        <Spinner className={clsx("w-[20px]", "h-[20px]", "border-[2px]")} />
      </Button>
    );
  return (
    <Button
      disable={user.isOwnAuditBook}
      className={clsx("text-white", className)}
      onClick={handleClick}
    >
      {user.isOwnAuditBook ? "購入済み" : `${PRICE} CHAI で Audit Book を購入`}
    </Button>
  );
};
