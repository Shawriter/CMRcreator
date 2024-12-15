const { ipcMain } = require('electron');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const db = require('./dbconn');
const dbOps = require('./dbOps');

function setupIPCHandlers() {

  ipcMain.handle('modify-pdf', async (event, { inputPath, outputPath, text }) => {
    try {
      const pdfBytes = fs.readFileSync(inputPath); 
      const pdfDoc = await PDFDocument.load(pdfBytes);

     
      const page = pdfDoc.getPages()[0];
      page.drawText(text, {
        x: 50,
        y: 500,
        size: 30,
      });

      const modifiedPdfBytes = await pdfDoc.save(); 
      fs.writeFileSync(outputPath, modifiedPdfBytes); 

      return 'PDF modified successfully';
    } catch (error) {
      console.error('Error modifying PDF:', error);
      throw new Error('Failed to modify PDF');
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