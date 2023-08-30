/*
Ajipack Player
Copyright (c) 2023 Sora Arakawa
Licensed under the MIT License
*/

const AJIPACK_WIDTH = 320;
const AJIPACK_HEIGHT = 240;
const AJIPACK_FPS = 33.0;
let ajiDate = new Date();
let ajiDrawTime = Date.now();
let ajiCanvas, ajiContext, ajiVideo;
let ajiBG = [new Image(), new Image(), new Image(), new Image()];
let ajiSprite = [];
let ajiAudioContext = new AudioContext();
let ajiAudio = [];
let ajiMouse = { x: 0, y: 0, flag: false, count: 0 };

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
  ajiVideo = document.createElement("video");
  ajiVideo.width = 320;
  ajiVideo.height = 240;
  ajiVideo.style.display = "none";
  document.body.appendChild(ajiVideo);
  if (typeof setup == "function") {
    setup();
  }
  ajiCanvas.addEventListener("touchstart", ajiMouseDown, false);
  ajiCanvas.addEventListener("touchend", ajiMouseUp);
  ajiCanvas.addEventListener("mousedown", ajiMouseDown, false);
  ajiCanvas.addEventListener("mouseup", ajiMouseUp);
  ajiMain();
}

function ajiMain() {
  ajiDate = new Date();
  const ajiNowTime = Date.now();
  if (ajiNowTime - ajiDrawTime >= 1000 / AJIPACK_FPS) {
    ajiDrawTime = ajiNowTime;
    if (ajiMouse.flag == true) {
      ajiMouse.count++;
    } else {
      if (ajiMouse.count == 1 || ajiMouse.count == 2) {
        ajiMouse.count++;
      } else {
        ajiMouse.count = 0;
      }
    }
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

function ajiSetStrokeColor(color) {
  ajiContext.strokeStyle = color;
}

function ajiSetLineCap(cap) {
  ajiContext.lineCap = cap;
}

function ajiSetLineWidth(width) {
  ajiContext.lineWidth = width;
}

function ajiSetFont(font) {
  ajiContext.font = font;
}

function ajiFillRect(x, y, w, h) {
  ajiContext.fillRect(x, y, w, h);
}

function ajiStrokeRect(x, y, w, h) {
  ajiContext.strokeRect(x, y, w, h);
}

function ajiFillCircle(x, y, w, h) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = w / 2;
  const ry = h / 2;
  ajiContext.beginPath();
  ajiContext.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ajiContext.fill();
}

function ajiStrokeCircle(x, y, w, h) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = w / 2;
  const ry = h / 2;
  ajiContext.beginPath();
  ajiContext.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ajiContext.stroke();
}

function ajiLine(x1, y1, x2, y2) {
  ajiContext.beginPath();
  ajiContext.moveTo(x1, y1);
  ajiContext.lineTo(x2, y2);
  ajiContext.stroke();
}

function ajiDrawText(text, x, y) {
  ajiContext.fillText(text, x, y);
}

function ajiDrawAlignText(text, x, y, w, align) {
  if (align == "center") {
    ajiContext.fillText(
      text,
      x + (w - ajiContext.measureText(text).width) / 2,
      y
    );
  } else if (align == "right") {
    ajiContext.fillText(text, x + w - ajiContext.measureText(text).width, y);
  }
}

// BG

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

// Sprite

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

// Audio

async function ajiAddAudio(id, src) {
  if (ajiExistAudio(id) == false) {
    ajiAudio.push({
      id: id,
      buffer: null,
      source: null,
    });
    await ajiSetAudio(id, src);
  }
}

async function ajiSetAudio(id, src) {
  if (ajiExistAudio(id) == true) {
    let promise = new Promise(function (resolve) {
      let audioRequest = new XMLHttpRequest();
      audioRequest.open("GET", ajiGetData(src), true);
      audioRequest.responseType = "arraybuffer";
      audioRequest.send();
      audioRequest.onload = function () {
        ajiAudioContext.decodeAudioData(audioRequest.response, function (buf) {
          ajiAudio[ajiFindAudioNumber(id)].buffer = buf;
          resolve();
        });
      };
    });
    await promise;
  }
}

function ajiDeleteAudio(id) {
  if (ajiExistAudio(id) == true) {
    ajiAudio.splice(ajiFindAudioNumber(id), 1);
  }
}

function ajiExistAudio(id) {
  if (ajiFindAudioNumber(id) >= 0) {
    return true;
  } else {
    return false;
  }
}

function ajiFindAudioNumber(id) {
  for (let i = 0; i < ajiAudio.length; i++) {
    if (ajiAudio[i].id == id) {
      return i;
    }
  }
  return undefined;
}

function ajiPlayAudio(id) {
  const number = ajiFindAudioNumber(id);
  ajiAudio[number].source = ajiAudioContext.createBufferSource();
  ajiAudio[number].source.buffer = ajiAudio[number].buffer;
  ajiAudio[number].source.connect(ajiAudioContext.destination);
  ajiAudio[number].source.start(0);
}

function ajiStopAudio(id) {
  ajiAudio[ajiFindAudioNumber(id)].source.stop();
}

// Video

async function ajiLoadVideo(src) {
  if (ajiExistData(src) == true) {
    await new Promise((resolve, reject) => {
      ajiVideo.onload = () => resolve(ajiVideo);
      ajiVideo.onerror = (e) => reject(e);
      ajiVideo.src = ajiGetData(src);
    });
  }
}

function ajiPlayVideo() {
  ajiVideo.play();
}

function ajiPauseVideo() {
  ajiVideo.pause();
}

function ajiUpdateVideo() {
  ajiContext.drawImage(ajiVideo, 0, 0, 320, 240);
}

function ajiGetVideoDuration() {
  return ajiVideo.duration;
}

function ajiGetVideoCurrentTime() {
  return ajiVideo.currentTime;
}

function ajiSetVideoCurrentTime(time) {
  ajiVideo.currentTime = time;
}

// Mouse

function ajiMouseX() {
  return ajiMouse.x;
}

function ajiMouseY() {
  return ajiMouse.y;
}

function ajiMouseDown(e) {
  if (e.touches != undefined) {
    e.preventDefault();
    ajiMouse.x = e.touches[0].pageX;
    ajiMouse.y = e.touches[0].pageY;
  } else {
    const rect = e.target.getBoundingClientRect();
    ajiMouse.x = e.clientX - rect.left;
    ajiMouse.y = e.clientY - rect.top;
  }
  ajiMouse.flag = true;
}

function ajiMouseUp() {
  ajiMouse.flag = false;
}

function ajiClick() {
  if (ajiMouse.count == 1) {
    return true;
  } else {
    return false;
  }
}

// Date & Time

function ajiGetYear() {
  return ajiDate.getFullYear();
}

function ajiGetMonth() {
  return ajiDate.getMonth() + 1;
}

function ajiGetDate() {
  return ajiDate.getDate();
}

function ajiGetDay() {
  return ajiDate.getDay();
}

function ajiGetHours() {
  return ajiDate.getHours();
}

function ajiGetMinutes() {
  return ajiDate.getMinutes();
}

function ajiGetSeconds() {
  return ajiDate.getSeconds();
}

function ajiGetDateString() {
  return ajiDate.toLocaleDateString();
}

function ajiGetTimeString() {
  return ajiDate.toLocaleTimeString();
}
