const { app, BrowserWindow, ipcMain, shell, dialog } = require("electron");
const path = require("node:path");

let mainWindow;

if(process.defaultApp){
  if(process.argv.length >= 2){
    app.setAsDefaultProtocolClient("electron-fiddle", process.execPath, [path.resolve(process.argv[1])])
  }
}
else{
  app.setAsDefaultProtocolClient("electron-fiddle");
}

const gotTheLock = app.requestSingleInstanceLock();

if(!gotTheLock){
  app.quit();
}
else{
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if(mainWindow){
      if(mainWindow.isMinimized()){
        mainWindow.restore();
      }
    }

    dialog.showErrorBox("Welcome Back", `you arrived from : ${commandLine.pop()}`);
  })

  app.whenReady().then(() => {
    createWindow();
  })

  app.on("open-url", (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  })
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      preload: path.join(__dirname, "preload.js")
    }
  })

  mainWindow.loadFile("index.html");
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("shell:open", () => {
  const pageDirectory = __dirname.replace("app.asar", "app.asar.unpacked")
  const pagePath = __dirname.replace("file://", pageDirectory, "index.html");
  shell.openExternal(pagePath);
})