<?php
$db = new SQLite3("./db/board.db");
$result = $db -> query("SELECT id, name, message, timestamp FROM log ORDER BY timestamp DESC");
$ary = array();
while ($rows = $result -> fetchArray()) {
  unset($rows[0]);
  unset($rows[1]);
  unset($rows[2]);
  unset($rows[3]);
  array_push($ary, $rows);
}
header("Content-Type: application/json; charset=utf-8");
echo json_encode($ary, JSON_UNESCAPED_UNICODE);
$db -> close();
