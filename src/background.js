"use strict";

const fs = require("fs");
import { app, Menu, protocol, BrowserWindow, ipcMain, dialog } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
let win;

const appName = "Ajipack Studio";
const isMac = process.platform === "darwin";
const template = Menu.buildFromTemplate([
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about", label: `${appName}について` },
            { type: "separator" },
            { role: "services", label: "サービス" },
            { type: "separator" },
            { role: "hide", label: `${appName}を隠す` },
            { role: "hideothers", label: "ほかを隠す" },
            { role: "unhide", label: "すべて表示" },
            { type: "separator" },
            { role: "quit", label: `${appName}を終了` },
          ],
        },
      ]
    : []),
  {
    label: "ファイル",
    submenu: [
      {
        label: "新規作成",
        click: function () {
          win.webContents.send("newProject", null);
        },
      },
      {
        label: "開く",
        click: function () {
          win.webContents.send("openProject", null);
        },
      },
      {
        label: "上書き保存",
        click: function () {
          win.webContents.send("saveProject", null);
        },
      },
      {
        label: "名前を付けて保存",
        click: function () {
          win.webContents.send("saveAsProject", null);
        },
      },
      { type: "separator" },
      isMac
        ? { role: "close", label: "ウィンドウを閉じる" }
        : { role: "quit", label: "終了" },
    ],
  },
  {
    label: "編集",
    submenu: [
      { role: "undo", label: "元に戻す" },
      { role: "redo", label: "やり直す" },
      { type: "separator" },
      { role: "cut", label: "切り取り" },
      { role: "copy", label: "コピー" },
      { role: "paste", label: "貼り付け" },
      ...(isMac
        ? [
            {
              role: "pasteAndMatchStyle",
              label: "ペーストしてスタイルを合わせる",
            },
            { role: "delete", label: "削除" },
            { role: "selectAll", label: "すべてを選択" },
            { type: "separator" },
            {
              label: "スピーチ",
              submenu: [
                { role: "startSpeaking", label: "読み上げを開始" },
                { role: "stopSpeaking", label: "読み上げを停止" },
              ],
            },
          ]
        : [
            { role: "delete", label: "削除" },
            { type: "separator" },
            { role: "selectAll", label: "すべてを選択" },
          ]),
    ],
  },
  {
    label: "ウィンドウ",
    submenu: [
      { role: "minimize", label: "最小化" },
      { role: "zoom", label: "ズーム" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front", label: "ウィンドウを手前に表示" },
            { type: "separator" },
            { role: "window", label: "ウィンドウ" },
          ]
        : [{ role: "close", label: "閉じる" }]),
    ],
  },
  {
    label: "ヘルプ",
    submenu: [
      ...(isMac ? [] : [{ role: "about", label: `${appName}について` }]),
    ],
  },
]);
Menu.setApplicationMenu(template);

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: appName,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  ipcMain.on("saveAsProject", (event, message) => {
    saveAsProject(message);
  });
  ipcMain.on("test", (event, message) => {
    console.log(message);
  });
  // win.webContents.openDevTools();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

async function saveAsProject(message) {
  const result = await dialog.showSaveDialog(win, {
    properties: ["openFile"],
    filters: [
      {
        name: "Documents",
        extensions: ["apf"],
      },
    ],
  });
  if (result.canceled) {
    return;
  }
  await saveProcess(result.filePath, message);
}

async function saveProcess(filePath, message) {
  fs.writeFileSync(filePath, JSON.stringify(message));
}
