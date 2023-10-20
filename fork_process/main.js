const { app, Tray, utilityProcess } = require("electron");
const path = require("node:path");

let tray = null;

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, "icon.png"));

  const process = utilityProcess.fork(path.join(__dirname, "test.js"))
  
  console.log(process);

})

app.on("quit", () => {
  app.quit();
})
