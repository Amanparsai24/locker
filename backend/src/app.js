const express = require("express");
const cors = require("cors"); // add this
const authRoutes = require("./modules/auth/auth.routes");

const app = express();

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // tumhara React dev server
    credentials: true, // agar cookies bhejni ho
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Fallback
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;
