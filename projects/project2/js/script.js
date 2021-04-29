/**
Project 2
Sharon Ku

Experimenting with jQuery dialog boxes, draggable items, and p5.js canvases as a way to progress the storyline

Code attribution: Pippin Barr helped with the code for setting up several p5.js instances.

Voice of Ladi and Peep: Bryan Ku

Sound effects sources:
yay: http://www.mediafire.com/file/y3crrluv5xne9z8/Yay.mp3/file
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

// True if time to switch day
let switchDay = false;

// Track game score
let gameScore = 50;
// Increase and decrease rate of score
let scoreDecreaseRate = 10;
let scoreIncreaseRate = 0.05;

// Transportation mode
// All possible modes: walk, bike, bus
let transportationMode = undefined;

// Number of work tasks left to do
let numTasksLeft = 2;
// True when a task is completed
let taskCompleted = false;

// -----------------------------------------------------

// Set day number
function updateDayNumber() {
  $(`#day-number`).text(`${dayNumber}`);
}

// Create internal dialog
createInternalDialog();

// Set up states
// function resetState() {
if (state === `title`) {
  // hide all HTML elements
  hideAllHTML();
  // hide day section
  $(`#day-section`).hide();
  // create canvas
  createTitleCanvas();
  // start state
  title();
} else if (state === `welcome`) {
  // hide all HTML elements
  hideAllHTML();
  // start state
  welcome();
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
// }

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
  $(`#title-state`).toggle("fade", 3000, showMorningElements);

  // Add 1 to day number
  if (switchDay) {
    dayNumber++;
    switchDay = false;
  }

  // Update day number
  updateDayNumber();

  // Create canvases
  createMirrorCanvas();
  createMorningBackgroundCanvas();

  // Create all dialogs
  createEmailDialog();
  createWorkoutDialog();
  createGoToWorkQuestionDialog();

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

  // Cue time before arrive to work
  arriveToWork();

  // Create canvases
  createGoToWorkBackgroundCanvas();

  // Create dialogs
  createChooseTransportationDialog();
}

// When walk button is clicked on, set walking transportation method
$(`#walk-button`).click(function () {
  $(`#choose-transportation-dialog`).dialog("close");

  transportationMode = `walk`;

  console.log(transportationMode);
});

// Start timer that will activate work state
function arriveToWork() {
  setTimeout(() => {
    $(`#go-to-work-state`).hide();
    work();
  }, 20000);
}

// -----------------------------------------------------

// STATE: work
//
function work() {
  state = `work`;

  // Show work-state HTML
  $(`#work-state`).show();

  // Create canvases
  createWorkBackgroundCanvas();
  createSinkCanvas();
  createFoodDeliveryCanvas();
  createPeepCanvas();

  // Create all dialogs
  createSinkDialog();
  createFoodDeliveryDialog();
  // createToDoListDialog();
}

// If task completed, remove a task
function removeATask() {
  if (taskCompleted) {
    numTasksLeft--;

    // If no more tasks left, start boss dialog
    if (numTasksLeft === 0) {
      console.log(`COMPLETED ALL TASKS!`);

      // Switch to returnHome state
      returnHome();
      $(`#work-state`).hide();
      // getFeedbackFromBoss();
    }

    taskCompleted = false;
    console.log(numTasksLeft);
  }
}

// -----------------------------------------------------

// STATE: returnHome
//
function returnHome() {
  state = `returnHome`;

  // Show return-home HTML
  $(`#return-home-state`).show();

  // Cue time before returning home
  switchToNight();

  // // Hide all HTML from other states
  // $(`#title-state`).hide();
  // $(`#morning-state`).hide();
  // $(`#welcome-state`).hide();
  // $(`#go-to-work-state`).hide();
  // $(`#work-state`).hide();
  // $(`#return-home-state`).hide();
  // $(`#night-state`).hide();

  // Create canvases
  // createReturnHomeBackgroundCanvas();

  // Create dialogs
}

// Start timer that will activate night state
function switchToNight() {
  setTimeout(() => {
    $(`#return-home-state`).hide();
    night();
  }, 20000);
}

// -----------------------------------------------------

// STATE: night
//
function night() {
  state = `night`;

  updateDayNumber();

  // Show night HTML
  $(`#night-state`).show();

  // Create canvases
  createMirrorCanvas();
  createNightBackgroundCanvas();
  createAffirmationsCanvas();

  // Create all dialogs
  createAffirmationsDialog();
  createSayGoodnightDialog();

  // // Make mirror canvas draggable
  // makeElementDraggable(`#mirror-canvas`);
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
// Create internal dialog
function createInternalDialog() {
  $(`#internal-dialog`).dialog({
    // Set position of dialog based on window position
    position: {
      my: "center center",
      at: "center bottom",
      of: $(`.background-canvas`),
    },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "700px",
    // Don't open automatically
    // autoOpen: false,
    // Hide close button and change css of email dialog
    dialogClass: "no-close email",
  });
}

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
        $(`#workout-dialog`).dialog(`open`);
        $(`#distraction-description`).text(`Tomorrow's going to be a good day`);
      },
      Delete: function () {
        $(`#workout-dialog`).dialog(`open`);
        $(this).dialog(`close`);
      },
    },
  });
}

// Create an workout dialog
function createWorkoutDialog() {
  $(`#workout-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Don't open automatically
    autoOpen: false,
    // Hide close button and change css of workout dialog
    dialogClass: "no-close email",
    // Button options
    buttons: {
      Yes: function () {
        $(this).dialog(`close`);
        $(`#internal-dialog-text`).text(
          `Maybe another day. I don't feel like it today.`
        );
        $(`#go-to-work-question-dialog`).dialog(`open`);
      },
      No: function () {
        $(this).dialog(`close`);
        $(`#internal-dialog-text`).text(`Today's not the day.`);
        $(`#go-to-work-question-dialog`).dialog(`open`);
      },
    },
  });
}

// Create go-to-work-question dialog
function createGoToWorkQuestionDialog() {
  $(`#go-to-work-question-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Don't open automatically
    autoOpen: false,
    // Hide close button and change css of dialog
    dialogClass: "no-close email",
    // Button options
    buttons: {
      Yes: function () {
        // Close this dialog box
        $(this).dialog(`close`);
        // Cue goToWork state
        goToWork();
        // Hide current state
        $(`#morning-state`).hide();
      },
      No: function () {
        $(`#internal-dialog-text`).text(`You're going to be late!`);
        // console.log(`${$(`#internal-dialog-text`)}`);
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

// // Create to-do list dialog
// function createToDoListDialog() {
//   $(`#to-do-list-dialog`).dialog({
//     // Set position of dialog based on window position
//     position: { my: "left+100 top+100", at: "left top", of: window },
//     // Adjust size of dialog box based on content it stores
//     height: "auto",
//     width: "auto",
//     // Don't open automatically
//     // autoOpen: false,
//     // Hide close button and change css of email dialog
//     dialogClass: "no-close email",
//     // Button options
//     buttons: {
//       Save: function () {
//         $(this).dialog(`close`);
//         $(`#distraction-description`).text(`Tomorrow's going to be a good day`);
//       },
//       Delete: function () {
//         $(this).dialog(`close`);
//       },
//     },
//   });
// }

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

// Create say goodnight dialog
function createSayGoodnightDialog() {
  $(`#say-goodnight-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Don't open automatically
    autoOpen: false,
    // Hide close button and change css of email dialog
    dialogClass: "no-close",
    // Button options
    buttons: {
      Goodnight: function () {
        $(this).dialog(`close`);
        // Make night state fade out
        $(`#night-state`).fadeOut(5000, function () {
          // Set switch day to true
          switchDay = true;
          // Update state
          morning();
        });
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
