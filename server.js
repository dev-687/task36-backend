const express = require('express');
const mongoose = require("mongoose");
const mongoDBConn = require('./config/MongoDBConfig'); 
const bodyParser = require('body-parser');
const router = require('./routers/routers');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend access
  methods: ["GET", "POST","DELETE"],
  credentials: true
}));
app.use(express.static('uploads')); 
app.use('/api/v1', router);

// Connect to MongoDB before starting the server
mongoDBConn().then(() => {
    console.log("MongoDB Connected Successfully");
  }).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
