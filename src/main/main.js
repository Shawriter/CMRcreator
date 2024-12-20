const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { setupIPCHandlers } = require('./ipcHandlers'); 
const db = require('./renderer/ScriptsJS/dbconn');

function createWindow() {
  // Get screen dimensions dynamically
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const preloadPath = path.join(__dirname, 'preload.js');
  console.log('Preload path:', preloadPath);
  const win = new BrowserWindow({
    width: width,       
    height: height,     
    fullscreenable: true, 
    frame: true,        
    webPreferences: {
      nodeIntegration: false,  
      contextIsolation: true,  
      preload: preloadPath, 
      enableRemoteModule: false, // Keep secure
    },
  });
  
  win.loadFile(path.join(__dirname, 'renderer/pages/index.html'));
}

app.whenReady().then(() => {

  createWindow(); 
  setupIPCHandlers()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('before-quit', () => {
  db.close(); // Ensure the database connection is closed
});

