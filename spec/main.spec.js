let MarkerMaker = require('../main.js')
console.log(MarkerMaker)

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    let color = MarkerMaker.colorExtractor('lightblue')
    let result = {pinColor: 'rgb(173, 216, 230)', pinColorDark: 'rgb(113, 156, 170)'}
    expect(color).toBe({result});
  });
});
