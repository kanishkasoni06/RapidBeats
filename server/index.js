// app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/Routes");

const app = express();
const PORT = 3000; // You can change the port if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoUri =
  "mongodb+srv://kharepushkar2804:UpnVtrC9i1G2c2FM@cluster0.te3yvp4.mongodb.net/userdb";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
