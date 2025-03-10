const express = require('express');
const multer = require('multer');
const Driver = require('../Drivers Schema/twowheelerschema');

const router = express.Router();

// Multer Storage (Upload Memory)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB Limit
});

// ✅ Create Driver (POST)
router.post('/upload', upload.fields([
  { name: 'driverPhoto' },
  { name: 'licensePhoto' },
  { name: 'vehicleInsurancePhoto' }
]), async (req, res) => {
  try {
    const { username, driverName, mobileNumber, licenseNumber, bikeModel, insuranceExpiryDate,
      address, vehicleNumber, licenseExpiryDate, age, email, emergencyContact } = req.body;

    if (!username || !driverName || !mobileNumber || !licenseNumber || !age || !email || !emergencyContact) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if username already exists
    const existingUser = await Driver.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "❌ Username already exists. Please choose a different one." });
    }

    const newDriver = new Driver({
      username,
      driverName,
      mobileNumber,
      licenseNumber,
      bikeModel,
      insuranceExpiryDate: insuranceExpiryDate ? new Date(insuranceExpiryDate) : null,
      address,
      vehicleNumber,
      licenseExpiryDate: licenseExpiryDate ? new Date(licenseExpiryDate) : null,
      age,
      email,
      emergencyContact,
      driverPhoto: req.files['driverPhoto'] ? req.files['driverPhoto'][0].buffer.toString('base64') : null,
      licensePhoto: req.files['licensePhoto'] ? req.files['licensePhoto'][0].buffer.toString('base64') : null,
      vehicleInsurancePhoto: req.files['vehicleInsurancePhoto'] ? req.files['vehicleInsurancePhoto'][0].buffer.toString('base64') : null,
    });

    await newDriver.save();
    res.status(201).json({ message: "✅ Driver added successfully", driver: newDriver });
  } catch (error) {
    res.status(500).json({ message: "❌ Error adding driver", error: error.message });
  }
});

// ✅ Get All Drivers
router.get('/view', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching drivers", error: error.message });
  }
});

// ✅ Get Driver by Username
router.get('/view/:username', async (req, res) => {
  try {
    const driver = await Driver.findOne({ username: req.params.username });
    if (!driver) return res.status(404).json({ message: "❌ Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching driver details", error: error.message });
  }
});

// ✅ Update Driver
router.put('/update/:username', upload.fields([
  { name: 'driverPhoto' },
  { name: 'licensePhoto' },
  { name: 'vehicleInsurancePhoto' }
]), async (req, res) => {
  try {
    const driver = await Driver.findOne({ username: req.params.username });
    if (!driver) return res.status(404).json({ message: "❌ Driver not found" });

    const updateData = { ...req.body };
    if (req.files['driverPhoto']) updateData.driverPhoto = req.files['driverPhoto'][0].buffer.toString('base64');
    if (req.files['licensePhoto']) updateData.licensePhoto = req.files['licensePhoto'][0].buffer.toString('base64');
    if (req.files['vehicleInsurancePhoto']) updateData.vehicleInsurancePhoto = req.files['vehicleInsurancePhoto'][0].buffer.toString('base64');

    await Driver.updateOne({ username: req.params.username }, updateData);
    res.status(200).json({ message: "✅ Driver updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error updating driver", error: error.message });
  }
});

// ✅ Delete Driver
router.delete('/delete/:username', async (req, res) => {
  try {
    const driver = await Driver.findOneAndDelete({ username: req.params.username });
    if (!driver) return res.status(404).json({ message: "❌ Driver not found" });
    res.status(200).json({ message: "✅ Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting driver", error: error.message });
  }
});

module.exports = router;
