const { ipcRenderer } = require("electron");

const makeStreamingRequest = (element, callback) => {
  const {port1, port2} = new MessageChannel();

  ipcRenderer.postMessage(
    "give-me-a-stream",
    {element, count: 10},
    [port2]
  )

  port1.onmessage = (event) => {
    callback(event.data);
  }
  port1.onclose = () => {
    console.log("Stream Ended")
  }

}

makeStreamingRequest(42, (data) => {
  console.log(`Renderer Got response data : ${data}`)
})