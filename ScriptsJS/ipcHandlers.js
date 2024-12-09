const { ipcMain } = require('electron');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

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
}

module.exports = { setupIPCHandlers };