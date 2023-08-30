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

## JavaScript API

内部処理用の関数は省略しています。

### ajiSetFillColor(color)

`ajiFillRect` などの関数で使用する塗りつぶし色を指定します。

```javascript
ajiSetFillColor("red");
ajiSetFillColor("#114514");
```

### ajiSetStrokeColor(color)

`ajiStrokeRect` などの関数で使用する線色を指定します。

```javascript
ajiSetStrokeColor("red");
ajiSetStrokeColor("#114514");
```

### ajiSetLineCap(cap)

`ajiStrokeRect` などの関数で使用する線端の形状を指定します。
`"butt"` でラインキャップ無し、`"round"` で丸いラインキャップ、`"square"` で四角いラインキャップです。

### ajiSetLineWidth(width)

`ajiStrokeRect` などの関数で使用する線の太さを指定します。

```javascript
ajiSetLineWidth(4);
```

### ajiSetFont(font)

`ajiDrawText` などの文字描画関数で使用するフォントを指定します。

#### 例

```javascript
ajiSetFont("18px sans-serif");
```

### ajiFillRect(x, y, w, h)

塗りつぶしの四角形を描画します。

#### 引数

`x` : 開始 X 座標  
`y` : 開始 Y 座標  
`w` : 幅  
`h` : 高さ

### ajiStrokeRect(x, y, w, h)

枠線の四角形を描画します。塗りつぶし処理は行いません。

#### 引数

`x` : 開始 X 座標  
`y` : 開始 Y 座標  
`w` : 幅  
`h` : 高さ

### ajiFillCircle(x, y, w, h) {

塗りつぶしの円形を描画します。

#### 引数

`x` : 開始 X 座標  
`y` : 開始 Y 座標  
`w` : 幅  
`h` : 高さ

### ajiStrokeCircle(x, y, w, h)

枠線の円形を描画します。塗りつぶし処理は行いません。

#### 引数

`x` : 開始 X 座標  
`y` : 開始 Y 座標  
`w` : 幅  
`h` : 高さ

### ajiLine(x1, y1, x2, y2)

`x1`, `y1` から `x2`, `y2` まで直線を引きます。

### ajiDrawText(text, x, y)

文字列 `text` を座標 `x`, `y` に描画します。

### ajiDrawAlignText(text, x, y, w, align)

文字列 `text` を座標 `x`, `y` に描画します。  
`align` には中央揃えの場合 `"center"`, 右揃えの場合 `"right"` を指定します。  
`w` には文字揃えの基準となる横幅を入れます。

### ajiSetBG(id, src)

`id` 番の BG 面にデータ ID: `src` の画像を格納します。

### ajiDrawBG(id, x, y)

`id` 番の BG 面を座標 `x`, `y` に描画します。

### ajiAddSprite(id, src)

データ ID: `src` の画像をスプライト ID: `id` として登録します。

### ajiDeleteSprite(id)

スプライト ID: `id` を削除します。(画像データ自体は消えません)

### ajiDrawSprite(id, x, y)

スプライト ID: `id` を座標 `x`, `y` に描画します。

### ajiDrawSpriteZoom(id, x, y, w, h)

スプライト ID: `id` を座標 `x`, `y` に描画します。  
サイズは `w` x `h` px に拡大・縮小されます。

### ajiAddAudio(id, src)

データ ID: `src` の音声をオーディオ ID: `id` として登録します。

### ajiDeleteAudio(id)

オーディオ ID: `id` を削除します。(音声データ自体は消えません)

### ajiPlayAudio(id)

オーディオ ID: `id` を再生します。

### ajiStopAudio(id)

オーディオ ID: `id` を停止します。

### ajiLoadVideo(src)

データ ID `src` の動画を読み込みます。

### ajiPlayVideo()

動画を再生します。

### ajiPauseVideo()

動画を一時停止します。

### ajiGetVideoDuration()

動画の長さ (秒) を返します。

### ajiGetVideoCurrentTime()

動画の現在の再生位置 (秒) を返します。

### ajiSetVideoCurrentTime(time)

動画の再生位置 (秒) を `time` に設定します。

### ajiMouseX()

マウス X 座標を返します。

### ajiMouseY()

マウス Y 座標を返します。

### ajiClick()

マウスがクリックされた瞬間のみ `true` を返します。  
長押しには対応していません。

### ajiGetYear()

現在の年を返します。

### ajiGetMonth()

現在の月を 1 ～ 12 の範囲で返します。

### ajiGetDate()

現在の日を 1 ～ 31 の範囲で返します。

### ajiGetDay()

現在の曜日を 0 ～ 6 の範囲で返します。日曜日が 0 です。

### ajiGetHours()

現在の時を 0 ～ 23 の範囲で返します。

### ajiGetMinutes()

現在の分を 0 ～ 59 の範囲で返します。

### ajiGetSeconds() {

現在の秒を 0 ～ 59 の範囲で返します。

### ajiGetDateString()

現在の日付を `2023-03-10` のようにフォーマットして返します。

### ajiGetTimeString()

現在の時刻を `08:40:19` のようにフォーマットして返します。
