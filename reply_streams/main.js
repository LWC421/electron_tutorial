const { ipcMain } = require("electron");

ipcMain.on("give-me-a-stream", (event, msg) => {
  const [replyPort] = event.ports;

  for(let i = 0; i < msg.count; i++){
    replyPort.postMessage(msg.element)
  }

  replyPort.close();

})