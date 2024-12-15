const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs')
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  modifyPDF: (args) => ipcRenderer.invoke('modify-pdf', args), 
  readFile: (path) => fs.readFileSync(path, 'utf8'),
  writeFile: (path, data) => fs.writeFileSync(path, data),
  getNamesAddresses: () => ipcRenderer.invoke('get-names-addresses'),
});