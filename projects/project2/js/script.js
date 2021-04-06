/**
Project 2 Prototype
Sharon Ku

Experimenting with jQuery dialog boxes, draggable items, and p5.js canvases as a way to progress the storyline
*/

"use strict";

// Number of puzzles dropped in box
let numPuzzlesDropped = 0;

// Number of total puzzles
const NUM_TOTAL_PUZZLES = 2;

// Attribution: Pippin Barr helped with the code for setting up several p5.js instances.

// -------------------------------------------------------------------
// Create start canvas
//
let sketchStart = function (p) {
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
  };
  // True if time to release drop
  let releaseDrop = false;

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
      releaseDrop = true;
    }

    // If releaseDrop is true, update drop behaviour
    if (releaseDrop) {
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

let myp5Start = new p5(sketchStart);

// -------------------------------------------------------------------
// Create welcome canvas
//
let sketch = function (p) {
  // Rectangle properties
  let rect = {
    // position
    x: undefined,
    y: undefined,
    // color
    fill: 255,
    // size + growth
    size: {
      current: 0,
      min: 0,
      max: 300,
      growthRate: {
        initial: 0.005,
        current: 0.005,
      },
      growthAcceleration: 0.01,
    },
  };

  // Background color: light purple
  let bgFill = {
    r: 240,
    g: 170,
    b: 255,
  };

  // Create canvas and set rectangle position
  p.setup = function () {
    // Create a welcome canvas
    let welcomeCanvas = p.createCanvas(300, 300);
    welcomeCanvas.parent(`welcome-canvas`);

    // Set rectangle position to center of canvas
    rect.x = p.width / 2;
    rect.y = p.height / 2;
  };

  // Set background color, draw and make rectangle grow
  p.draw = function () {
    // Set background color
    p.background(bgFill.r, bgFill.g, bgFill.b);

    // Draw rectangle
    p.drawRectangle();

    // Make rectangle grow
    p.rectangleGrows();
  };

  // Draw rectangle
  p.drawRectangle = function () {
    p.push();
    p.rectMode(p.CENTER);
    p.fill(rect.fill);
    p.rect(rect.x, rect.y, rect.size.current);
    p.pop();
  };

  // Make rectangle grow
  p.rectangleGrows = function () {
    // If rectangle has not reached max size yet
    if (rect.size.current < rect.size.max) {
      // Make rectangle grow on infinitely with speed and acceleration
      rect.size.growthRate.current += rect.size.growthAcceleration;
      rect.size.current += rect.size.growthRate.current;
    }
    // Else, if rectangle exceeds max size
    else {
      // Reset size
      rect.size.current = rect.size.min;
      // Reset growth rate
      rect.size.growthRate.current = rect.size.growthRate.initial;
    }
  };
};

let myp5 = new p5(sketch);

// -------------------------------------------------------------------
// Create distraction canvas
let sketch2 = function (p) {
  // Background color: light purple
  let bgFill = {
    r: 240,
    g: 170,
    b: 255,
  };

  // For video capture
  let capture;
  // Properties for video capture display
  let captureProperties = {
    // position
    x: 0,
    y: 0,
  };

  // Create canvas and show video of user
  p.setup = function () {
    // Create canvas
    let distractionCanvas = p.createCanvas(320, 240);
    distractionCanvas.parent(`distraction-canvas`);

    // Show video of user
    p.createVideoCapture();
  };

  // Create video of user
  p.createVideoCapture = function () {
    capture = p.createCapture(p.VIDEO);
    capture.size(p.width, p.height);
    capture.hide();
  };

  // Set background color and display video capture
  p.draw = function () {
    // Set background color
    p.background(bgFill.r, bgFill.g, bgFill.b);

    // Show video capture
    p.image(
      capture,
      captureProperties.x,
      captureProperties.y,
      p.width,
      p.height
    );
  };
};

let myp52 = new p5(sketch2);

// -------------------------------------------------------------------
// Create left-puzzle canvas
let sketch3 = function (p) {
  // Background color: light blue
  let bgFill = {
    r: 121,
    g: 216,
    b: 237,
  };

  // Eye
  let eye = {
    fill: 0,
    x: 35,
    y: 40,
    size: 20,
  };

  // Mouth
  let mouth = {
    fill: 0,
    x: 0,
    y: 75,
    width: 50,
    height: 50,
    startAngle: 0,
    endAngle: p.PI,
  };

  // Create canvas
  p.setup = function () {
    // Create canvas
    let leftPuzzleCanvas = p.createCanvas(70, 120);
    leftPuzzleCanvas.parent(`left-puzzle-canvas`);
  };

  // Set background color and display video capture
  p.draw = function () {
    // Set background color
    p.background(bgFill.r, bgFill.g, bgFill.b);

    // Draw face
    p.drawFace();
  };

  // Draw face
  p.drawFace = function () {
    // Draw mouth
    p.push();
    p.fill(mouth.fill);
    p.arc(
      mouth.x,
      mouth.y,
      mouth.width,
      mouth.height,
      mouth.startAngle,
      mouth.endAngle
    );
    p.pop();

    // Draw eye
    p.push();
    p.fill(eye.fill);
    p.ellipse(eye.x, eye.y, eye.size);
    p.pop();
  };
};

let myp53 = new p5(sketch3);

// -------------------------------------------------------------------
// Create right-puzzle canvas
let sketch4 = function (p) {
  // Background color: light blue
  let bgFill = {
    r: 121,
    g: 216,
    b: 237,
  };

  // Eye
  let eye = {
    fill: 0,
    x: 35,
    y: 40,
    size: 20,
  };

  // Mouth
  let mouth = {
    fill: 0,
    x: 70,
    y: 75,
    width: 50,
    height: 50,
    startAngle: p.PI / 2,
    endAngle: p.PI,
  };

  // Create canvas
  p.setup = function () {
    // Create canvas
    let rightPuzzleCanvas = p.createCanvas(70, 120);
    rightPuzzleCanvas.parent(`right-puzzle-canvas`);
  };

  // Set background color and display video capture
  p.draw = function () {
    // Set background color
    p.background(bgFill.r, bgFill.g, bgFill.b);

    // Draw face
    p.drawFace();
  };

  // Draw face
  p.drawFace = function () {
    // Draw mouth
    p.push();
    p.fill(mouth.fill);
    p.arc(
      mouth.x,
      mouth.y,
      mouth.width,
      mouth.height,
      mouth.startAngle,
      mouth.endAngle
    );
    p.pop();

    // Draw eye
    p.push();
    p.fill(eye.fill);
    p.ellipse(eye.x, eye.y, eye.size);
    p.pop();
  };
};

let myp54 = new p5(sketch4);

// PUZZLE PIECES ----------------------------------------------------
// Make left puzzle draggable
$(`#left-puzzle-canvas`).draggable({
  drag: function (event, ui) {
    $(this).css(`cursor`, `grab`);
  },
});

// Make right puzzle draggable
$(`#right-puzzle-canvas`).draggable({
  drag: function (event, ui) {
    $(this).css(`cursor`, `grab`);
  },
});

// Make puzzle box droppable
$(`#puzzle-box`).droppable({
  // When drop puzzle on box:
  drop: function (event, ui) {
    // Make puzzle snap to box
    $(ui.draggable).css("top", $(this).position().top);
    $(ui.draggable).css("left", $(this).position().left);
    $(ui.draggable).css("left", $(this).position().left);

    // Disable draggable functionality
    $(ui.draggable).draggable("disable");

    // Add 1 to numPuzzlesDropped
    numPuzzlesDropped++;
    console.log(numPuzzlesDropped);

    // If total number of puzzles dropped, open congratulations-dialog box
    if (numPuzzlesDropped === NUM_TOTAL_PUZZLES) {
      $("#congratulations-dialog").dialog("open");
    }
  },
});

// CREATE ALL DIALOG BOXES ----------------------------------------------------

// Create an distraction dialog
$(`#distraction-dialog`).dialog({
  // Set position of dialog based on window position
  position: { my: "left+100 top+100", at: "left top", of: window },
  // Adjust size of dialog box based on content it stores
  height: "auto",
  width: "auto",
  // Button options
  buttons: {
    "I like what I see!": function () {
      $(`#distraction-description`).text(`keep looking then`);
    },
    "Please stop distracting me": function () {
      $(this).dialog(`close`);
    },
  },
});

// Create a welcome dialog
$(`#welcome-dialog`).dialog({
  // Don't open automatically
  autoOpen: false,
  // Hide close button
  dialogClass: "no-close",
  show: { effect: "fade", duration: 800 },
  // Do not let user interact with anything else on page until dialog closed
  modal: true,
  // Set position of dialog based on window position
  position: { my: "center center", at: "center top+200", of: window },
  // Adjust size of dialog box based on content it stores
  height: "auto",
  width: "auto",
  // Button options
  buttons: {
    "Don't mind if I do!": function () {
      $(this).dialog(`close`);
    },
  },
});

// Create a congratulations dialog
$(`#congratulations-dialog`).dialog({
  // Do not let user interact with anything else on page until dialog closed
  modal: true,
  // Don't open automatically
  autoOpen: false,
  // Hide close button
  dialogClass: "no-close",
  show: { effect: "fade", duration: 300 },
  // Set position of dialog based on window position
  position: { my: "center center", at: "center top+200", of: window },
  // Adjust size of dialog box based on content it stores
  height: "auto",
  width: "auto",
});
