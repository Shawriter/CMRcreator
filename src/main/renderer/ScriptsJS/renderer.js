document.addEventListener('DOMContentLoaded', () => {
    
    
    document.getElementById('plus_icon').addEventListener('click', appendPackageNode);
    document.getElementById('minus_icon').addEventListener('click', removePackageNode);

    
// Get data from the required fields
function getFormAddresses(jsObAddrPkgs) {

    var breakswitch = 1;
    let formObjects = [];
    let addresses = [];
    for (var i = 0; i < 4; i++) {

        //Loop through the form data get the values by form id increment +1
        let formData = new FormData(document.querySelector("#form"+(i+1).toString()));

        if(breakswitch == 0){
            break;
        }
       

        for (var pair of formData.entries()) {

            if(i >= 4 && pair[1] == ""){

                return;
            
            }
            
            let formChangeCounter = document.getElementById("form"+(i+1).toString()).id;
            
            console.log(pair[0]+ ', '+ pair[1]);
            console.log(formChangeCounter, i);
            if(pair[0] == "Email"){

                formChange(jsObAddrPkgs, i, formChangeCounter, formObjects);

            }
            
            
        }
            //console.log(formObjects[0]);
            
            //myConstructorClosure.uniteFormData();

            if(pair[0] == "fname" || pair[0] == "address" || pair[0] == "Country"){
                
                if(pair[1] == ""){

                    var breakswitch = 0;

                    alert("Please fill out all the required fields");
                    break;

                }

            }
        }
        console.log(formObjects);
        return formObjects;
            
    }

function formChange(jsObAddrPkgs, addresses, formChangeCounter, formObjects) {


                //console.log(jsObAddrPkgs.shipment);

                switch(formChangeCounter){  
                    case "form1":
                        
                        //formObjects.push(jsObAddrPkgs.shipment.addresses);
                        jsObAddrPkgs.shipment.addresses.push(addresses);
                        //formObjects.push(sender);
                        //console.log(formObjects[0]);
                        addresses.length = 0;
                        //console.log("form1");
                        break;
                        
                    case "form2":
                        
                        /*let receiver = jsObAddrPkgs.shipment.Receiverproto(...addresses);
                        console.log(receiver);
                        formObjects.push(receiver);
                        //console.log(formObjects[1]);*/
                        formObjects.push(jsObAddrPkgs.shipment.addresses);
                        
                        addresses.length = 0;
                        //console.log("form2");
                        break;

                    case "form3":

                        /*let collection = jsObAddrPkgs.shipment.CollectionAddressproto(...addresses);
                        formObjects.push(collection);*/
                        formObjects.push(jsObAddrPkgs.shipment.addresses);
                        
                        
                        //addressObjects.length = 0;
                        break;

                    case "form4":

                        /*let ReceiverIfNotTheSame = jsObAddrPkgs.shipment.ReceiverIfNotTheSameproto(...addresses);
                        formObjects.push(ReceiverIfNotTheSame);*/
                        formObjects.push(jsObAddrPkgs.shipment.addresses);
                        
                        //addressObjects.length = 0;
                        break;

                    default:
                        console.log("No form found");
            }
    
}
function getPkgs(jsObAddrPkgs) {
   

    let pkgObjects = [];

}
/**
* @Clear all the fields in the form
*/

function clearForm() {

    var i;
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

    // Copy input values
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
      let pkgObjectsFilled = getFormAddresses(jsObAddrPkgs);
      //console.log(typeof formObjectsFilled, "in renderer.js");
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