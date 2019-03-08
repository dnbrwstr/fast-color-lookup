var addon = require('../native');
const ColorFinder = addon.ColorFinder;

const colorFinder = new ColorFinder();

console.time('Lookup speed');
for (let i = 0; i < 1000; ++i) {
  colorFinder.getColorName(Math.random() * 255, Math.random() * 255, Math.random() * 255);
}
console.timeEnd('Lookup speed');
