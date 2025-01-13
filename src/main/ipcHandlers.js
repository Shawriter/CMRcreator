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
          Phone: { x: 190, y: 790 },
          Email: { x: 190, y: 780 },
        };
        

          const page = pdfDoc.getPages()[0];
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
          let fontSize = 12;
          
          let adjustedY;
          let firstHalf = '';
          let secondHalf = '';
          
          const p = new Promise((resolve, reject) => {
            
            try{

            text.forEach((formData) => {
              formData.forEach(([key, value], index) => {
                
                if (!keyCoordinates[key]) {
                  console.warn(`No coordinates defined for key: ${key}`);
                  return;
                }
                let yOffset = 0;
                let valuesLength = value.length;
                let valuesDelegator;

                const { x, y } = keyCoordinates[key];

                  //Writing the addresses to the PDF, this might not be the best solution as I could have passed the types to the constructor when modeling the constructrors and getting the inputs, but it works
                  switch(index){
                    
                    //For cases up to 8 the sender address let Y coordinates be default
                    case 0:
                      
                      valuesDelegator = key + "Sender";
                      forwarder(index, valuesLength, value);
                      
                      console.log(valuesDelegator);
                      break;

                    case 1:

                      valuesDelegator = key + "Sender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 2:

                      valuesDelegator = key + "Sender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 3:
                        
                      valuesDelegator = key + "Sender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 4:

                      valuesDelegator = key + "Sender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 5: //The sender reference
                      
                      valuesDelegator = key + "Sender";
                      forwarder(index, valuesLength, value);
                    
                      break;

                    case 6:
                      
                      valuesDelegator = key + "Sender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 7:

                      valuesDelegator = key + "Sender";
                      forwarder(index, valuesLength, value);

                      break;

                    case 8:

                      valuesDelegator = key + "Receiver";
                      forwarder(index, valuesLength, value);

                      break;

                    case 9:

                      valuesDelegator = key + "Receiver";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 10:
                      
                      valuesDelegator = key + "Receiver";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 11:

                      valuesDelegator = key + "Receiver";
                      forwarder(index, valuesLength, value);

                      break;

                    case 12:
                      
                      valuesDelegator = key + "Receiver";
                      forwarder(index, valuesLength, value);

                      break;

                    case 13:

                      valuesDelegator = key + "Receiver";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 14:
                      
                      valuesDelegator = key + "Receiver";
                      forwarder(index, valuesLength, value);

                      break;

                    case 15:
                      
                      valuesDelegator = key + "CollectionAddressIfNotTheSameAsSender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 16:
                      
                      valuesDelegator = key + "CollectionAddressIfNotTheSameAsSender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 17:
                      
                      valuesDelegator = key + "CollectionAddressIfNotTheSameAsSender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 18:
                      
                      valuesDelegator = key + "CollectionAddressIfNotTheSameAsSender";
                      forwarder(index, valuesLength, value);
                       
                      break;

                    case 19:
                      
                      valuesDelegator = key + "CollectionAddressIfNotTheSameAsSender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 20:
                      
                      valuesDelegator = key + "CollectionAddressIfNotTheSameAsSender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 21:
                      
                      valuesDelegator = key + "CollectionAddressIfNotTheSameAsSender";
                      forwarder(index, valuesLength, value);
                      
                      break;

                    case 22:

                      valuesDelegator = key + "ReceiverAddressIfNotTheSameAsReceiver";
                      forwarder(index, valuesLength, value);

                      break;

                    case 23:
                      
                      valuesDelegator = key + "ReceiverAddressIfNotTheSameAsReceiver";
                      forwarder(index, valuesLength, value);

                      break;

                    case 24:
                      
                      valuesDelegator = key + "ReceiverAddressIfNotTheSameAsReceiver";
                      forwarder(index, valuesLength, value);

                      break;

                    case 25:
                      
                      valuesDelegator = key + "ReceiverAddressIfNotTheSameAsReceiver";
                      forwarder(index, valuesLength, value);

                      break;

                    case 26:
                      
                      valuesDelegator = key + "ReceiverAddressIfNotTheSameAsReceiver";
                      forwarder(index, valuesLength, value);

                      break;

                    case 27:
                      
                      valuesDelegator = key + "ReceiverAddressIfNotTheSameAsReceiver";
                      forwarder(index, valuesLength, value);

                      break;
                  }
                
                draw(yOffset, x, y, value, firstHalf, secondHalf, valuesLength);

              });


            function forwarder(index, valuesLength, value){
                
              checkLength(valuesLength, value);
                      
              yOffset = getYOffset(index); 
            
            }

            function getYOffset(index) {

                if (index <= 8){

                  return 0;

                }
                if (index <= 14){

                  return (index - 8) * 60;

                }

                return (index - 14) * 100;
              }

            function checkLength(valuesLength, value, firstHalf, secondHalf){

              if (valuesLength > 15){

                fontSize = 8;
              
              }
              if(valuesLength > 20)
              {
                  //console.log(value);
                  fontSize = 8;
                  let midpoint = Math.ceil(valuesLength / 2);
                  firstHalf = value.slice(0, midpoint);
                  secondHalf = value.slice(midpoint);
                  
              }
              else{
                fontSize = 12;
              }

            }
            function draw(yOffset, x, y, value, firstHalf, secondHalf, valuesLength) {
                
                adjustedY = y - yOffset;

                /*if (value && (fontSize >= 12) && (valuesLength > 20)) {
                  page.drawText(value, {
                    x,
                    y: adjustedY,
                    size: fontSize,
                    font,
                    color: rgb(0, 0, 0),
                  });
                }*/
                if (value && (fontSize >= 12)) {
                  page.drawText(value, {
                    x,
                    y: adjustedY,
                    size: fontSize,
                    font,
                    color: rgb(0, 0, 0),
                  });
                }
                if(value && (fontSize < 12))
                {
                  page.drawText(value, {
                    x,
                    y: adjustedY,
                    size: fontSize,
                    font,
                    color: rgb(0, 0, 0),
                  });
                }
                if(firstHalf && secondHalf) //Separating a too long string into newline
                {
                  console.log("IN THE SPLITTED");
                  page.drawText(firstHalf.toString(), {
                    x,
                    y: adjustedY,
                    size: fontSize,
                    font,
                    color: rgb(0, 0, 0),
                  });
                  page.drawText(secondHalf.toString(), {
                    x,
                    y: adjustedY + 10,
                    size: fontSize,
                    font,
                    color: rgb(0, 0, 0),
                  });
                }
              }
            
              

            });

              resolve("Success");

           }catch(error){

              reject(error);

           }
          });
          
          p.then(async () => {

            const modifiedPdfBytes = await pdfDoc.save();
            fs.writeFileSync(outputPath, modifiedPdfBytes);

          }).catch((error) => {

            console.error(error);

          });
          
          return { success: true};

        } catch (error) {

          console.error('Error modifying PDF:', error);

          return { 
            success: false, 
            error: error.message 
          };
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