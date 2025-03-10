// Import required packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// Import Models from models folder
const Fourwheeeler = require('./Driver Details/fourwheeler.js');
const Auto = require('./Driver Details/auto.js');
const Twowheeler = require('./Driver Details/twowheeler.js');


// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Check if MONGO_URI exists
if (!MONGO_URI) {
  console.error("❌ MongoDB URI is undefined. Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI )
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));


app.use("/api/fourwheeler",Fourwheeeler );
app.use("/api/auto",Auto );
app.use("/api/twowheeler",Twowheeler );

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
