/**
Project 2
Sharon Ku

Experimenting with jQuery dialog boxes, draggable items, and p5.js canvases as a way to progress the storyline

Attribution: Pippin Barr helped with the code for setting up several p5.js instances.
*/

"use strict";

// All possible states: title, welcome
let state = `welcome`;

// Number of puzzles dropped in box
let numPuzzlesDropped = 0;

// Number of total puzzles
const NUM_TOTAL_PUZZLES = 2;

// Track number of day (starts at 1)
let dayNumber = 1;

// -------------------------------------------------------------------

// Set day number
function updateDayNumber() {
  $(`#day-number`).text(`${dayNumber}`);
}

if (state === `title`) {
  createTitleCanvas();
  // update day number
  updateDayNumber();
} else if (state === `welcome`) {
  welcome();
  // update day number
  updateDayNumber();
}

// Create welcome canvas
function createWelcomeCanvas() {
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
}

// -------------------------------------------------------------------
// Create distraction canvas
function createDistractionCanvas() {
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
      // capture = p.createCapture(p.VIDEO);
      // capture.size(p.width, p.height);
      // capture.hide();
    };

    // Set background color and display video capture
    p.draw = function () {
      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // // Show video capture
      // p.image(
      //   capture,
      //   captureProperties.x,
      //   captureProperties.y,
      //   p.width,
      //   p.height
      // );
    };
  };

  let myp52 = new p5(sketch2);
}

// -------------------------------------------------------------------
// Create left-puzzle canvas
function createLeftPuzzleCanvas() {
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
}

// -------------------------------------------------------------------
// Create right-puzzle canvas
function createRightPuzzleCanvas() {
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
}

// STATE: welcome
//
function welcome() {
  state = `welcome`;

  // Hide start canvas
  $(`#start-canvas`).slideToggle();

  // Create canvases
  createDistractionCanvas();
  createWelcomeCanvas();
  createSinkCanvas();
  createPeepCanvas();

  // Create all dialogs
  createDistractionDialog();
  createWelcomeDialog();
  createCongratulationsDialog();
  createSinkDialog();
  createEmailDialog();

  // Create left and right puzzle pieces
  createLeftPuzzleCanvas();
  createRightPuzzleCanvas();

  // Create puzzle box
  createPuzzleBox();
}

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
function createPuzzleBox() {
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
}

// CREATE ALL DIALOG BOXES ----------------------------------------------------

// Create an email dialog
function createEmailDialog() {
  $(`#email-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Hide close button and change css of email dialog
    dialogClass: "no-close email",
    // Button options
    buttons: {
      Save: function () {
        $(this).dialog(`close`);
        $(`#distraction-description`).text(`Tomorrow's going to be a good day`);
      },
      Delete: function () {
        $(this).dialog(`close`);
      },
    },
  });
}

// Create a distraction dialog
function createDistractionDialog() {
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
}

// Create a welcome dialog
function createWelcomeDialog() {
  $(`#welcome-dialog`).dialog({
    // Hide close button
    dialogClass: "no-close",
    show: { effect: "fade", duration: 800 },
    // // Do not let user interact with anything else on page until dialog closed
    // modal: true,
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
}

// Create a congratulations dialog
function createCongratulationsDialog() {
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
}
