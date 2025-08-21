const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");

const app = express();

//configure .env package
require("dotenv").config();

//Middlewares
app.use(express.json()); //this will allow us to receive and send json data
app.use(cors());
app.use("/api/users", userRoute);

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`Server running on port...: ${port}`);
});

//connecting with database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));
