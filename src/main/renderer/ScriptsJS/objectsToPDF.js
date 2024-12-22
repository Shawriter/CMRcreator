
document.getElementById('submitbutton').addEventListener('click', async () => {
  const model = await window.electron.getPDFDataModel();
  

  console.log(model);
  console.log(typeof model.setAddress);

  const addressData = {
    fname: document.getElementById('fname').value,
    address: document.getElementById('address').value,
    zip: document.getElementById('Postal').value,
    country: document.getElementById('Country').value,
    reference: document.getElementById('Reference').value,
    phone: document.getElementById('Phone').value,
    email: document.getElementById('Email').value,
  };

  model.setAddress(addressData);
  
  const packageData = {
    weight: document.getElementById('weight').value,
    length: document.getElementById('length').value,
    width: document.getElementById('width').value,
    height: document.getElementById('height').value,
  };
  model.setPackage(packageData);
  
  console.log(packageData);
  console.log(addressData);

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