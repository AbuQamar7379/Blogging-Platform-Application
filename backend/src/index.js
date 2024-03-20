const mongoose = require("mongoose");
const app = require("./app.js");
const { mongoUri, port } = require("./config/config");

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Mongo DB connected");

    app.listen(port, () => console.log("Server running at " + port));
  })
  .catch((err) => console.log("Failed to connect DB", err));
