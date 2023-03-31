# Audit-Book

## Deploy status

shop 👉 [![Netlify Status](https://api.netlify.com/api/v1/badges/6020cc52-cd5d-413c-aa1d-633c9216c549/deploy-status)](https://app.netlify.com/sites/audit-book/deploys) &emsp; book 👉 [![pages-build-deployment](https://github.com/unchain-tech/audit-book/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/unchain-tech/audit-book/actions/workflows/pages/pages-build-deployment)

## Workspaces

```
packages
   |__ book
   |__ contracts
   |__ interface
```

### book

- audit-book 中身

### contracts

- audit 教科書配布用のコントラクト (アクセス権を NFT 化する、など)

### interface

- audit-book 購入ページ

## コマンド

ローカルで audit-book の起動

```bash
npm run book:serve
```

その他各 workspace 配下`package.json`　を確認しながら以下で適宜コマンド実行

```
npm run [workspace_command] -w packages/[workspace_name]
```

## 追記・編集方法

1. ソースコードの入った[レポジトリ](https://github.com/unchain-tech/audit-book)を clone します。

   - `git clone git@github.com:unchain-tech/audit-book.git`

2. 編集用のブランチを切ります。

   - `git checkout -b YOUR_BRANCH_NAME origin/YOUR_BRANCH_NAME`

3. 本の編集をします。本の内容は `packages/book/book_src/**/*.md` です。
4. 追加したら保存し、コミットします。

   - `git add .`
   - `git commit -m "編集に関するコミットメッセージ"`

5. 本に反映させます。
   - `git push -u origin YOUR_BRANCH_NAME`
