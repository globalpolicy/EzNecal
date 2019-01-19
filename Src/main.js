const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
const settingsHandler = require("./settingsHandler.js");
let win;


function createWindow() {
    win = new BrowserWindow({
        width: 250,
        height: 55,
        frame: false,
        resizable: false,
        transparent: true,
        skipTaskbar: true
    });

    //win.webContents.openDevTools();

    win.loadFile('index.html');


    win.on('close', () => {
        win = null;
    });

    win.on('will-move', (event, newBounds) => {
        settingsHandler.updateField("X", newBounds.x);
        settingsHandler.updateField("Y", newBounds.y);
    });


}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});