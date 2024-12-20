const PDFDataModel = require('./model');

document.getElementById('submitbutton').addEventListener('click', () => {
  const model = new PDFDataModel();

  const addressData = {
    fname: document.getElementById('fname').value,
    address: document.getElementById('address').value,
    zip: document.getElementById('zipcode').value,
    country: document.getElementById('country').value,
    reference: document.getElementById('reference').value,
    phone: document.getElementById('phoneNumber').value,
    email: document.getElementById('email').value,
  };

  model.setAddress(addressData);

  const inputPath = 'CMR_templates/CMRtemplate.pdf';
  const outputPath = 'path/to/output.pdf';
  const text = JSON.stringify(model.getShipment(), null, 2); 

  window.electron.modifyPDF({ inputPath, outputPath, text })
    .then(response => {
      if (response.success) {
        alert('PDF modified successfully');
      } else {
        alert('Error modifying PDF: ' + response.error);
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error modifying PDF');
    });
});