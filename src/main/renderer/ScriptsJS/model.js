const { AddressesConstructor, PackageConstructor, ShipmentConstructor } = require('./constructors');

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
    const pkg = new PackageConstructor(
      data.weight,
      data.length,
      data.width,
      data.height
    );
    this.shipment.packages.push(pkg);
  }

  getShipment() {
    return this.shipment;
  }
}

module.exports = PDFDataModel;