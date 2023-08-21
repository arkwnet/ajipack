<template>
  <div class="main">
    <h1 class="title">Ajipack Board</h1>
    <div class="post">
      <table>
        <tr>
          <th>名前</th>
          <td><input type="text" /></td>
        </tr>
        <tr>
          <th>メッセージ</th>
          <td><textarea></textarea></td>
        </tr>
        <tr>
          <th>ファイル</th>
          <td>
            <input type="file" />
            <div id="file_message">未選択</div>
          </td>
        </tr>
      </table>
      <button class="submit">投稿</button>
    </div>
    <div class="list">
      <div class="item">
        <p>
          名前: 名無し / 投稿日時: 2023/08/17 23:26:00<br />
          こんにちは! これはサンプル投稿です。
        </p>
        <p>
          <iframe src="http://localhost:3002/phpinfo.php"></iframe>
        </p>
      </div>
      <hr />
      <div class="item">
        <p>
          名前: 名無し / 投稿日時: 2023/08/17 23:26:00<br />
          こんにちは! これはサンプル投稿です。
        </p>
        <p>
          <iframe src="http://localhost:3002/phpinfo.php"></iframe>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  width: 1000px;
  margin: auto;
}

.main h1.title {
  margin-top: 24px;
  font-size: 28px;
  font-weight: bold;
  color: #757575;
}

.post {
  margin: 20px 0;
  padding: 20px;
  border: solid 2px #757575;
  border-radius: 10px;
}

.post th,
.post td {
  padding-bottom: 10px;
}

.post th {
  padding-right: 20px;
  text-align: left;
}

.post #file_message {
  margin-top: 5px;
  color: #757575;
}

.post .submit {
  margin: 10px 0;
  padding: 5px 15px;
}

.list {
  margin-top: 20px;
  margin-bottom: 40px;
}

.list hr {
  height: 1px;
  margin: 20px 0;
  background-color: #757575;
  border: 0;
}

.list p {
  margin-bottom: 10px;
}

.list iframe {
  width: 320px;
  height: 240px;
  border: solid 1px #757575;
}
</style>
