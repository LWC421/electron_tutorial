const { ipcRenderer } = require("electron");

ipcRenderer.send("request-worker-channel")

ipcRenderer.once("provide-worker-channel", (event) => {
  const [port] = event.ports;

  port.onmessage = (event) => {
    console.log(`App Received result : ${event.data}`)
  }

  setInterval(() => {
    port.postMessage(21);
  }, 5000)
  
})
