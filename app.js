const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/connect");
const Router = require("./routers");

dotenv.config(); // Loads variables from .env

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
  console.error("❌ MONGO_URL is not defined in .env");
  process.exit(1);
}

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// 🔥 CORS config - Must be above routes
app.use(cors({
  origin: "http://localhost:3000", // Update if deployed
  credentials: true
}));

app.use(Router);

const start = async () => {
  try {
    await connectDB(mongoURI);
    app.listen(port, () => {
      console.log(`✅ Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
};

start();
