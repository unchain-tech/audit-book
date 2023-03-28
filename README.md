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
