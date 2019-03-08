var addon = require('../native');

const ColorFinder = addon.ColorFinder;
const colorFinder = new ColorFinder();

module.exports = {
  getColorName(r, g, b) {
    return colorFinder.getColorName(r, g, b);
  }
};
