/*
Ajipack Player
Copyright (c) 2023 Sora Arakawa
Licensed under the MIT License
*/

const AJIPACK_WIDTH = 320;
const AJIPACK_HEIGHT = 240;
const AIJPACK_FPS = 33.0;
let ajiCanvas, ajiContext;

window.onload = function () {
  ajiInit();
};

function ajiInit() {
  ajiCanvas = document.createElement("canvas");
  ajiCanvas.style.position = "fixed";
  ajiCanvas.style.left = "0";
  ajiCanvas.style.top = "0";
  ajiCanvas.width = 320;
  ajiCanvas.height = 240;
  ajiContext = ajiCanvas.getContext("2d");
  ajiContext.fillStyle = "#000";
  ajiContext.fillRect(0, 0, AJIPACK_WIDTH, AJIPACK_HEIGHT);
  document.body.appendChild(ajiCanvas);
  if (typeof setup == "function") {
    setup();
  }
  ajiMain();
}

function ajiMain() {
  setTimeout(function () {
    requestAnimationFrame(ajiMain);
    if (typeof loop == "function") {
      loop();
    }
  }, 1000 / AIJPACK_FPS);
}

function ajiDrawText(text, x, y) {
  ajiContext.fillText(text, x, y);
}
