/**
Project 2
Sharon Ku

Experimenting with jQuery dialog boxes, draggable items, and p5.js canvases as a way to progress the storyline

Attribution: Pippin Barr helped with the code for setting up several p5.js instances.
*/

"use strict";

// All possible states: title, welcome, morning, work, night
let state = `morning`;

// Number of puzzles dropped in box
let numPuzzlesDropped = 0;

// Number of total puzzles
const NUM_TOTAL_PUZZLES = 2;

// Track number of day (starts at 1)
let dayNumber = 1;

// Track game score
let gameScore = 50;
// Increase and decrease rate of score
let scoreDecreaseRate = 10;
let scoreIncreaseRate = 0.05;

// -----------------------------------------------------

// Set day number
function updateDayNumber() {
  $(`#day-number`).text(`${dayNumber}`);
}

// Set up states
if (state === `title`) {
  createTitleCanvas();
  // update day number
  updateDayNumber();
} else if (state === `welcome`) {
  welcome();
  // update day number
  updateDayNumber();
} else if (state === `morning`) {
  morning();
  // update day number
  updateDayNumber();
} else if (state === `work`) {
  work();
} else if (state === `night`) {
  night();
}

// -----------------------------------------------------
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

// -----------------------------------------------------
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

// -----------------------------------------------------

// STATE: morning
//
function morning() {
  state = `morning`;
  // Hide start canvas
  $(`#start-canvas`).slideToggle();

  // Create canvases

  // Create all dialogs
  createEmailDialog();
}

// When letter animation is clicked on, open email and hide letter animation
$(`#letter-animation`).click(function () {
  $(`#email-dialog`).dialog("open");
  $(this).hide();
});

// -----------------------------------------------------

// STATE: work
//
function work() {
  state = `work`;
  // Hide start canvas
  $(`#start-canvas`).slideToggle();

  // Create canvases

  // Create all dialogs
}

// -----------------------------------------------------

// STATE: night
//
function night() {
  state = `night`;
  // Hide start canvas
  $(`#start-canvas`).slideToggle();

  // Create canvases

  // Create all dialogs
}

// -----------------------------------------------------

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
  createToDoListDialog();

  // Create left and right puzzle pieces
  createLeftPuzzleCanvas();
  createRightPuzzleCanvas();

  // Create puzzle box
  createPuzzleBox();
}

// PUZZLE PIECES ---------------------------------------
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

// CREATE ALL DIALOG BOXES -----------------------------

// Create an email dialog
function createEmailDialog() {
  $(`#email-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Don't open automatically
    autoOpen: false,
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

// Create to-do list dialog
function createToDoListDialog() {
  $(`#to-do-list-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Don't open automatically
    // autoOpen: false,
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
