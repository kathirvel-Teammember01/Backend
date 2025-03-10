const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  driverId: { type: String, unique: true, required: true }, // Unique Driver ID
  driverName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  bikeModel: { type: String, default: "Not Provided" },
  insuranceExpiryDate: { type: Date },
  address: { type: String, default: "Not Provided" },
  vehicleNumber: { type: String, default: "Not Provided" },
  licenseExpiryDate: { type: Date },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  driverPhoto: { type: Buffer },
  licensePhoto: { type: Buffer },
  vehicleInsurancePhoto: { type: Buffer }
});

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;
