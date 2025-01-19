const { PDFDocument, StandardFonts, rgb } = require("pdf-lib"); 
const fs = require('fs');

function PDFWriting() {

    return {

      async writeToPage(inputPath, outputPath, text) {

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
  
          const pages = pdfDoc.getPages();
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
          let fontSize = 12;
          let pageDimensions = [];
  
          pages.forEach((page, index) => {
            const { width, height } = page.getSize();
            console.log(`Page ${index + 1} dimensions: Width = ${width}, Height = ${height}`);
  
            pageDimensions.push({ index: index + 1, width, height });
          });
  
          const { width, height } = pageDimensions[0];
  
          const page = pages[0];
  
          let adjustedY;
          let firstHalf = '';
          let secondHalf = '';
  
          const p = new Promise((resolve, reject) => {
            try {
              var yOffset = 0;
  
              text.forEach((formData) => {
                formData.forEach(([key, value], index) => {
                  if (!keyCoordinates[key]) {
                    console.warn(`No coordinates defined for key: ${key}`);
                    return;
                  }
  
                  let valuesLength = value.length;
                  let valuesDelegator;
  
                  const { x, y } = keyCoordinates[key];
  
                  yOffset = forwarder(index, valuesLength, value, x, y, width, height);
  
                  console.log(yOffset, "BEFORE");
  
                  draw(yOffset, x, y, value, firstHalf, secondHalf, valuesLength, valuesDelegator);
                });
  
                function forwarder(index, valuesLength, value, x, y, yOffset, width, height) {
                  checkLength(valuesLength, value);
  
                  yOffset = getYOffset(index, x, y);
                  return yOffset;
                }
  
                function getYOffset(index, x, y, width, height) {
                  getYOffset.offsetCounter = getYOffset.offsetCounter || 0;
  
                  console.log("OffsetCounter", getYOffset.offsetCounter);
  
                  if (index <= 6) {
                    return 0;
                  }
  
                  if (index > 6) {
                    getYOffset.offsetCounter -= 20; // The space between lines Receiver
                    y = y - (getYOffset.offsetCounter + 400);
                    return y;
                  }
                }
  
                function checkLength(valuesLength, value) {
                  if (valuesLength > 15) {
                    fontSize = 8;
                  }
                  if (valuesLength > 20) {
                    fontSize = 8;
                    let midpoint = Math.ceil(valuesLength / 2);
                    firstHalf = value.slice(0, midpoint);
                    secondHalf = value.slice(midpoint);
                  } else {
                    fontSize = 12;
                  }
                }
  
                function draw(yOffset, x, y, value, firstHalf, secondHalf, valuesLength, valuesDelegator) {
                  adjustedY = y - yOffset;
                  console.log(adjustedY, yOffset, value);
  
                  if (value) {
                    page.drawText(value, {
                      x,
                      y: adjustedY,
                      size: fontSize,
                      font,
                      color: rgb(0, 0, 0),
                    });
                  }
                  /*if (firstHalf && secondHalf) {
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
                  }*/
                }
              });
  
              resolve("Success");
            } catch (error) {
              reject(error);
            }
          });
  
          p.then(async () => {
            const modifiedPdfBytes = await pdfDoc.save();
            fs.writeFileSync(outputPath, modifiedPdfBytes);
          }).catch((error) => {
            console.error(error);
          });
  
          return { 
            
            success: true 

          };

        } catch (error) {
          console.error("Error modifying PDF:", error);
          return {
            success: false,
            error: error.message,
          };
        }
      },
    };
  }

module.exports = PDFWriting;