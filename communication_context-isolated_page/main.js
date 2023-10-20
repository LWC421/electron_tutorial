const { BrowserWindow, app, MessageChannelMain } = require("electron");
const path = require("node:path")


app.whenReady().then(async() => {

  const bw = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  })

  bw.loadFile("index.html");
  bw.webContents.openDevTools();

  const {port1, port2} = new MessageChannelMain();
  port2.postMessage({test: 21})

  port2.on("message", (event) => {
    console.log(`From Renderer main world : ${event.data}`)
  })
  port2.start();

  bw.webContents.postMessage("main-world-port", null, [port1]);
})