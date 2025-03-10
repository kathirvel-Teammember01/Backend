const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  driverName: String,
  mobileNumber: String,
  licenseNumber: String,
  bikeModel: String,
  insuranceExpiryDate: String,
  address: String,
  vehicleNumber: String,
  licenseExpiryDate: String,
  age: Number,
  email: String,
  preferredLocation: String,
  emergencyContact: String,
  languagesSpoken: String,
  driverPhoto: String,
  licensePhoto: String,
  vehicleInsurancePhoto: String,
});

// Prevent overwriting the model
const Driver = mongoose.models.Driver || mongoose.model('Driver', driverSchema);

module.exports = Driver;
