const path = require('path');
const addon = require('../native/index.node');

const colorFinder = new addon.ColorFinder(path.join(
  __dirname,
  "..",
  "data",
  "data.txt"
));

module.exports = {
  getColorName(r, g, b) {
    return colorFinder.getColorName(r, g, b);
  }
};
