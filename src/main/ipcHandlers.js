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

        const keyCoordinates = {
          fname: { x: 7, y: 815 },
          address: { x: 7, y: 800 },
          Postal: { x: 7, y: 785 },
          Country: { x: 7, y: 770 },
          Reference: { x: 280, y: 815 },
          Phone: { x: 190, y: 665 },
          Email: { x: 190, y: 655 },
        };
        

          const page = pdfDoc.getPages()[0];
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
          const fontSize = 12;
          
          let adjustedY;
           
          text.forEach((formData) => {
            formData.forEach(([key, value], index) => {
              console.log(index);
              if (!keyCoordinates[key]) {
                console.warn(`No coordinates defined for key: ${key}`);
                return;
              }
              let yOffset = 0;
              const { x, y } = keyCoordinates[key];
              
                //Writing the addresses to the PDF, this might not be the best solution as I could have passed the types to the constructor when modeling the constructrors and getting the inputs, but it works
                switch(index){
                  
                  //For cases up to 8 the sender address let Y coordinates be default
                  case 0:

                    break;

                  case 1:

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

                  
                    yOffset = index * 60; 
                    break;

                  case 9:
                    
                    yOffset = index * 60; 
                    break;

                  case 10:

                    yOffset = index * 50; 
                    break;

                  case 11:

                    yOffset = index * 50; 
                    break;

                  case 12:

                    yOffset = index * 100; 
                    break;

                  case 13:

                    yOffset = index * 100; 
                    break;

                  case 14:

                    yOffset = index * 100; 
                    break;

                  case 15:

                    yOffset = index * 100; 
                    break;

                  case 16:

                    yOffset = index * 100; 
                    break;

                  case 17:

                    yOffset = index * 100; 
                    break;

                  case 18:

                    yOffset = index * 100; 
                    break;

                  case 19:

                    yOffset = index * 100; 
                    break;

                  case 20:

                    yOffset = index * 100; 
                    break;

                  case 21:

                    yOffset = index * 100; 
                    break;

                  case 22:

                    yOffset = index * 100; 
                    break;

                  case 23:

                    yOffset = index * 100; 
                    break;

                  case 24:

                    yOffset = index * 100; 
                    break;

                  case 25:

                    yOffset = index * 100; 
                    break;

                  case 26:

                    yOffset = index * 100; 
                    break;

                  case 27:

                    yOffset = index * 100; 
                    break;
                }

              draw(yOffset, x, y, value);

            });

          function draw(yOffset, x, y, value) {
              
              adjustedY = y - yOffset;

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