
function addressConstructorClosure() {

    let formObjects = [];
    
    function AddressesConstructor(fname, address, zip, country, reference, phone, email) {

        this.fname = fname;
        this.address = address;
        this.zip = zip;
        this.country = country;
        this.reference = reference;
        this.phone = phone;
        this.email = email;
        
    }

    function PackageConstructor(weight, length, width, height) {

        this.weight = weight;
        this.length = length;
        this.width = width;
        this.height = height;
        return this;
        
    }

    function ShipmentConstructor() {

        this.addresses = [];
        this.packages = [];
        
        
    }
    
    function Senderproto(...args) {

        AddressesConstructor.apply(this, args);
        
        
        
    }
   
    function Receiverproto(...args) { 
        
        AddressesConstructor.apply(this, args);
        
        
            
    }
    function CollectionAddressproto(...args) { 

        AddressesConstructor.apply(this, args);
        

    }

    
    function ReceiverIfNotTheSameproto(...args) { 

        AddressesConstructor.apply(this, args);
        
        
    }
 

    return {AddressesConstructor, PackageConstructor, ShipmentConstructor, Senderproto, Receiverproto, CollectionAddressproto, ReceiverIfNotTheSameproto};
}

function userConstructorClosure() {

    function UserConstructor(uname, password, uemail) {

        this.uname = uname;
        this.password = password;
        this.uemail = uemail;

    }

  
    return {UserConstructor};
}