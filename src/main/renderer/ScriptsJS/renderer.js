document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('clearbutton').addEventListener('click', clearForm);
    document.getElementById('plus_icon').addEventListener('click', appendPackageNode);
    document.getElementById('minus_icon').addEventListener('click', removePackageNode);

    


function formChange(jsObAddrPkgs, addresses) {

                jsObAddrPkgs.shipment.addresses.push([...addresses]); 
                addresses.length = 0; 
                console.log(jsObAddrPkgs.shipment.addresses);
               
}

function getFormAddresses(jsObAddrPkgs) {
    
    var breakswitch = 1;

    for (var i = 0; i < 4; i++) {
        let formData = new FormData(document.querySelector("#form" + (i + 1).toString()));
        let formChangeCounter = "form" + (i + 1).toString();
        let addresses = []; // Reset addresses for each form
    
        for (var pair of formData.entries()) {
            addresses.push([pair[0], pair[1]]);

            /*if(pair[0] == "fname" || pair[0] == "address" || pair[0] == "Country"){
                
                if(pair[1] == ""){

                    var breakswitch = 0;

                    alert("Please fill out all the required fields");
                    break;

                }

            }*/
        }
    
        // Call formChange only once after collecting all entries
        formChange(jsObAddrPkgs, addresses);
    }
}

function getPkgs(jsObAddrPkgs) {
   

    let pkgObjects = [];

}
/**
* @Clear all the fields in the form
*/

function clearForm() {

    let i;

    for (i = 0; i < 4; i++) {
       document.getElementById("form"+(i+1).toString()).reset();
    }

}
//Duplicate cllcontainer div package element
function appendPackageNode(event) {

    event.preventDefault();

    if (typeof pkgnmbr == "undefined") {
        var pkgnmbr = 1;
    }


    var originalContainer = event.target.closest(".cllcontainer");


    var clonedContainer = originalContainer.cloneNode(true);

    
    var originalInputs = originalContainer.querySelectorAll("input");
    var clonedInputs = clonedContainer.querySelectorAll("input");

    for (let i = 0; i < originalInputs.length; i++) {
        clonedInputs[i].value = originalInputs[i].value; 
        clonedInputs[i].checked = originalInputs[i].checked; 
    }


    var originalSelects = originalContainer.querySelectorAll("select");
    var clonedSelects = clonedContainer.querySelectorAll("select");

    for (let i = 0; i < originalSelects.length; i++) {
        clonedSelects[i].value = originalSelects[i].value; 
    }


    var divslength = document.querySelectorAll(".cllcontainer").length;
    clonedContainer.id = "appended" + divslength;
    

    document.body.appendChild(clonedContainer);

    const clonedPlusIcon = clonedContainer.querySelector('#plus_icon');
    if (clonedPlusIcon) {
      clonedPlusIcon.id = "plus_icon" + divslength;
    }

    
    clonedPlusIcon.addEventListener('click', (e) => {
      console.log('Cloned container clicked:', clonedPlusIcon.id);
     
    });
  


    updatePackageNumbers();
}

// Remove cllcontainer div package element
function removePackageNode(event) {

    event.preventDefault();


    var containerToRemove = event.target.closest(".cllcontainer");
    if (containerToRemove && document.querySelectorAll(".cllcontainer").length > 1) {
        
        containerToRemove.remove();

    }
    else {

        alert("You can't remove the last package");

    }

    updatePackageNumbers();
}


function updatePackageNumbers() {

    var allContainers = document.querySelectorAll(".cllcontainer");
    var totalPackages = allContainers.length;

    // Recalculate the package numbers for all containers
    allContainers.forEach((container, index) => {
        var packageNumberElement = container.querySelector("#pkgnumber");
        if (packageNumberElement) {
            packageNumberElement.innerText = `${index + 1}/${totalPackages}`;
        }
    });
}


    
    
document.getElementById('submitbutton').addEventListener('click', async () => {
     
      
      const jsObAddrPkgs = await window.electron.getPDFDataModel();
      
      let formObjectsFilled = getFormAddresses(jsObAddrPkgs);
      //let pkgObjectsFilled = getFormAddresses(jsObAddrPkgs);
      //console.log(typeof formObjectsFilled, "in renderer.js");
      //console.log(jsObAddrPkgs, "in renderer.js");
      const inputPath = 'CMR_templates/CMRtemplate.pdf';
      const outputPath = 'output.pdf';
      const text = JSON.stringify(jsObAddrPkgs.shipment, null, 2); 
  
      /*window.electron.modifyPDF({ inputPath, outputPath, text, formObjectsFilled})
        .then(response => {
          if (response.success) {

            console.log('PDF modified successfully');
            
            /*const pdfBuffer = window.electron.createBuffer(response.pdf, 'base64');
            
            const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            a.href = url;
            a.download = 'modified.pdf';
            a.click();
          
          } else {
            alert('Error modifying PDF: ' + response.error);
          }
        })
        .catch(error => {
          console.error(error);
          alert('Error modifying PDF');
        });*/
    });
  });