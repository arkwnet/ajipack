let x;
let a = 0;

function setup() {
  console.log("Hello, world!");
  x = 330;
}

function loop() {
  ajiContext.fillStyle = "#666666";
  ajiContext.fillRect(0, 0, AJIPACK_WIDTH, AJIPACK_HEIGHT);
  ajiContext.font = "20pt sans-serif";
  ajiContext.fillStyle = "#fff";
  ajiContext.fillText("Hello, world!", x, 120);
  ajiContext.fillText(a, 10, 30);
  x -= 3;
  a++;
  if (x < -300) {
    x = 330;
  }
}
