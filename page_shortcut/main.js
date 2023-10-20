const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })

  mainWindow.loadFile("index.html");

  mainWindow.webContents.openDevTools();

  //메인 프로세서에서 키 입력에 대해 얻을 수 있다
  //preventDefault()를 통해 페이지에서 실행되는 것들을 취소해버릴 수도 있다
  mainWindow.webContents.on("before-input-event", (event, input) => {
    if(input.control && input.key.toLowerCase() === "i"){
      console.log("Pressed Ctrl+I")
      event.preventDefault();
    }
  })
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0){
      createWindow();
    }
  })
})

app.on("window-all-closed", () => {
  if(process.platform !== "drawin"){
    app.quit();
  }
})