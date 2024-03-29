
function spawnPDF() {  
    var doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.save('Test.pdf');

}
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
function appendPackageNode() {
    
    var appended = document.querySelector(".cllcontainer");
    var divslength = document.querySelectorAll(".cllcontainer").length;
    //console.log(divslength);
    appended.id = "appended" + divslength;
    document.body.appendChild(appended.cloneNode(true));
    
  }

//Remove cllcontainer div package element
function removePackageNode(event) {

    event.target.parentNode.parentNode.parentNode.remove();

   }
