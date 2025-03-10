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
  emergencyContact: String,
  driverPhoto: String,
  licensePhoto: String,
  vehicleInsurancePhoto: String,
});

// Prevent overwriting the model


module.exports =  mongoose.model('Two Wheeler Driver', driverSchema);;
