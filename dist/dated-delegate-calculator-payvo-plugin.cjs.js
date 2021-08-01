'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./dated-delegate-calculator-payvo-plugin.cjs.prod.js");
} else {
  module.exports = require("./dated-delegate-calculator-payvo-plugin.cjs.dev.js");
}
