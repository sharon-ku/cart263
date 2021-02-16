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

// Background color
let bgFill = 0;

// Store bubbles
let bubbles = [];
// number of bubbles
let numBubbles = 1;

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


  // Create new bubbles and store in bubbles array
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

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

// Displays the webcam.
// If there is a hand it outlines it and highlights the tip of the index finger.
function running() {
  // Display the webcam with reversed image so it's a mirror
  let flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

  // Check if there are currently predictions to display
  if (predictions.length > 0) {
    // Get the hand predicted
    let hand = predictions[0];
    // Display pin on canvas (that runs through length of index finger)
    displayPin(hand);
  }

  // Update bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
  }
}

// Provided with a detected hand, it highlights the length of the index finger
function displayPin(hand) {
  // Get coordinates of tip and base of index finger
  let index = hand.annotations.indexFinger;
  let tip = index[3];
  let base = index[0];

  let tipX = tip[0];
  let tipY = tip[1];

  let baseX = base[0];
  let baseY = base[1];

  // Draw a line from tip to base of finger
  push();
  stroke(255);
  line(tipX, tipY, baseX, baseY);
  pop();

  // Draw a red circle at base of index finger
  push();
  noStroke();
  fill(255, 0, 0);
  ellipse(baseX, baseY, 30);
  pop();
}
