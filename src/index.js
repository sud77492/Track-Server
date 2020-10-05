require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRoutes);
//const mongoUri =
//  "mongodb+srv://admin:passwordpassword@cluster0.vcmfg.azure.mongodb.net/test?retryWrites=true&w=majority";
const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0.njh5j.mongodb.net/test?retryWrites=true&w=majority";

// const mongoUri =
//   "mongodb+srv://admin:passwordpassword@cluster0.vcmfg.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect("mongodb://localhost/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

/*mongoose
  .connect(mongoUri, {
    useUnifiedTopology: false,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(err.message);
  });*/

// mongoose
//   .connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
//   .then(() => console.log("Connected"))
//   .catch((err) => console.log("Caught", err.stack));

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo"), err;
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
