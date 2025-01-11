const { ShipmentConstructor, AddressesConstructor, PackageConstructor } = require('./constructors');

class PDFDataModel {
  constructor(data = {}) {
    this.shipment = new ShipmentConstructor();
    
    if (data.addresses) {
      data.addresses.forEach(address => this.setAddress(address));
    }
    if (data.packages) {
      data.packages.forEach(pkg => this.setPackage(pkg));
    }
  }

  setAddress(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid address data');
    }

    const address = new AddressesConstructor(
      data.fname,
      data.address,
      data.zip,
      data.country,
      data.reference,
      data.phone,
      data.email
    );
    this.shipment.addresses.push(address);
  }

  setPackage(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid package data');
    }

    const pkg = new PackageConstructor(
      data.qty,
      data.type,
      data.weight,
      data.length,
      data.width,
      data.height,
      data.nostacking,
      data.dgoods,
      data.UNnumber
    );
    this.shipment.packages.push(pkg);
  }

  getShipment() {
    return this.shipment;
  }

  
}

module.exports = PDFDataModel;