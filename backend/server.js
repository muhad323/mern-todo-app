const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes");
const TodoRoutes = require("./routes/TodoRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", UserRoutes);
app.use("/api/todos", TodoRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongoDB connected Successfully");
    app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit server if DB not connected
  });

