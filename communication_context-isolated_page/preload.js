const { ipcRenderer } = require("electron")

const windowLoaded = new Promise((resolve) => {
  window.onload = resolve;
})

ipcRenderer.on("main-world-port", async(event) => {
  await windowLoaded;

  window.postMessage("main-world-port", "*", event.ports)
})