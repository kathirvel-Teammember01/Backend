require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Generate unique ID
const Driver = require('../Drivers Schema/Fourwheelerschema');

const router = express.Router();

// Multer storage setup
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ✅ Create a New Driver (POST)
router.post('/upload', upload.fields([
  { name: 'driverPhoto' },
  { name: 'licensePhoto' },
  { name: 'vehicleInsurancePhoto' }
]), async (req, res) => {
  try {
    const { driverName, mobileNumber, licenseNumber, bikeModel, insuranceExpiryDate,
      address, vehicleNumber, licenseExpiryDate, age, email } = req.body;

    if (!driverName || !mobileNumber || !licenseNumber || !age || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (parseInt(age) < 18) {
      return res.status(400).json({ message: "Age must be 18 or older" });
    }

    const newDriver = new Driver({
      driverId: uuidv4(), // Generate Unique ID
      driverName,
      mobileNumber,
      licenseNumber,
      bikeModel: bikeModel || "Not Provided",
      insuranceExpiryDate: insuranceExpiryDate ? new Date(insuranceExpiryDate) : null,
      address: address || "Not Provided",
      vehicleNumber: vehicleNumber || "Not Provided",
      licenseExpiryDate: licenseExpiryDate ? new Date(licenseExpiryDate) : null,
      age,
      email,
      driverPhoto: req.files['driverPhoto'] ? req.files['driverPhoto'][0].buffer : null,
      licensePhoto: req.files['licensePhoto'] ? req.files['licensePhoto'][0].buffer : null,
      vehicleInsurancePhoto: req.files['vehicleInsurancePhoto'] ? req.files['vehicleInsurancePhoto'][0].buffer : null
    });

    await newDriver.save();
    res.status(200).json({ message: "Driver added successfully", driver: newDriver });
  } catch (error) {
    res.status(500).json({ message: "Error adding driver", error: error.message });
  }
});

// ✅ Get All Drivers (GET)
router.get('/view', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drivers", error: error.message });
  }
});

// ✅ Get Driver by driverId (GET)
router.get('/view/:id', async (req, res) => {
  try {
    const driver = await Driver.findOne({ driverId: req.params.id });
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: "Error fetching driver details", error: error.message });
  }
});

// ✅ Update Driver (PUT)
router.put('/update/:id', async (req, res) => {
  try {
    const driver = await Driver.findOne({ driverId: req.params.id });
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    driver.driverName = req.body.driverName || driver.driverName;
    driver.mobileNumber = req.body.mobileNumber || driver.mobileNumber;
    driver.vehicleNumber = req.body.vehicleNumber || driver.vehicleNumber;

    await driver.save();
    res.status(200).json({ message: "Driver updated successfully", driver });
  } catch (error) {
    res.status(500).json({ message: "Error updating driver", error: error.message });
  }
});

// ✅ Delete Driver (DELETE)
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedDriver = await Driver.findOneAndDelete({ driverId: req.params.id });
    if (!deletedDriver) return res.status(404).json({ message: "Driver not found" });

    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting driver", error: error.message });
  }
});

module.exports = router;
