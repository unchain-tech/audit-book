import clsx from "clsx";
import { BaseProps } from "src/types/BaseProps";

export type TitleProps = BaseProps;

/**
 * タイトル
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 */
export const Title = ({ className }: TitleProps) => {
  return (
    <div className={clsx("text-4xl", "font-bold", className)}>
      Audit Bookとは
    </div>
  );
};
