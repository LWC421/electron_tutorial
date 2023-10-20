const { BrowserWindow, app, MessageChannelMain } = require("electron");

app.whenReady().then(async() => {
  const worker = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
  }
  })

  await worker.loadFile("worker.html")

  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
  }
  })
  mainWindow.loadFile("app.html")

  mainWindow.webContents.openDevTools();

  mainWindow.webContents.mainFrame.ipc.on("request-worker-channel", (event) => {
    const {port1, port2} = new MessageChannelMain();
    worker.webContents.postMessage("new-client", null, [port1])

    event.senderFrame.postMessage("provide-worker-channel", null, [port2])

  })

})