const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs')

contextBridge.exposeInMainWorld('electron', {
  modifyPDF: (args) => ipcRenderer.invoke('modify-pdf', args), 
  readFile: (path) => fs.readFileSync(path, 'utf8'),
  writeFile: (path, data) => fs.writeFileSync(path, data)
});