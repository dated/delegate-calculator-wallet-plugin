'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./dated-delegate-calculator-plugin.cjs.prod.js");
} else {
  module.exports = require("./dated-delegate-calculator-plugin.cjs.dev.js");
}
