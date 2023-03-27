let x;
let count = 0;
let second = null;
let fps = 0;

function setup() {
  x = 330;
}

function loop() {
  ajiSetFillColor("#666666");
  ajiFillRect(0, 0, AJIPACK_WIDTH, AJIPACK_HEIGHT);
  ajiContext.font = "20pt sans-serif";
  ajiSetFillColor("#fff");
  ajiDrawText("Hello, world!", x, 120);
  ajiDrawText(count, 10, 30);
  ajiDrawText("FPS: " + fps, 10, 60);
  x -= 3;
  count++;
  const date = new Date();
  if (second != date.getSeconds()) {
    fps = count;
    count = 0;
    second = date.getSeconds();
  }
  if (x < -300) {
    x = 330;
  }
}
