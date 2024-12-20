const { AddressesConstructor, PackageConstructor, ShipmentConstructor } = require('./constructors');

class PDFDataModel {
  constructor() {
    this.shipment = new ShipmentConstructor();
  }

  setAddress(data) {
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
    const package = new PackageConstructor(
      data.weight,
      data.length,
      data.width,
      data.height
    );
    this.shipment.packages.push(package);
  }

  getShipment() {
    return this.shipment;
  }
}

module.exports = PDFDataModel;