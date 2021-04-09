// Instance 1: Start canvas
//
function createTitleCanvas() {
  let instance1Sketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Drop
    let drop = undefined;
    // Drop image
    let dropImage = undefined;

    // Start rectangle that spans width of window
    let startRectangle = undefined;

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

    // Create canvas and objects
    p.setup = function () {
      // Create a start canvas
      let startCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
      startCanvas.parent(`start-canvas`);

      // Create new start rectangle whose position is at the center of the canvas
      let rectangleX = p.width / 2;
      let rectangleY = p.height / 2;
      let rectangleWidth = p.width;
      startRectangle = new StartRectangle(
        p,
        rectangleX,
        rectangleY,
        rectangleWidth
      );

      // Create a new pulsating circle
      let circleX = p.width / 2;
      let circleY = p.height / 2;
      pulsatingCircle = new PulsatingCircle(p, circleX, circleY);

      // Create a new drop
      let dropX = p.width / 2;
      let dropY = -10;
      drop = new Drop(p, dropImage, dropX, dropY);
    };

    // Set mouse positions, set background color, update behaviour of rectangle, pulsating circle, and drop
    p.draw = function () {
      // Set mouse x and y positions
      mouse.x = p.mouseX;
      mouse.y = p.mouseY;

      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // Update all behaviour of rectangle
      startRectangle.update();

      // Update circle behaviour
      pulsatingCircle.update();

      // If mouse clicked on circle, release drop
      if (pulsatingCircle.overlapsWith(mouse) && p.mouseIsPressed) {
        drop.release = true;
      }

      // If time to release drop, update drop behaviour
      if (drop.release) {
        // Update all behaviour of drop
        drop.update(pulsatingCircle);
      }

      // If drop overlaps with circle, make circle expand throughout entire canvas
      if (pulsatingCircle.overlapsWith(drop)) {
        pulsatingCircle.expandAllTheWay();
      }

      // If circle exceeds rectangle height, display dialog boxes
      if (pulsatingCircle.size.current > startRectangle.height && state === `title`) {
        welcome();
      }
    };

  };

  let myp5Start = new p5(instance1Sketch);
}
