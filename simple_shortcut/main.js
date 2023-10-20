const { app, BrowserWindow, Menu, MenuItem, globalShortcut } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile("index.html");
}

const menu = new Menu();
menu.append(new MenuItem({
  label: "Electron",
  submenu: [
    {
      role: "help",
      // 단축키 설정
      accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "Alt+Shift+I",
      click: () => {
        console.log("Electron Rocks!")
      }
    }
  ]

}))

Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  
  //키보드의 포커스가 맞추어져있지 않아도 동작한다
  globalShortcut.register("Alt+Shift+Q", () => {
    console.log("Global Shortcut");
  })
  createWindow();
});

app.on("window-all-closed", () => {
  if(process.platform !== "darwin"){
    app.quit();
  }
})

app.on("activate", () => {
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow();
  }
})