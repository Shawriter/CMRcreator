document.getElementById('').addEventListener('click', () => {

    const inputPath = 'path/to/input.pdf';
    const outputPath = 'path/to/output.pdf';
    const text = 'This is the modified text!';
  
    window.electron.modifyPDF({ inputPath, outputPath, text })
      .then(response => {
        
      })
      .catch(error => {
        console.error(error);
        alert('Error modifying PDF');
      });
  });