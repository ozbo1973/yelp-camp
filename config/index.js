// Keys Configuration

if (process.env.ENVIRONMENT === "production") {
  module.exports = require("./keys");
} else {
  module.exports = require("./devKeys");
}
