# my-todo-app

シンプルで使いやすいTODOアプリケーション。

## 機能要件

- Webブラウザで動作するTODOアプリケーション
- TODOの作成、編集、削除、完了機能
- ブラウザ上でのデータ永続化（LocalStorage利用）
- モダンでレスポンシブなUI

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactベースのフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全な開発
- ESLint - コード品質の維持
- Jest - ユニットテスト
- React Testing Library - コンポーネントテスト

## 開発方針

- 型推論を活用した安全なコーディング
- ESLintによる一貫したコードスタイルの維持
- 自動テストによる品質担保
- 適切な粒度での継続的なコミット

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# テストの実行
npm test

# リントチェック
npm run lint
```

## ライセンス

MIT