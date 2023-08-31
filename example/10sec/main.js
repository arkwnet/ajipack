let startTime = null;
let record = 0.0;
let diff = 0;
let count = 0;

function loop() {
  ajiSetFillColor("#ffffcc");
  ajiFillRect(0, 0, AJIPACK_WIDTH, AJIPACK_HEIGHT);
  ajiSetFillColor("black");
  if (count == 0) {
    ajiSetFont("60px sans-serif");
    ajiDrawAlignText(record, 0, 100, AJIPACK_WIDTH, "center");
    ajiSetFont("24px sans-serif");
    ajiDrawAlignText(
      "目標との差: " + diff + "秒",
      0,
      180,
      AJIPACK_WIDTH,
      "center"
    );
  } else if (count == 1) {
    ajiSetFont("60px sans-serif");
    ajiDrawAlignText("計測中", 0, 100, AJIPACK_WIDTH, "center");
  }
  if (ajiClick()) {
    if (count == 0) {
      startTime = Date.now();
    } else if (count == 1) {
      record = (Date.now() - startTime) / 1000;
      diff = Math.abs(record - 10);
    }
    count++;
    if (count >= 2) {
      count = 0;
    }
  }
}
