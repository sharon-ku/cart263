// Instance: Template canvas (NOT USED IN GAME)
//
function createTemplateCanvas() {
  let instanceTemplateSketch = function (p) {
    // Background fill
    const BG_FILL = {
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

    // Update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);
    };
  };

  let myp5Template = new p5(instanceTemplateSketch);
}
