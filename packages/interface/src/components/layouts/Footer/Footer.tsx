import clsx from "clsx";
import { UNCHAIN } from "src/components/elements/UNCHAIN";

export const Footer = () => {
  return (
    <footer
      className={clsx(
        "h-[32px]",
        "flex",
        "justify-center",
        "items-center",
        "text-sm",
        "bg-primary-50",
        "p-4"
      )}
    >
      © 2023
      <UNCHAIN className={clsx("mx-2")} />
      All Rights Reserved.
    </footer>
  );
};
