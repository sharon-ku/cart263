/**************************************************
Exercise 4: Bubble Popper
Sharon Ku

Using hand tracking we turn the user's index finger into a pin on our program's canvas.
Bubbles float aroudn randomly and the user can pop the bubble with the pointy end of their pin-finger.
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

// Background color
let bgFill = 0;

// Store bubbles
let bubbles = [];
// number of bubbles
let numBubbles = 20;

// Coordinates of index finger's tip and base
let fingerTip = {
  x: undefined,
  y: undefined,
};
let fingerBase = {
  x: undefined,
  y: undefined,
};

// Section around canvas that bubbles cannot move to
let border = 50;

// setup()
//
// Create canvas, start webcam, start Handpose model, listen for prediction events from Handpose, create bubbles
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


  // Create new bubbles and store in bubbles array
  createBubbles();
}

// Create new bubbles and store in bubbles array
function createBubbles() {
  for (let i = 0; i < numBubbles; i++) {
    // Create a new bubble
    let bubble = new Bubble();
    bubbles.push(bubble);
  }
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

// Displays a simple loading screen with the loading model's name
function loading() {
  // Set background color
  background(bgFill);

  // Display "Loading [model's name]" text
  push();
  fill(255);
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

// Display the webcam:
// If there is a hand it outlines it and highlights the tip of the index finger.
function running() {
  // Display the webcam with reversed image so it's a mirror
  let flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

  // Check if there are currently predictions to display
  if (predictions.length > 0) {
    // Get the hand predicted
    let hand = predictions[0];
    // Provided with a detected hand, get coordinates of tip and base of index finger
    getCoordinatesOfIndexFinger(hand);
    // Display pin on canvas (that runs through length of index finger)
    displayPin();
  }

  // Update bubbles and remove bubble if it's been popped
  updateBubbles();
}

// Provided with a detected hand, get coordinates of tip and base of index finger
function getCoordinatesOfIndexFinger(hand) {
  let index = hand.annotations.indexFinger;
  let tip = index[3];
  let base = index[0];

  fingerTip.x = tip[0];
  fingerTip.y = tip[1];

  fingerBase.x = base[0];
  fingerBase.y = base[1];
}

// Draw pin along the length of the index finger
function displayPin() {
  // Draw a line from tip to base of finger
  push();
  stroke(255);
  line(fingerTip.x, fingerTip.y, fingerBase.x, fingerBase.y);
  pop();

  // Draw a red circle at base of index finger
  push();
  noStroke();
  fill(255, 0, 0);
  ellipse(fingerBase.x, fingerBase.y, 30);
  pop();
}

// Update bubbles' behaviour and remove bubble if it's been popped
function updateBubbles() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();

    // If bubble overlaps with finger tip, remove bubble from array
    if (bubbles[i].overlapsWith(fingerTip)) {
      bubbles.splice(i, 1);
    }
  }
}
