const expect = require("expect.js");
const lookupColor = require("../lib");

describe("Color lookup", function() {
  it("Looks up a color", function(done) {
    const result = lookupColor(0, 0, 0);
    expect(result).to.be.a("string");
    done();
  });
});
