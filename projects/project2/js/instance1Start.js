// Instance 1: Start canvas
//
let instance1Sketch = function (p) {
  // Mouse position
  let mouse = {
    x: undefined,
    y: undefined,
  };

  // Drop
  let drop = {
    image: undefined,
    // color tint
    tint: {
      current: {
        r: 215,
        g: 245,
        b: 191,
      },
      start: {
        r: 215,
        g: 245,
        b: 191,
      },
      end: {
        r: 231,
        g: 112,
        b: 255,
      },
    },
    // position
    x: undefined,
    y: -10,
    yInitial: -100,
    // velocity and speed
    vx: 0,
    vy: 5,
    speed: 5,
    // gravitational acceleration
    gravity: 0.01,
    // true if time to release drop
    release: false,
  };

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
  let circle = {
    // position
    x: undefined,
    y: undefined,
    // stroke
    strokeWeight: {
      current: 5,
      min: 0,
      max: 5,
    },
    // stroke color: light purple
    strokeFill: {
      r: 240,
      g: 170,
      b: 255,
      alpha: {
        current: 255,
        min: 0,
        max: 255,
      },
    },
    // color
    fill: {
      r: 0,
      g: 0,
      b: 0,
      alpha: 0,
    },
    // size + growth
    size: {
      current: 0,
      min: 0,
      max: 150,
      growthRate: {
        initial: 0.005,
        current: 0.005,
      },
      growthAcceleration: 0.01,
    },
  };

  // Background color: black
  let bgFill = {
    r: 0,
    g: 0,
    b: 0,
  };

  // Load assets
  p.preload = function () {
    // Load drop image
    drop.image = p.loadImage(`assets/images/drop.png`);
  };

  // Create canvas and set rectangle position
  p.setup = function () {
    // Create a welcome canvas
    let startCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
    startCanvas.parent(`start-canvas`);

    // Set rectangle position to center of canvas
    rect.x = p.width / 2;
    rect.y = p.height / 2;

    // Set circle position to center of canvas
    circle.x = p.width / 2;
    circle.y = p.height / 2;

    // Set drop's x position
    drop.x = p.width / 2;
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

    // Draw circle
    p.drawCircle();

    // Make circle pulsate
    p.circlePulsates();

    // If mouse clicked on circle, release drop
    if (p.overlapsWithCircle(mouse) && p.mouseIsPressed) {
      drop.release = true;
    }

    // If releaseDrop is true, update drop behaviour
    if (drop.release) {
      // Update all of drop's behaviour
      p.updateDrop();
    }

    if (p.overlapsWithCircle(drop)) {
    }
  };

  // Returns true if circle overlaps with object provided
  p.overlapsWithCircle = function ({ x, y }) {
    if (
      x < circle.x + circle.size.current / 2 &&
      x > circle.x - circle.size.current / 2 &&
      y < circle.y + circle.size.current / 2 &&
      y > circle.y - circle.size.current / 2
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Update all of drop's behaviour
  p.updateDrop = function () {
    // Display drop image
    p.displayDrop();

    // Move drop
    p.moveDrop();

    // Update drop tint based on y position
    p.updateDropTint();
  };

  // Display drop
  p.displayDrop = function () {
    p.push();
    p.imageMode(p.CENTER);
    p.tint(drop.tint.current.r, drop.tint.current.g, drop.tint.current.b);
    p.image(drop.image, drop.x, drop.y);
    p.pop();
  };

  // Update drop's position
  p.moveDrop = function () {
    drop.y += drop.vy;
    drop.vy += drop.gravity;
  };

  // Update drop tint by mapping tint to drop's y position
  p.updateDropTint = function () {
    // Update tint's r value
    drop.tint.current.r = p.map(
      drop.y,
      drop.yInitial,
      circle.y,
      drop.tint.start.r,
      drop.tint.end.r
    );
    // Update tint's g value
    drop.tint.current.g = p.map(
      drop.y,
      drop.yInitial,
      circle.y,
      drop.tint.start.g,
      drop.tint.end.g
    );
    // Update tint's b value
    drop.tint.current.b = p.map(
      drop.y,
      drop.yInitial,
      circle.y,
      drop.tint.start.b,
      drop.tint.end.b
    );
  };

  // Draw rectangle
  p.drawRectangle = function () {
    p.push();
    p.rectMode(p.CENTER);
    p.fill(rect.fill.r, rect.fill.g, rect.fill.b);
    p.rect(rect.x, rect.y, rect.width, rect.height);
    p.pop();
  };

  // Draw circle
  p.drawCircle = function () {
    p.push();
    p.fill(circle.fill.r, circle.fill.g, circle.fill.b, circle.fill.alpha);
    p.stroke(
      circle.strokeFill.r,
      circle.strokeFill.g,
      circle.strokeFill.b,
      circle.strokeFill.alpha
    );
    p.strokeWeight(circle.strokeWeight.current);
    p.ellipse(circle.x, circle.y, circle.size.current);

    circle.strokeWeight.current = p.map(
      circle.size.current,
      circle.size.min,
      circle.size.max,
      circle.strokeWeight.max,
      circle.strokeWeight.min
    );
    p.pop();
  };

  // Make circle pulsate
  p.circlePulsates = function () {
    // If rectangle has not reached max size yet
    if (circle.size.current < circle.size.max) {
      // Make rectangle grow on infinitely with speed and acceleration
      circle.size.growthRate.current += circle.size.growthAcceleration;
      circle.size.current += circle.size.growthRate.current;
    }
    // Else, if rectangle exceeds max size
    else {
      // Reset size
      circle.size.current = circle.size.min;
      // Reset growth rate
      circle.size.growthRate.current = circle.size.growthRate.initial;
    }
  };

  // p.windowResized = function() {
  //   p.width =
  // }
};

let myp5Start = new p5(instance1Sketch);