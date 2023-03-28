# Audit-Book

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
yarn workspace [workspace_name] [workspace_command]

```
