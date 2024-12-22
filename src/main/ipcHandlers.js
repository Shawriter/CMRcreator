const { ipcMain } = require('electron');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const db = require('./renderer/ScriptsJS/dbconn');
const dbOps = require('./renderer/ScriptsJS/dbOps');
const PDFDataModel = require('./renderer/ScriptsJS/model');


function setupIPCHandlers() {
 
  ipcMain.handle('get-pdf-data-model', () => {
    return PDFDataModel;
  });

  ipcMain.handle('modify-pdf', async (event, { inputPath, outputPath, text }) => {
    
      try {
        const pdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const page = pdfDoc.getPages()[0];
        const data = JSON.parse(text);
  
        
        const address = data.addresses[0];
        page.drawText(`Name: ${address.fname}`, { x: 50, y: 700, size: 12 });
        page.drawText(`Address: ${address.address}`, { x: 50, y: 680, size: 12 });
        page.drawText(`Zipcode: ${address.zip}`, { x: 50, y: 660, size: 12 });
        page.drawText(`Country: ${address.country}`, { x: 50, y: 640, size: 12 });
        page.drawText(`Reference: ${address.reference}`, { x: 50, y: 620, size: 12 });
        page.drawText(`Phone Number: ${address.phone}`, { x: 50, y: 600, size: 12 });
        page.drawText(`Email: ${address.email}`, { x: 50, y: 580, size: 12 });
  
        const modifiedPdfBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, modifiedPdfBytes);
  
        return { success: true };
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