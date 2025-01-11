const { ipcMain } = require('electron');
const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const db = require('./renderer/ScriptsJS/dbconn');
const { Buffer } = require('buffer');
const cloneDeep = require('lodash.clonedeep');
const PDFDataModel = require('./renderer/ScriptsJS/model');

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
    
      try {
        const pdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        console.log(text);

        let concatenatedText = '';
        let k = 0;
        
        const keyCoordinates = {
          fname: { x: 50, y: 750 },
          address: { x: 50, y: 730 },
          Postal: { x: 50, y: 710 },
          Country: { x: 50, y: 690 },
          Reference: { x: 50, y: 670 },
          Phone: { x: 50, y: 650 },
          Email: { x: 50, y: 630 },
        };
        
        //writeToPDF();
        /*text.forEach(subArray => {
          subArray.forEach(async pair => {

            concatenatedText += `${pair[1]}\n`;
            
            for(let i; i < (subArray.length/4); i++){
              const writtenAddress = await writeToPDF(concatenatedText, i);
            }

          });
        });*/

        //async function writeToPDF(concatenatedText, i){

          const page = pdfDoc.getPages()[0];
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
          const fontSize = 12;
          let yOffset;
          let adjustedY;

          text.forEach((formData, index, yOffset, adjustedY) => {
            formData.forEach(([key, value]) => {
              if (!keyCoordinates[key]) {
                console.warn(`No coordinates defined for key: ${key}`);
                return;
              }
              
              const { x, y } = keyCoordinates[key];

                switch(index){

                  case 0:
                    yOffset = index * 100; 
                    adjustedY = y - yOffset;
                    await draw(adjustedY);
                    break;
                  case 1:
                    yOffset = index * 100; 
                    adjustedY = y - yOffset;
                    await draw(adjustedY);
                    break;
                  case 2:
                    break;
                  case 3:
                    break;
                  case 4:
                    break;
                  case 5:
                    break;
                  case 6:
                    break;
                  case 7:
                    break;
                  case 8:
                    break;
                  case 9:
                    break;
                  case 10:
                    break;
                  case 11:
                    break;
                  case 12:
                    break;
                  case 13:
                    break;
                  case 14:
                    break;
                  case 15:
                    break;
                  case 16:
                    break;
                  case 17:
                    break;
                  case 8:
                    break;
                  case 9:
                    break;
                  case 10:
                    break;
                  case 11:
                    break;
                  case 12:
                    break;
                  case 13:
                    break;
                  case 14:
                    break;
                  case 15:
                    break;
                  case 16:
                    break;
                  case 17:
                    break;
                  case 18:
                    break;
                  case 19:
                    break;
                  case 20:
                    break;
                  case 21:
                    break;
                  case 22:
                    break;
                  case 23:
                    break;
                  case 24:
                    break;
                  case 25:
                    break;
                  case 26:
                    break;
                  case 27:
                    break;
                }

            });

          async function draw(...args) {
                
              if (value) {
                page.drawText(value.toString(), {
                  x,
                  y: adjustedY,
                  size: fontSize,
                  font,
                  color: rgb(0, 0, 0),
                });
              }

            }
          });
          
  
        const modifiedPdfBytes = await pdfDoc.save();
        
        fs.writeFileSync(outputPath, modifiedPdfBytes);

  
        return { success: true};

      } catch (error) {
        console.error('Error modifying PDF:', error);
        return { success: false, error: error.message };
      }

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
          console.log("Error get customers")M
        }
        else {
          resolve(rows);
        }
      });
    });
  });
  
 
}

module.exports = { setupIPCHandlers };