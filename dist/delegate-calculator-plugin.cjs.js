'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./delegate-calculator-plugin.cjs.prod.js");
} else {
  module.exports = require("./delegate-calculator-plugin.cjs.dev.js");
}
