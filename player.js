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
let ajiBG = [new Image(), new Image(), new Image(), new Image()];
let ajiSprite = [];
let ajiMouse = { x: 0, y: 0 };

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
  ajiCanvas.addEventListener("mousedown", ajiMouseDown, false);
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

function ajiGetData(id) {
  for (let i = 0; i < ajiData.length; i++) {
    if (ajiData[i].id == id) {
      return ajiData[i].data;
    }
  }
}

function ajiExistData(id) {
  for (let i = 0; i < ajiData.length; i++) {
    if (ajiData[i].id == id) {
      return true;
    }
  }
  return false;
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

async function ajiSetBG(id, src) {
  if (ajiExistData(src) == true) {
    await new Promise((resolve, reject) => {
      ajiBG[id].onload = () => resolve(ajiBG[id]);
      ajiBG[id].onerror = (e) => reject(e);
      ajiBG[id].src = ajiGetData(src);
    });
  }
}

function ajiDrawBG(id, x, y) {
  ajiContext.drawImage(ajiBG[id], x, y, AJIPACK_WIDTH, AJIPACK_HEIGHT);
}

async function ajiAddSprite(id, src) {
  if (ajiExistSprite(id) == false) {
    ajiSprite.push({
      id: id,
      image: new Image(),
    });
    await ajiSetSprite(id, src);
  }
}

async function ajiSetSprite(id, src) {
  for (let i = 0; i < ajiSprite.length; i++) {
    if (ajiSprite[i].id == id && ajiExistData(src) == true) {
      await new Promise((resolve, reject) => {
        ajiSprite[i].image.onload = () => resolve(ajiSprite[i].image);
        ajiSprite[i].image.onerror = (e) => reject(e);
        ajiSprite[i].image.src = ajiGetData(src);
      });
      break;
    }
  }
}

function ajiDeleteSprite(id) {
  for (let i = 0; i < ajiSprite.length; i++) {
    if (ajiSprite[i].id == id) {
      ajiSprite.splice(i, 1);
      break;
    }
  }
}

function ajiExistSprite(id) {
  for (let i = 0; i < ajiSprite.length; i++) {
    if (ajiSprite[i].id == id) {
      return true;
    }
  }
  return false;
}

function ajiDrawSprite(id, x, y) {
  for (let i = 0; i < ajiSprite.length; i++) {
    if (ajiSprite[i].id == id) {
      ajiContext.drawImage(ajiSprite[i].image, x, y);
      break;
    }
  }
}

function ajiMouseX() {
  return ajiMouse.x;
}

function ajiMouseY() {
  return ajiMouse.y;
}

function ajiMouseDown(e) {
  const rect = e.target.getBoundingClientRect();
  ajiMouse.x = e.clientX - rect.left;
  ajiMouse.y = e.clientY - rect.top;
}
