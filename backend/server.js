// Import packages
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Temporary storage
let users = [];
let bookings = [];
let messages = [];

// ----------------------------------
// HOME API
// ----------------------------------

app.get("/", (req, res) => {
  res.send("Welcome to TravelMate Backend!");
});

// ----------------------------------
// USER REGISTRATION API
// ----------------------------------

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({
      message: "Email already registered",
    });
  }

  users.push({ name, email, password });

  res.status(201).json({
    message: "Registration successful!",
  });
});

// ----------------------------------
// USER LOGIN API
// ----------------------------------

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    message: "Login successful!",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

// ----------------------------------
// DESTINATIONS API
// ----------------------------------

app.get("/api/destinations", (req, res) => {
  const destinations = [
    {
      id: 1,
      name: "New York",
      country: "USA",
      price: 50000,
    },
    {
      id: 2,
      name: "Paris",
      country: "France",
      price: 60000,
    },
    {
      id: 3,
      name: "Bali",
      country: "Indonesia",
      price: 35000,
    },
  ];

  res.status(200).json(destinations);
});

// ----------------------------------
// CREATE BOOKING API
// ----------------------------------

app.post("/api/bookings", (req, res) => {
  const { travellerName, travellerEmail, destination, travelDate, travellers } =
    req.body;

  if (
    !travellerName ||
    !travellerEmail ||
    !destination ||
    !travelDate ||
    !travellers
  ) {
    return res.status(400).json({
      message: "All booking fields are required",
    });
  }

  const booking = {
    id: Date.now(),
    travellerName,
    travellerEmail,
    destination,
    travelDate,
    travellers,
  };

  bookings.push(booking);

  res.status(201).json({
    message: "Booking successful!",
    booking: booking,
  });
});

// ----------------------------------
// GET ALL BOOKINGS API
// ----------------------------------

app.get("/api/bookings", (req, res) => {
  res.status(200).json(bookings);
});

// ----------------------------------
// CANCEL BOOKING API
// ----------------------------------

app.delete("/api/bookings/:id", (req, res) => {
  const bookingId = Number(req.params.id);

  const bookingExists = bookings.some((booking) => booking.id === bookingId);

  if (!bookingExists) {
    return res.status(404).json({
      message: "Booking not found",
    });
  }

  bookings = bookings.filter((booking) => booking.id !== bookingId);

  res.status(200).json({
    message: "Booking cancelled successfully!",
  });
});

// ----------------------------------
// CONTACT API
// ----------------------------------

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const contactMessage = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
  };

  messages.push(contactMessage);

  res.status(201).json({
    message: "Your message has been submitted successfully!",
  });
});

// ----------------------------------
// CONNECT MONGODB AND START SERVER
// ----------------------------------

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`TravelMate server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
