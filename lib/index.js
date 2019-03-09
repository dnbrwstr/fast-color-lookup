const path = require("path");
const addon = require("../native/index.node");

const dataPath = path.join(__dirname, "..", "data", "data.txt");
const colorFinder = new addon.ColorFinder(dataPath, 32);

module.exports = {
  getColorName(r, g, b) {
    return colorFinder.getColorName(r, g, b);
  }
};
