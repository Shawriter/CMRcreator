document.addEventListener('DOMContentLoaded', () => {
    
    initializeEventListeners();
    
    function initializeEventListeners() {
        document.getElementById('clearbutton').addEventListener('click', clearForm);
        document.getElementById('submitbutton').addEventListener('click', getFormAddresses);
        document.getElementById('plus_icon').addEventListener('click', appendPackageNode);
        document.getElementById('minus_icon').addEventListener('click', removePackageNode);
      }
    


function formChange(jsObAddrPkgs, addresses, pkgObjects) {
                
    if (!jsObAddrPkgs.shipment) {
        jsObAddrPkgs.shipment = {};
      }
      if (!jsObAddrPkgs.shipment.addresses) {
        jsObAddrPkgs.shipment.addresses = [];
      }
      if (!jsObAddrPkgs.shipment.packages) {
        jsObAddrPkgs.shipment.packages = [];
      }
    
      if (addresses.length > 10) {
        jsObAddrPkgs.shipment.addresses.push([...addresses]);
        addresses.length = 0;
      }
      if (pkgObjects) {
        jsObAddrPkgs.shipment.packages.push([...pkgObjects]);
      }
    
      if (jsObAddrPkgs.shipment.addresses != null && jsObAddrPkgs.shipment.packages != null) {
        return jsObAddrPkgs.shipment;
      }
                   
}

function getFormAddresses(jsObAddrPkgs) {
    
    var breakswitch = 1;
    let k = 0; //iterator
    let addresses = [];
    let pkgObjects = [];
    

    try {
        
        for (let i = 0; i < 4; i++) {

            let formData = new FormData(document.querySelector("#form" + (i + 1).toString()));
            //let formChangeCounter = "form" + (i + 1).toString();
            
        
            for (let pair of formData.entries()) {

                addresses.push([pair[0], pair[1]]);

                /*if ((pair[0] == "fname" || pair[0] == "address" || pair[0] == "Country") && (breakswitch != 0)) {
                    
                    k++; 
                    
                    /*if (k >= (formData.entries.length/2)){

                        break;

                    }

                    if (pair[1] == "") {

                        breakswitch = 0;
                        alert("Please fill out all the required fields");
                        break;
                }*/
            }
        }
        
    
    const cllContainers = document.querySelectorAll('.cllcontainer');

    
    cllContainers.forEach((container) => {
            

            let inputs = container.querySelectorAll('input');
            let selects = container.querySelectorAll('select');

            selects.forEach(select => {
                //console.log(`Select ID: ${select.id}, Value: ${select.value}`);
                pkgObjects.push([select.id, select.value]);
            });
            inputs.forEach(input => {

                if (input.type === 'checkbox') {
                    //console.log(`Input ID: ${input.id}, Checked: ${input.checked}`);
                    pkgObjects.push([input.id, input.checked]);
                } else {
                    //console.log(`Input ID: ${input.id}, Value: ${input.value}`);
                    pkgObjects.push([input.id, input.value]);
                }
    });

  });

    }catch (e) {

        console.error(e);

    }

  formChange(jsObAddrPkgs, addresses, pkgObjects);
}

function getPkgs(jsObAddrPkgs) {
   

    

}
/**
* @Clear all the fields in the form
*/

function clearForm() {

    let i;
    let clearsender = true;
    
    for (i = 0; i < 4; i++) {
       document.getElementById("form"+(i+1).toString()).reset();
    }
    
    //confirm("Are you sure you want to clear all the fields and start over?");
    removePackageNode(null, clearsender);
    initializeEventListeners();
    
    
}
//Duplicate cllcontainer div package element
function appendPackageNode(event) {

    

    if (typeof pkgnmbr == "undefined") {
        var pkgnmbr = 1;
    }


    let originalContainer = event.target.closest(".cllcontainer");


    let clonedContainer = originalContainer.cloneNode(true);

    
    let originalInputs = originalContainer.querySelectorAll("input");
    let clonedInputs = clonedContainer.querySelectorAll("input");

    for (let i = 0; i < originalInputs.length; i++) {
        clonedInputs[i].value = originalInputs[i].value; 
        clonedInputs[i].checked = originalInputs[i].checked; 
    }


    let originalSelects = originalContainer.querySelectorAll("select");
    let clonedSelects = clonedContainer.querySelectorAll("select");

    for (let i = 0; i < originalSelects.length; i++) {
        clonedSelects[i].value = originalSelects[i].value; 
    }


    let divslength = document.querySelectorAll(".cllcontainer").length;
    clonedContainer.id = "appended" + divslength;
    console.log(clonedContainer.id);
    
    moveButtonsDown();

    document.body.appendChild(clonedContainer);
    
    

    let clonedPlusIcon = clonedContainer.querySelector('#plus_icon');
    let clonedMinusIcon = clonedContainer.querySelector('#minus_icon');

    //console.log(clonedPlusIcon, "clonedPlusIcon");

    //At this point every pkg div gets the same id plus_icon, as it doesnt matter for the functionality, it is left as is
    if (clonedPlusIcon) {
        
        //const newId = "plus_icon" + icon++;
        //clonedPlusIcon.id = newId;
        clonedPlusIcon.addEventListener('click', appendPackageNode);  
        clonedMinusIcon.addEventListener('click', removePackageNode); 

    } else {

        console.error('Cloned container is missing #plus_icon');

    }


    updatePackageNumbers();

}
function moveButtonsUp() {

    console.log("moveButtonsUp");
    let one = 1;

    const buttons = document.querySelector('.buttons-container');

    if (buttons) {

        const currentTop = parseInt(buttons.style.top || '0', 10);
        console.log(currentTop);

        if (currentTop != 0) {

            buttons.style.top = `${currentTop - 110}px`;
        }
       

    } else {

      console.error('Buttons container not found');

    }

}
function moveButtonsDown() {
    
    console.log("moveButtonsDown");
    let one = 1;

    const buttons = document.querySelector('.buttons-container');
    const body = document.querySelector('.first_form_body');
    const currentBodyHeight = parseInt(body.style.height || '100', 10);
     
    if (buttons) {

        const currentTop = parseInt(buttons.style.top || '0', 10);
        
        console.log(currentBodyHeight);

        if (currentTop == 0) {
            buttons.style.top = '130px';
            body.style.height =  `${currentBodyHeight + 50}vh`;
            console.log(body.style.height);
        }
        else if (currentTop > 3700  && (one != 0)) { // Not letting the buttons go too far down
            
            buttons.style.top = '3400px';
            one = 0;

        } else {
            buttons.style.top = `${currentTop + 110}px`;

            body.style.height =  `${currentBodyHeight + 50}vh`;
            console.log(body.style.height);
        }
        
        console.log(buttons.style.top);

    } else {

      console.error('Buttons container not found');

    }

}
// Remove cllcontainer div package element
function removePackageNode(event, clearsender) {

    
    if (event){
        
        clearsender = false;
        var containerToRemove = event.target.closest(".cllcontainer");

    }
    
    /*if (clearsender = true){

        let containers = document.querySelectorAll(".cllcontainer");

        containers.forEach(container => {
            
            if (containers.length > 1 && (container.id != 'firstcontainer')){
                  
                container.remove();

            }
            else {

                return;

            }
            
        });

    }*/

    if (containerToRemove && document.querySelectorAll(".cllcontainer").length > 1) {
        
        containerToRemove.remove();
        moveButtonsUp();

    }
    else {
        
        if(containers = null){

            alert("You can't remove the last package");

        }
        
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
      //console.log(jsObAddrPkgs.shipment.addresses);
      //console.log(jsObAddrPkgs.shipment.packages)
      const inputPath = 'CMR_templates/CMRtemplate.pdf';
      console.log(inputPath);
      const outputPath = 'output.pdf';
      //const text = JSON.stringify(jsObAddrPkgs.shipment, null, 2); 
      const text = jsObAddrPkgs.shipment.addresses;

      window.electron.modifyPDF({ inputPath, outputPath, text})
        .then(response => {
          if (response.success) {

            console.log(text, 'PDF modified successfully');
            
            /*const pdfBuffer = window.electron.createBuffer(response.pdf, 'base64');
            
            const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            a.href = url;
            a.download = 'modified.pdf';
            a.click();*/
          
          } else {
            alert('Error modifying PDF: ' + response.error);
          }
        })
        .catch(error => {
          console.error(error);
          alert('Error modifying PDF');
        });
    });
  });