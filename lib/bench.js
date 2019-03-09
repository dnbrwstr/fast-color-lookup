const path = require("path");
const addon = require("../native/index.node");

const dataPath = path.join(__dirname, "..", "data", "data.txt");

const colorFinders = [];
const min = 0;
const max = 100;

for (let i = min; i < max; ++i) {
  const label = "Create " + (i + 1);
  console.time(label);
  colorFinders[i] = new addon.ColorFinder(dataPath, i + 1);
  console.timeEnd(label);
}

for (let i = min; i < max; ++i) {
  const colorFinder = colorFinders[i];
  const label = "Lookup " + (i + 1);
  const startTime = new Date();
  for (let j = 0; j < 100000; ++j) {
    colorFinder.getColorName(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255
    );
  }
  const average = (new Date() - startTime) / 100000;
  console.log(label + " " + average.toFixed(4) + "ms");
}
