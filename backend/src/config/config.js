const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVars = process.env;

module.exports = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  secretKey: envVars.SECRET_KEY,
};
