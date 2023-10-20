const { app, BrowserWindow, shell } = require('electron')
const path = require('node:path')

if(process.defaultApp){
  if(process.argv.length >= 2){
    app.setAsDefaultProtocolClient("electron-fiddle", process.execPath, [path.resolve(process.argv[1])]);
  }
  else{
    app.setAsDefaultProtocolClient("electron-fiddle");
  }
}

let mainWindow;

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

const gotTheLock = app.requestSingleInstanceLock()

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

    dialog.showErrorBox("Welcome Back", `You Arrived from : ${commandLine.pop()}`);
  })

  app.whenReady().then(() => {
    createWindow();
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})