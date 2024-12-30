class AddressesConstructor {
    constructor(fname, address, zip, country, reference, phone, email) {
      this.fname = fname;
      this.address = address;
      this.zip = zip;
      this.country = country;
      this.reference = reference;
      this.phone = phone;
      this.email = email;
    }
  }
  
  class PackageConstructor {
    constructor(weight, length, width, height) {
      this.weight = weight;
      this.length = length;
      this.width = width;
      this.height = height;
    }
  }
  
  class ShipmentConstructor {
    constructor() {
      this.addresses = [];
      this.packages = [];
    }
  }
  
  class Constructors {
    constructor() {
      this.formObjects = [];
    }
  
    AddressesConstructor = AddressesConstructor;
    PackageConstructor = PackageConstructor;
    ShipmentConstructor = ShipmentConstructor;
  
    Senderproto(...args) {
      return new AddressesConstructor(...args);
    }
  
    Receiverproto(...args) {
      return new AddressesConstructor(...args);
    }
  
    CollectionAddressproto(...args) {
      return new AddressesConstructor(...args);
    }
  
    ReceiverIfNotTheSameproto(...args) {
      return new AddressesConstructor(...args);
    }
  }

module.exports = {AddressesConstructor, PackageConstructor, ShipmentConstructor };

//function userConstructorClosure() {

    /*function UserConstructor(uname, password, uemail) {

        this.uname = uname;
        this.password = password;
        this.uemail = uemail;

    }

  
    //return {UserConstructor};*/
