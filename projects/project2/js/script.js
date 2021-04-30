/**
Project 2: Fogdog
Sharon Ku

You are a circle. And your name is Kay. You just got a new job at the restaurant.

You start the day reading emails and contemplating whether you want to work out. Then you head to work. At work, you try your best to accomplish the complicated tasks, while Peep the bird trains you. Look out, Peep is a tough trainer. Your boss, Ladi, is here once in a while, but he gives you some form of feedback.

After work, you head home. Every night, you read affirmations out loud.

Don't worry, every day will get better.

***

CREDITS

Voice of Ladi and Peep: Bryan Ku

Code attribution: Pippin Barr helped with the code for setting up several p5.js instances.

Sound sources:
- "Yay" sound effect:
http://www.mediafire.com/file/y3crrluv5xne9z8/Yay.mp3/file

- Relaxing background music:
lukrembo - bored
https://www.youtube.com/watch?v=t9r4cHSnjq4&ab_channel=LuKremBo

- Restaurant background music:
School by Komiku
https://www.chosic.com/
https://www.chosic.com/download-audio/?t=24280

*/

"use strict";

// All possible states: title, morning, goToWork, work, returnHome, night
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
let gameScore = 100;
// Increase and decrease rate of score
let scoreDecreaseRate = 2;
let scoreIncreaseRate = 10;
// Minimum and maximum scores
let minScore = 0;
let maxScore = 200;

// Delay before creating internal dialog
const DELAY_INTERNAL_DIALOG_CREATION = 3000;
// Transportation mode
// All possible modes: walk, bike, bus
let transportationMode = undefined;

// Number of work tasks left to do
let numTasksLeft = 2;
// True when a task is completed
let taskCompleted = false;

// how is Peep feeling right now?
// possible feelings: neutral, happy, mad
let peepFeeling = `neutral`;

// Set to `play` if the delivery game started
let deliveryGame = `stop`;

// -----------------------------------------------------

// Play sound provided and loop through it
function playLoopingAudio(soundToPlay) {
  soundToPlay.loop = true;
  soundToPlay.play();
}

// Stop looping audio from playing
function stopLoopingAudio(soundToStop) {
  soundToStop.loop = false;
  soundToStop.pause();
  soundToStop.currentTime = 0;
}

// Change internal dialog with string provided
function changeInternalDialogText(string) {
  // Make internal dialog blink
  $(`#internal-dialog`).effect("highlight");
  // Change internal dialog text
  $(`#internal-dialog-text`).text(`${string}`);
  // After 5 seconds, remove the text
  setTimeout(() => {
    $(`#internal-dialog-text`).empty();
  }, 5000);
}

// Set day number
function updateDayNumber() {
  $(`#day-number`).text(`${dayNumber}`);
}

// Set up states
// function resetState() {
if (state === `title`) {
  loadAudio();
  // hide all HTML elements
  hideAllHTML();
  // hide day section
  $(`#day-section`).hide();
  // create canvas
  createTitleCanvas();
  // start state
  title();
} else if (state === `morning`) {
  loadAudio();
  // hide all HTML elements
  hideAllHTML();
  // start state
  morning();
  // update day number
  updateDayNumber();
} else if (state === `goToWork`) {
  loadAudio();
  // hide all HTML elements
  hideAllHTML();
  // start state
  goToWork();
} else if (state === `work`) {
  loadAudio();
  // hide all HTML elements
  hideAllHTML();
  // start state
  work();
} else if (state === `returnHome`) {
  loadAudio();
  // hide all HTML elements
  hideAllHTML();
  // start state
  returnHome();
} else if (state === `night`) {
  loadAudio();
  // hide all HTML elements
  hideAllHTML();
  // start state
  night();
}

// Hide all HTML elements
function hideAllHTML() {
  $(`#title-state`).hide();
  $(`#morning-state`).hide();
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

  // Play background music and loop it
  playLoopingAudio(relaxingBackgroundMusic);
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

  // Wait a little before creating internal dialog
  setTimeout(() => {
    createInternalDialog();
  }, DELAY_INTERNAL_DIALOG_CREATION);

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

  // Stop relaxing music and play resturant music instead
  stopLoopingAudio(relaxingBackgroundMusic);
  playLoopingAudio(restaurantBackgroundMusic);

  // Create canvases
  createWorkBackgroundCanvas();
  createSinkCanvas();
  createFoodDeliveryCanvas();
  createPeepCanvas();
  createToDoDialog();
  createLadiWelcomeCanvas();

  // Create all dialogs
  createFoodDeliveryDialog();
  createSinkDialog();
  createLadiWelcomeDialog();

  // Update number of tasks left
  $(`#number-of-tasks-left`).text(`${numTasksLeft}`);
}

// If task completed, remove a task
function removeATask() {
  if (taskCompleted) {
    // Remove a task
    numTasksLeft--;
    // Update number of tasks left
    $(`#number-of-tasks-left`).text(`${numTasksLeft}`);

    // If no more tasks left, start boss dialog
    if (numTasksLeft === 0) {
      console.log(`COMPLETED ALL TASKS!`);
      // Get feedback from Ladi
      getFeedbackFromBoss();

      // Close all task-related dialog boxes
      $(`#food-delivery-dialog`).dialog(`close`);
      $(`#sink-dialog`).dialog(`close`);
      $(`#to-do-dialog`).dialog(`close`);
    }

    taskCompleted = false;
  }
}

// Let Ladi make a speech
function getFeedbackFromBoss() {
  createLadiFeedbackCanvas();
  createLadiFeedbackDialog();
}

// -----------------------------------------------------

// STATE: returnHome
//
function returnHome() {
  state = `returnHome`;

  // Show return-home HTML
  $(`#return-home-state`).show();

  // Stop restaurant music and play relaxing music instead
  stopLoopingAudio(restaurantBackgroundMusic);
  playLoopingAudio(relaxingBackgroundMusic);

  // Cue time before returning home
  switchToNight();

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
}
