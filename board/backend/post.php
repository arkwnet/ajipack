<?php
$filename = "./db/board.db";
if (file_exists($filename) == false) {
  $status = "false";
} else {
  $post = json_decode(file_get_contents("php://input"), true);
  $uid = md5(uniqid(rand(), 1));
  file_put_contents("./files/" . $uid . ".js", $post["params"]["file"]);
  $html = "<script type=\"text/javascript\" src=\"" . $uid . ".js\"></script><script type=\"text/javascript\" src=\"player.js\"></script>";
  file_put_contents("./files/" . $uid . ".html", $html);
  $db = new SQLite3($filename);
  $db -> exec("insert into log values ('" . $uid . "', '" . $post["params"]["name"] . "', '" . $post["params"]["message"] . "', " . time() . ")");
  $db -> close();
  $status = "true";
}
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-Type: application/json; charset=utf-8");
print("{\"status\": " . $status . "}");
