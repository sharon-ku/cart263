// Instance: Template canvas
//
function createTemplateCanvas() {
  let instanceTemplateSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Create canvas and objects
    p.setup = function () {
      // Create canvas
      let templateCanvas = p.createCanvas(300, 500);
      templateCanvas.parent(`template-canvas`);
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      p.background(0, 0, 0);
    };
  };

  let myp5Template = new p5(instanceTemplateSketch);
}
