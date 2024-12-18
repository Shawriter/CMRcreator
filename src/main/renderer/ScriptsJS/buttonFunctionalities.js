

// Get data from the required fields
function getFormAddresses() {

        var breakswitch = 1;
        let addresses = [];
        let formObjects = [];
        let myConstructorClosure = addressConstructorClosure();

        for (var i = 0; i < 4; i++) {

            //Loop through the form data get the values by form id increment +1
            let formData = new FormData(document.querySelector("#form"+(i+1).toString()));

            if(breakswitch == 0){
                break;
            }
           

            for (var pair of formData.entries()) {

                if(i >= 2 && pair[1] == ""){

                    return;
                
                }
                
                let formChangeCounter = document.getElementById("form"+(i+1).toString()).id;
                addresses.push(pair[1]);
                //console.log(pair[0]+ ', '+ pair[1]);
                if(pair[0] == "Email"){

                    formChange(addresses, i, myConstructorClosure, formChangeCounter, formObjects);

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
                
        }

function formChange(addresses, i, myConstructorClosure, formChangeCounter, formObjects) {

  
               
                    //console.log(formChangeCounter);
                    
                    switch(formChangeCounter){  
                        case "form1":
                            
                            let sender = myConstructorClosure.Senderproto(...addresses);
                            //console.log(sender);
                            formObjects.push(sender);
                            console.log(formObjects[0]);
                            addresses.length = 0;
                            //console.log(sender.fname);
                            break;
                            
                        case "form2":
                            
                            let receiver = myConstructorClosure.Receiverproto(...addresses);
                            //console.log(receiver);
                            formObjects.push(receiver);
                            console.log(formObjects[1]);
                            addresses.length = 0;
                            //console.log(receiver.fname);
                            break;

                        case "form3":

                            let collection = myConstructorClosure.CollectionAddressproto(...addresses);
                            formObjects.push(collection);
                            console.log(formObjects[2]);
                            //addressObjects.length = 0;
                            break;

                        case "form4":

                            let ReceiverIfNotTheSame = myConstructorClosure.ReceiverIfNotTheSameproto(...addresses);
                            formObjects.push(ReceiverIfNotTheSame);
                            console.log(formObjects[3]);
                            //addressObjects.length = 0;
                            break;

                        default:
                            console.log("No form found");
                }
        
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
    // Initialize pkgnmbr if undefined
    if (typeof pkgnmbr == "undefined") {
        var pkgnmbr = 1;
    }

    // Select the container to be cloned
    var originalContainer = event.target.closest(".cllcontainer");
    
    //var originalContainer = event.target; // Get the clicked element
    //alert(`You clicked: ${originalContainer.innerText}`);
    // Clone the container
    var clonedContainer = originalContainer.cloneNode(true);

    // Copy input values
    var originalInputs = originalContainer.querySelectorAll("input");
    var clonedInputs = clonedContainer.querySelectorAll("input");

    for (let i = 0; i < originalInputs.length; i++) {
        clonedInputs[i].value = originalInputs[i].value; // Copy text and values
        clonedInputs[i].checked = originalInputs[i].checked; // Copy checked state
    }

    // Copy dropdown values
    var originalSelects = originalContainer.querySelectorAll("select");
    var clonedSelects = clonedContainer.querySelectorAll("select");

    for (let i = 0; i < originalSelects.length; i++) {
        clonedSelects[i].value = originalSelects[i].value; // Copy dropdown selections
    }

    // Clear the unique ID from the cloned container and assign a new ID
    var divslength = document.querySelectorAll(".cllcontainer").length;
    clonedContainer.id = "appended" + divslength;

    // Append the cloned container to the DOM
    document.body.appendChild(clonedContainer);

    // Update package numbers for all containers
    updatePackageNumbers();
}

// Remove cllcontainer div package element
function removePackageNode(event) {
    // Find the closest container with the class 'cllcontainer' and remove it
    var containerToRemove = event.target.closest(".cllcontainer");
    if (containerToRemove) {
        containerToRemove.remove();
    }
    // Update package numbers dynamically
    updatePackageNumbers();
}

// Update package numbers dynamically
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