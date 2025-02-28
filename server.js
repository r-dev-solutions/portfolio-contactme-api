require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Error connecting to MongoDB:", err));

console.log("MongoDB URI:", process.env.MONGO_URI);


// Define a Mongoose schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// API endpoint to handle form submission
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Log the data to the console
    console.log("Form Data Received:", { name, email, message });

    // Save data to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).json({ message: "Failed to save data." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
