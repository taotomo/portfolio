# ポートフォリオサイト

上田友也の転職活動用ポートフォリオです。ビルド不要の静的サイト（HTML / CSS / JavaScript）で、フォルダをそのまま置けばどこでも公開できます。

## 構成

```
portfolio/
├── index.html          … 全セクション（ヒーロー / About / Skills / Works / Works 詳細 / Contact）
├── style.css           … 色・余白・文字サイズは :root の変数で管理
├── script.js           … フェードイン、詳細の開閉、ナビの現在位置、数字のカウントアップ
├── images/             … 各制作物のスクリーンショット（1600px幅の JPEG）
├── design-proposals/   … 検討したデザイン案 15 種（公開対象外）
├── old/                … 最初のライトテーマ版（比較用。公開対象外）
└── canvas-src/         … デザインキャンバスの元ファイル（公開対象外）
```

## デザイン

「Circuit」テーマ。背景に基板の配線が走り、光の粒が流れる。`body` に `data-motion="full"` を付けており、これが付いている間だけセクションの装飾アニメーション（見出しのタイプ表示、スキルチップの順次表示、カードの通電ライン）が動く。動きを止めたい場合は `index.html` の `data-motion="full"` を `data-motion="hero"` に変えるだけでよい（ヒーローの動きは残る）。

配色は `style.css` 冒頭の `--g`（アクセントの緑）を変えると全体に反映される。

## ローカルで確認する

```bash
cd portfolio
python3 -m http.server 8765
```

ブラウザで http://localhost:8765 を開きます（`index.html` をダブルクリックしても開けますが、Google Fonts の読み込みのためサーバー経由が確実です）。

## 公開する（GitHub Pages）

1. GitHub に `portfolio` という公開リポジトリを作り、このフォルダを push する
2. リポジトリの Settings → Pages → 「Build and deployment」で Source を **Deploy from a branch**、Branch を **main / (root)** にして Save
3. 数分後に `https://taotomo.github.io/portfolio/` で公開される

## 内容を更新するとき

- 制作物を追加する：`index.html` の Works のカードと Works 詳細の `article` を 1 組コピーして書き換え、`images/` にスクリーンショットを追加する
- 色を変える：`style.css` 冒頭の `--color-accent` を変える（本文とのコントラスト比 4.5:1 以上を保つこと）
- デモ URL を追加する：各カードの `card__links` に `<a href="...">デモ</a>` を足す
