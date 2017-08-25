'use strict'
let MarkerMaker = require('../src/main.js')

/*const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)
const { window } = (new JSDOM(`...`))
const { document } = (new JSDOM(`...`)).window;*/

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    let color = MarkerMaker('red')
    let result = { pinColor: 'rgb(173, 216, 230)', pinColorDark: 'rgb(113, 156, 170)' }
    expect(color).toBe({ result })
  })
})
