// Keys Configuration

if (process.env.ENVIRONMENT === "production") {
  module.exports = require("./prodKeys");
} else {
  module.exports = require("./devKeys");
}
