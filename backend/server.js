// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./db");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(bodyParser.json());

// routes
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);

// simple health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
  .status(err.status || 500)
  .json({ message: err.message || "Server error" });
});


const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
