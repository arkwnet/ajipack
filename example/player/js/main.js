let x;
let a = 0;

function setup() {
  x = 330;
}

function loop() {
  ajiContext.fillStyle = "#666666";
  ajiContext.fillRect(0, 0, AJIPACK_WIDTH, AJIPACK_HEIGHT);
  ajiContext.font = "20pt sans-serif";
  ajiContext.fillStyle = "#fff";
  ajiDrawText("Hello, world!", x, 120);
  ajiDrawText(a, 10, 30);
  x -= 3;
  a++;
  if (x < -300) {
    x = 330;
  }
}
