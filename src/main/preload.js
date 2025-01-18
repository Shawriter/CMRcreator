const { contextBridge, ipcRenderer } = require('electron');


// DO NOT REQUIRE anything else here than the electron module


contextBridge.exposeInMainWorld('electron', {
  modifyPDF: (data) => ipcRenderer.invoke('modify-pdf', data ), 
  //readFile: (path) => fs.readFileSync(path, 'utf8'),
  //writeFile: (path, data) => fs.writeFileSync(path, data),
  getNamesAddresses: () => ipcRenderer.invoke('get-names-addresses'),
  getPDFDataModel: async () => {
    const PDFDataMod = await ipcRenderer.invoke('get-pdf-data-model');
    return PDFDataMod; 
  },
  createBuffer: (data, encoding) => {
    return Buffer.from(data, encoding);
  }

});


