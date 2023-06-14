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
let ajiAudioContext = new AudioContext();
let ajiAudio = [];
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

function ajiGetSprite(id) {
  for (let i = 0; i < ajiSprite.length; i++) {
    if (ajiSprite[i].id == id) {
      return ajiSprite[i].image;
    }
  }
}

async function ajiSetSprite(id, src) {
  if (ajiExistSprite(id) == true && ajiExistData(src) == true) {
    const i = await ajiFindSpriteNumber(id);
    await new Promise((resolve, reject) => {
      ajiSprite[i].image.onload = () => resolve(ajiSprite[i].image);
      ajiSprite[i].image.onerror = (e) => reject(e);
      ajiSprite[i].image.src = ajiGetData(src);
    });
  }
}

function ajiDeleteSprite(id) {
  if (ajiExistSprite(id) == true) {
    ajiSprite.splice(ajiFindSpriteNumber(id), 1);
  }
}

function ajiExistSprite(id) {
  if (ajiFindSpriteNumber(id) >= 0) {
    return true;
  } else {
    return false;
  }
}

function ajiFindSpriteNumber(id) {
  for (let i = 0; i < ajiSprite.length; i++) {
    if (ajiSprite[i].id == id) {
      return i;
    }
  }
  return undefined;
}

function ajiDrawSprite(id, x, y) {
  if (ajiExistSprite(id) == true) {
    ajiContext.drawImage(ajiSprite[ajiFindSpriteNumber(id)].image, x, y);
  }
}

function ajiDrawSpriteZoom(id, x, y, w, h) {
  if (ajiExistSprite(id) == true) {
    ajiContext.drawImage(ajiSprite[ajiFindSpriteNumber(id)].image, x, y, w, h);
  }
}

async function ajiAddAudio(id, src) {
  ajiAudio.push({
    id: id,
    buffer: null,
  });
  await ajiSetAudio(id, src);
}

async function ajiSetAudio(id, src) {
  let promise = new Promise(function (resolve) {
    let audioRequest = new XMLHttpRequest();
    audioRequest.open("GET", ajiGetData(src), true);
    audioRequest.responseType = "arraybuffer";
    audioRequest.send();
    audioRequest.onload = function () {
      ajiAudioContext.decodeAudioData(audioRequest.response, function (buf) {
        for (let i = 0; i < ajiAudio.length; i++) {
          if (ajiAudio[i].id == id) {
            ajiAudio[i].buffer = buf;
            resolve();
            break;
          }
        }
      });
    };
  });
  await promise;
}

function ajiPlayAudio(id) {
  for (let i = 0; i < ajiAudio.length; i++) {
    if (ajiAudio[i].id == id) {
      let audioSource = ajiAudioContext.createBufferSource();
      audioSource.buffer = ajiAudio[i].buffer;
      audioSource.connect(ajiAudioContext.destination);
      audioSource.start(0);
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
