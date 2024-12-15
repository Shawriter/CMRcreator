const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { setupIPCHandlers } = require('./ScriptsJS/ipcHandlers'); 


function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,  // nodeIntegration disabled for security
      contextIsolation: true,  
      preload: path.join(__dirname, 'preload.js'), 
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  setupIPCHandlers(ipcMain);
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


app.on('before-quit', () => {
  db.close();
});
