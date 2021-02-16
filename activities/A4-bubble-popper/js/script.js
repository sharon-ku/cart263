/**************************************************
Activity 4: Bubble Popper
Sharon Ku

Using hand tracking we turn the user's index finger into a pin on our program's canvas.
A bubble floats upward repeatedly and the user can pop the bubble with the pointy end of their pin-finger.
**************************************************/
"use strict";

// Current state of program
// All possible states: loading, running
let state = `loading`;
// User's webcam
let video = undefined;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];

// setup()
//
// Description of setup() goes here.
function setup() {
  // Create a canvas
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the running state
    state = `running`;
  });

  // Listen for prediction events from Handpose and store the results in our predictions array when the occur
  handpose.on(`predict`, function(results) {
    console.log(results);
    predictions = results;
  });
}

// draw()
//
// Handles the two states of the program: loading, running
function draw() {
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
}
