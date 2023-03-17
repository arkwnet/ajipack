let x;

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
  x--;
  if (x < -300) {
    x = 330;
  }
}
