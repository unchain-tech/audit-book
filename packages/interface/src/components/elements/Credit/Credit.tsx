import clsx from "clsx";
import { BaseProps } from "src/types/BaseProps";

export type CreditProps = BaseProps;

/**
 * クレジット
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 */
export const Credit = ({ className }: CreditProps) => {
  return (
    <div
      className={clsx("text-[1px]", "text-gray-300", "text-center", className)}
    >
      {'"Faun Book"'} {" ("}
      <a href="https://skfb.ly/6tCFG">https://skfb.ly/6tCFG</a>
      {")"} by hatsaru is licensed under Creative Commons Attribution
      {" ("}
      <a href="http://creativecommons.org/licenses/by/4.0/">
        http://creativecommons.org/licenses/by/4.0/
      </a>
      {")"}.
    </div>
  );
};
