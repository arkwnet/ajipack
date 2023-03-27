/*
Ajipack Player
Copyright (c) 2023 Sora Arakawa
Licensed under the MIT License
*/

const AJIPACK_WIDTH = 320;
const AJIPACK_HEIGHT = 240;
const AJIPACK_FPS = 33.0;
let ajiDrawTime = Date.now();
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
  const ajiNowTime = Date.now();
  if (ajiNowTime - ajiDrawTime >= 1000 / AJIPACK_FPS) {
    ajiDrawTime = ajiNowTime;
    if (typeof loop == "function") {
      loop();
    }
  }
  requestAnimationFrame(ajiMain);
}

function ajiSetFillColor(color) {
  ajiContext.fillStyle = color;
}

function ajiSetFont(font) {
  ajiContext.font = font;
}

function ajiFillRect(x, y, w, h) {
  ajiContext.fillRect(x, y, w, h);
}

function ajiDrawText(text, x, y) {
  ajiContext.fillText(text, x, y);
}
