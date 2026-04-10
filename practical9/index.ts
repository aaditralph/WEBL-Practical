const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI || "";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
