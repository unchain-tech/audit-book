import clsx from "clsx";
import { BaseProps } from "src/types/BaseProps";
import { UNCHAIN } from "../UNCHAIN";

export type AbstractProps = BaseProps;

/**
 * 概要
 * @component
 * @author keit
 * @param className 親要素から指定されたスタイル
 */
export const Abstract = ({ className }: AbstractProps) => {
  return (
    <div
      className={clsx(
        "text-sm",
        "bg-primary-50",
        "p-8",
        "rounded-2xl",
        className
      )}
    >
      <a className={clsx("text-4xl", "font-bold")}>A </a>
      <a className={clsx("font-bold")}>udit Book </a>
      とは、Solidity言語を使用したスマートコントラクトのセキュリティ監査に興味のある人々に向けて、Auditorになるためのガイドを提供する教科書です。
      Audit
      Bookには、Auditorになるために必要なスキル、知識、そしてセキュリティ監査のベストプラクティスが詳しく説明されています。また、実際の監査プロセスにおける留意点や、監査報告書の作成方法なども解説されています。
      さらに、Audit
      Bookは、著者たちが実際に経験したトラブルシューティングや問題解決に関するアドバイスやヒントも提供しています。これにより、読者はより実践的な知識を身につけることができます。
      全体として、Audit
      Bookは、スマートコントラクトのセキュリティ監査に興味のある人々にとって非常に有用なガイドとなっています。読者は、この教科書を通じて、スマートコントラクトのセキュリティに関する深い知識を身につけ、Auditorとしてのスキルを磨くことができます。
      {"("}この教科書は、 <UNCHAIN />{" "}
      というコミュニティの活動を通して作成されました。{")"}
    </div>
  );
};
