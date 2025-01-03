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
    constructor(qty, type, weight, length, width, height, nostacking = false, dgoods = false, UNnumber = '') {
      this.qty = qty;
      this.type = type;
      this.weight = weight;
      this.length = length;
      this.width = width;
      this.height = height;
      this.volumem3 = this.calculateVolume(length, width, height);
      this.nostacking = Boolean(nostacking);
      this.dgoods = Boolean(dgoods);
      this.UNnumber = UNnumber;
    }
  
    calculateVolume(length, width, height) {
      return (length * width * height) / 1000000; 
    }
  }
  
  class ShipmentConstructor {
    constructor() {
      this.addresses = [];
      this.packages = [];
    }
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
