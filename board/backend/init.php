<?php
$filename = "./db/board.db";
if (file_exists($filename) == true) {
  die("既にAjipack Board データベースが存在します。");
}
$db = new SQLite3($filename);
$db -> exec("create table log (id varchar(13), name varchar(100), message varchar(200), timestamp int)");
$db -> close();
print("Ajipack Board データベースを作成しました。この画面を閉じてください。");
