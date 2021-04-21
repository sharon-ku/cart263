/**
Project 2
Sharon Ku

Experimenting with jQuery dialog boxes, draggable items, and p5.js canvases as a way to progress the storyline

Attribution: Pippin Barr helped with the code for setting up several p5.js instances.
*/

"use strict";

// All possible states: title, welcome, morning, work, night
let state = `work`;

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

// STATE: morning
//
function morning() {
  state = `morning`;
  // Hide start canvas
  $(`#start-canvas`).slideToggle();

  // Create canvases

  // Create all dialogs
  createEmailDialog();

  // Show letter animation
  $(`#letter-animation`).show();
}

// When letter animation is clicked on, open email and hide letter animation
$(`#letter-animation`).click(function () {
  $(`#email-dialog`).dialog("open");
  $(this).hide();
});

// Make letter animation draggable
$(`#letter-animation`).draggable({
  drag: function (event, ui) {
    $(this).css(`cursor`, `grab`);
  },
});

// -----------------------------------------------------

// STATE: work
//
function work() {
  state = `work`;
  // Hide start canvas
  $(`#start-canvas`).slideToggle();

  // Hide letter animation and email dialog
  $(`#letter-animation`).hide();
  $(`#email-dialog`).hide();

  // Create canvases
  createSinkCanvas();
  createFoodDeliveryCanvas();
  createPeepCanvas();

  // Create all dialogs
  createSinkDialog();
  createFoodDeliveryDialog();
  createToDoListDialog();
}

// -----------------------------------------------------

// STATE: night
//
function night() {
  state = `night`;
  // Hide start canvas
  $(`#start-canvas`).slideToggle();

  // Hide letter animation and email dialog
  $(`#letter-animation`).hide();
  $(`#email-dialog`).hide();

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

  // Hide letter animation and email dialog
  $(`#letter-animation`).hide();
  $(`#email-dialog`).hide();

  // Create canvases
  createDistractionCanvas();
  // createWelcomeCanvas();
  createSinkCanvas();
  createFoodDeliveryCanvas();
  createPeepCanvas();

  // Create all dialogs
  createDistractionDialog();
  // createWelcomeDialog();
  createCongratulationsDialog();
  createSinkDialog();
  createFoodDeliveryDialog();
  createToDoListDialog();

  // Create left and right puzzle pieces
  createLeftPuzzleCanvas();
  createRightPuzzleCanvas();

  // Create puzzle box
  createPuzzleBox();
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
