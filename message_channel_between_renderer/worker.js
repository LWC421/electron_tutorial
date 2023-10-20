const { ipcRenderer } = require("electron");

const doWork = (input) => {
  return input * 2;
}

ipcRenderer.on("new-client", (e) => {
  console.log(`New Client : ${e}`)

  const [port] = e.ports;
  port.onmessage = (event) => {
    const result = doWork(event.data)
    port.postMessage(result);
  }
})