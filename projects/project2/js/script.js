/**
Project 2
Sharon Ku

Experimenting with jQuery dialog boxes, draggable items, and p5.js canvases as a way to progress the storyline

Attribution: Pippin Barr helped with the code for setting up several p5.js instances.
*/

"use strict";

// All possible states: title, welcome, morning, goToWork, work, returnHome, night
let state = `title`;

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

// Transportation mode
// All possible modes: walk, bike, bus
let transportationMode = undefined;

// -----------------------------------------------------

// Set day number
function updateDayNumber() {
  $(`#day-number`).text(`${dayNumber}`);
}

// Set up states
if (state === `title`) {
  // hide all HTML elements
  hideAllHTML();
  // hide day section
  $(`#day-section`).hide();
  // create canvas
  createTitleCanvas();
  // update day number
  updateDayNumber();
  // start state
  title();
} else if (state === `welcome`) {
  // hide all HTML elements
  hideAllHTML();
  // start state
  welcome();
  // update day number
  updateDayNumber();
} else if (state === `morning`) {
  // hide all HTML elements
  hideAllHTML();
  // start state
  morning();
  // update day number
  updateDayNumber();
} else if (state === `goToWork`) {
  // hide all HTML elements
  hideAllHTML();
  // start state
  goToWork();
} else if (state === `work`) {
  // hide all HTML elements
  hideAllHTML();
  // start state
  work();
} else if (state === `returnHome`) {
  // hide all HTML elements
  hideAllHTML();
  // start state
  returnHome();
} else if (state === `night`) {
  // hide all HTML elements
  hideAllHTML();
  // start state
  night();
}

// Hide all HTML elements
function hideAllHTML() {
  $(`#title-state`).hide();
  $(`#morning-state`).hide();
  $(`#welcome-state`).hide();
  $(`#go-to-work-state`).hide();
  $(`#work-state`).hide();
  $(`#return-home-state`).hide();
  $(`#night-state`).hide();
}

// -----------------------------------------------------

// STATE: title
//
function title() {
  // Show HTML elements for this state
  $(`#title-state`).show();
}

// -----------------------------------------------------

// STATE: morning
//
function morning() {
  state = `morning`;
  // Made title canvas fade away
  $(`#title-canvas`).toggle("fade", 3000, showMorningElements);

  // Create canvases

  // Create all dialogs
  createEmailDialog();

  // Show letter animation
  $(`#letter-animation`).show();

  // Make letter animation draggable
  makeElementDraggable(`#letter-animation`);
}

// Show HTML elements for morning state
function showMorningElements() {
  $(`#morning-state`).show();
  $(`#day-section`).show();
}

// When letter animation is clicked on, open email and hide letter animation
$(`#letter-animation`).click(function () {
  $(`#email-dialog`).dialog("open");
  $(this).hide();
});

// Make something draggable
function makeElementDraggable(element) {
  $(`${element}`).draggable({
    drag: function (event, ui) {
      $(this).css(`cursor`, `grab`);
    },
  });
}

// -----------------------------------------------------

// STATE: goToWork
//
function goToWork() {
  state = `goToWork`;

  // Hide title canvas
  $(`#title-canvas`).slideToggle();

  // Show go-to-work HTML elements
  $(`#go-to-work-state`).show();

  // Create canvases

  // Create dialogs
  createChooseTransportationDialog();
}

// When walk button is clicked on, set walking transportation method
$(`#walk-button`).click(function () {
  $(`#choose-transportation-dialog`).dialog("close");

  transportationMode = `walk`;

  console.log(transportationMode);
});

// -----------------------------------------------------

// STATE: work
//
function work() {
  state = `work`;

  // Show work-state HTML
  $(`#work-state`).show();

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

// STATE: returnHome
//
function returnHome() {
  state = `returnHome`;

  // Show return-home HTML
  $(`#return-home-state`).show();

  // // Hide all HTML from other states
  // $(`#title-state`).hide();
  // $(`#morning-state`).hide();
  // $(`#welcome-state`).hide();
  // $(`#go-to-work-state`).hide();
  // $(`#work-state`).hide();
  // $(`#return-home-state`).hide();
  // $(`#night-state`).hide();

  // Create canvases

  // Create dialogs
}

// -----------------------------------------------------

// STATE: night
//
function night() {
  state = `night`;

  // Show night HTML
  $(`#night-state`).show();

  // Create canvases
  createMirrorCanvas();
  createAffirmationsCanvas();

  // Create all dialogs
  createAffirmationsDialog();

  // Make mirror canvas draggable
  makeElementDraggable(`#mirror-canvas`);
}

// -----------------------------------------------------

// STATE: welcome
//
function welcome() {
  state = `welcome`;

  // // Hide title canvas
  // $(`#title-canvas`).slideToggle();

  // Show return-home HTML
  $(`#welcome-state`).show();

  // Create canvases
  createDistractionCanvas();
  // createWelcomeCanvas();

  // Create all dialogs
  createDistractionDialog();
  // createWelcomeDialog();
  createCongratulationsDialog();

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

// Create choose transportation dialog
function createChooseTransportationDialog() {
  $(`#choose-transportation-dialog`).dialog({
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
    // buttons: {
    //   Save: function () {
    //     $(this).dialog(`close`);
    //     $(`#distraction-description`).text(`Tomorrow's going to be a good day`);
    //   },
    //   Delete: function () {
    //     $(this).dialog(`close`);
    //   },
    // },
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

// Create affirmations dialog
function createAffirmationsDialog() {
  $(`#affirmations-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Don't open automatically
    // autoOpen: false,
    // Hide close button and change css of email dialog
    dialogClass: "no-close email",
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
