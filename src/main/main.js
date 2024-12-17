const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { setupIPCHandlers } = require('./ipcHandlers'); 
const db = require('./renderer/ScriptsJS/dbconn');

function createWindow() {
  // Get screen dimensions dynamically
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: width,       
    height: height,     
    fullscreenable: true, 
    frame: true,        
    webPreferences: {
      nodeIntegration: false,  
      contextIsolation: true,  
      preload: path.join(__dirname, 'preload.js'), 
    },
  });

  win.loadFile(path.join(__dirname, 'renderer/pages/index.html'));
}

app.whenReady().then(() => {
  setupIPCHandlers(ipcMain); // Initialize IPC handlers
  createWindow(); // Create the main window
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
