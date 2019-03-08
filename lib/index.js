var addon = require('../native');

const ColorFinder = addon.ColorFinder;
const colorFinder = new ColorFinder();

module.exports = {
  getColorName(r, g, b) {
    return new Promise(function (resolve, reject) {
      colorFinder.getColorName(r, g, b, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
};
