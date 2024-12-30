const { ipcMain } = require('electron');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const db = require('./renderer/ScriptsJS/dbconn');
const { Buffer } = require('buffer');
const cloneDeep = require('lodash.clonedeep');
const PDFDataModel = require('./renderer/ScriptsJS/model');

function setupIPCHandlers() {
 
  ipcMain.handle('get-Buffer', () => {
     return Buffer;
  });


  ipcMain.handle('get-pdf-data-model', () => {

    const model = new PDFDataModel();
    const data = cloneDeep(model);
   
    return data;
    
  });
  


  ipcMain.handle('modify-pdf', async (event, { inputPath, outputPath, text, formObjectsFilled}) => {
    
      try {
        const pdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        const page = pdfDoc.getPages()[0];
        const data = JSON.parse(text);
        console.log(formObjectsFilled[0], "in ipcHandlers.js");
        console.log(formObjectsFilled[1], "in ipcHandlers.js");
        console.log(formObjectsFilled[2], "in ipcHandlers.js");
        console.log(formObjectsFilled[3], "in ipcHandlers.js");
        
        const address = data.addresses[0];
      
  
        const modifiedPdfBytes = await pdfDoc.save();
        
        fs.writeFileSync(outputPath, modifiedPdfBytes);

  
        return { success: true};
      } catch (error) {
        console.error('Error modifying PDF:', error);
        return { success: false, error: error.message };
      }

  });

  ipcMain.handle('add-customer', async (event, customer) => {
    return new Promise((resolve, reject) => {
      const { name, address, city, zipcode, country, reference, phone_number, email } = customer;
      db.run(
        `INSERT INTO Customers (name, address, city, zipcode, country, reference, phone_number, email) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, address, city, zipcode, country, reference, phone_number, email],
        function (err) {
          if (err) {
            console.error('Error inserting customer:', err);
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  });

  ipcMain.handle('get-names-addresses', async () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM Customers", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  });
  
 
}

module.exports = { setupIPCHandlers };