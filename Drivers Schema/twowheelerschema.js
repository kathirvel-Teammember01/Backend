const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  driverId: { type: String, unique: true },
  username: { type: String, unique: true, required: true }, // Added unique username field
  driverName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  bikeModel: { type: String, default: "Not Provided" },
  insuranceExpiryDate: { type: Date, default: null },
  address: { type: String, default: "Not Provided" },
  vehicleNumber: { type: String, default: "Not Provided" },
  licenseExpiryDate: { type: Date, default: null },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  driverPhoto: { type: String },
  licensePhoto: { type: String },
  vehicleInsurancePhoto: { type: String },
});

module.exports = mongoose.model('TwoWheelerDriver', driverSchema);
