# Fast Color Lookup

Relatively fast way to find the closest color to a given RGB color.

## Usage

```js
const lookup = require('fast-color-lookup');

const colorName = lookup(255, 255, 255);

console.log(colorName); // "white"
```