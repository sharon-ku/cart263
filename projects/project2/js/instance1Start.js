// Instance 1: Start canvas
//
let instance1Sketch = function (p) {
  // Mouse position
  let mouse = {
    x: undefined,
    y: undefined,
  };

  // Drop
  let drop;
  // Drop image
  let dropImage = undefined;

  // Rectangle properties
  let rect = {
    // position
    x: undefined,
    y: undefined,
    // color
    fill: {
      r: 255,
      g: 230,
      b: 255,
    },
    // size
    width: undefined,
    height: 300,
  };

  // Pulsating circle
  let pulsatingCircle = undefined;

  // Background color: black
  let bgFill = {
    r: 0,
    g: 0,
    b: 0,
  };

  // Load assets
  p.preload = function () {
    // Load drop image
    dropImage = p.loadImage(`assets/images/drop.png`);
  };

  // Create canvas and set rectangle position
  p.setup = function () {
    // Create a welcome canvas
    let startCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
    startCanvas.parent(`start-canvas`);

    // Set rectangle position to center of canvas
    rect.x = p.width / 2;
    rect.y = p.height / 2;

    // Create a new pulsating circle
    let circleX = p.width / 2;
    let circleY = p.height / 2;
    pulsatingCircle = new PulsatingCircle(p, circleX, circleY);

    // Create a new drop
    let dropX = p.width / 2;
    let dropY = -10;
    drop = new Drop(p, dropImage, dropX, dropY);
  };

  // Set background color, draw and make rectangle grow
  p.draw = function () {
    // Set mouse x and y positions
    mouse.x = p.mouseX;
    mouse.y = p.mouseY;

    // Set background color
    p.background(bgFill.r, bgFill.g, bgFill.b);

    // Set rectangle values
    rect.width = p.width;

    // Draw rectangle
    p.drawRectangle();

    // Update circle behaviour
    pulsatingCircle.update();

    // If mouse clicked on circle, release drop
    if (p.overlapsWithCircle(mouse) && p.mouseIsPressed) {
      drop.release = true;
    }

    // If releaseDrop is true, update drop behaviour
    if (drop.release) {
      // Update all behaviour of drop
      drop.update(pulsatingCircle);
    }

    if (p.overlapsWithCircle(drop)) {
    }
  };

  // Returns true if circle overlaps with object provided
  p.overlapsWithCircle = function ({ x, y }) {
    if (
      x < pulsatingCircle.x + pulsatingCircle.size.current / 2 &&
      x > pulsatingCircle.x - pulsatingCircle.size.current / 2 &&
      y < pulsatingCircle.y + pulsatingCircle.size.current / 2 &&
      y > pulsatingCircle.y - pulsatingCircle.size.current / 2
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Draw rectangle
  p.drawRectangle = function () {
    p.push();
    p.rectMode(p.CENTER);
    p.fill(rect.fill.r, rect.fill.g, rect.fill.b);
    p.rect(rect.x, rect.y, rect.width, rect.height);
    p.pop();
  };

  // p.windowResized = function() {
  //   p.width =
  // }
};

let myp5Start = new p5(instance1Sketch);
