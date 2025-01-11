const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { setupIPCHandlers } = require('./ipcHandlers'); 
const db = require('./renderer/ScriptsJS/dbconn');




function createWindow() {
  
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const preloadPath = path.join(__dirname, 'preload.js');
  
  const win = new BrowserWindow({
    width: width,       
    height: height,     
    fullscreenable: true, 
    frame: true,        
    webPreferences: {
      nodeIntegration: false,  
      contextIsolation: true,  
      preload: preloadPath, 
      enableRemoteModule: false, 
      sandbox: true, 
    },
  });
  
  win.loadFile(path.join(__dirname, 'renderer/pages/index.html'));
  win.webContents.openDevTools();

}

app.whenReady().then(() => {

  createWindow(); 
  setupIPCHandlers();
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

