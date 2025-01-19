const { ipcMain } = require('electron');
const db = require('./renderer/ScriptsJS/dbconn');
const { Buffer } = require('buffer');
const cloneDeep = require('lodash.clonedeep');
const PDFDataModel = require('./renderer/ScriptsJS/model');
const PDFWriting = require('./renderer/ScriptsJS/pdfWriting');

function setupIPCHandlers() {
 
  ipcMain.handle('get-Buffer', () => {
     return Buffer;
  });


  ipcMain.handle('get-pdf-data-model', async () => {

    const model = new PDFDataModel();
    const data = cloneDeep(model);
   
    return data;
    
  });
  


  ipcMain.handle('modify-pdf', async (event, { inputPath, outputPath, text}) => {
    
    const pdfWriter = PDFWriting();

    const result = await pdfWriter.writeToPage(inputPath, outputPath, text);
    
    console.log("PDF written", result);

    return result;

  });

  //using promise due db reliance on callback function
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
  //using promise due db reliance on callback function
  ipcMain.handle('get-names-addresses', async () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM Customers", (err, rows) => {
        if (err) {
          reject(err);
          console.log("Error get customers");
        }
        else {
          resolve(rows);
        }
      });
    });
  });
  
 
}

module.exports = { setupIPCHandlers };