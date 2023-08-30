# Ajipack 規格書

Version 1 (2023/08/30 策定)

## ファイル構造

ファイルの拡張子は `.js` とし、1 ファイルに全てのリソース及びプログラムを格納する。  
以降、このファイルを「パッケージ」と称する。

パッケージには、データ配列 `ajiData` 、関数 `setup` 、関数 `loop` の 3 つが含まれる。  
いずれも、中身が無い場合は省略できる。  
また、関数は頭に `async` を付けることで `await` を用いた非同期処理に対応する。  
下にパッケージのテンプレートを示す。

```javascript
const ajiData = [];

function setup() {}

function loop() {}
```

## データ配列

画像・音声・動画などのリソースは全てデータ配列 `ajiData` で定義する。  
データ配列には、プログラムから呼び出す際に用いる ID `id` と base64 形式に変換したバイナリ `data` の組が格納される。
以下にデータ配列の例を示す。

```javascript
const ajiData = [
  {
    id: "image1",
    data: "data:image/png;base64,～",
  },
  {
    id: "image2",
    data: "data:image/jpeg;base64,～",
  },
];
```
