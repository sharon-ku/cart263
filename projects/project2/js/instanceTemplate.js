// Instance: Template canvas
//
function createTemplateCanvas() {
  let instanceTemplateSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Background fill
    let bgFill = {
      r: 0,
      g: 0,
      b: 0,
    };

    // Create canvas and objects
    p.setup = function () {
      // Create canvas
      let templateCanvas = p.createCanvas(300, 500);
      templateCanvas.parent(`template-canvas`);
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);
    };
  };

  let myp5Template = new p5(instanceTemplateSketch);
}
