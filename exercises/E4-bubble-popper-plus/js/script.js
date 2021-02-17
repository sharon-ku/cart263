/**************************************************
Exercise 4: Bubble Popper
Sharon Ku

Using hand tracking we turn the user's index finger into a pin on our program's canvas.
Bubbles float around randomly and the user can pop the bubble with the pointy end of their pin-finger.
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

// Section around canvas that bubbles cannot move to
let border = 50;

// Store bubbles
let bubbles = [];
// number of bubbles
let numBubbles = 2;

// Coordinates of index finger's tip and base
let fingerTip = {
  x: undefined,
  y: undefined,
};
let fingerBase = {
  x: undefined,
  y: undefined,
};

// Pin appearance information
let pin = {
  lineStrokeFill: 255,
  circleFill: {
    r: 255,
    g: 0,
    b: 0,
  },
  circleSize: 30,
};

// Loading text information
let loadingText = {
  fill: 255,
  size: 32,
  style: `BOLD`,
}

// Array of clowns
let clowns = [];
// Clown image
let clownImage = undefined;

// Victory text
let victoryText = {
  string: `BRAVO
EXPERT BUBBLE POPPER!`,
  size: {
    current: 25,
    max: 40,
    min: 20,
    changeRate: 0,
    positiveChangeRate: 0.6,
    negativeChangeRate: -0.8,
    increaseSize: true,
  },
  fill: 255,
};

// preload()
//
// Preload images
function preload(){
  clownImage = loadImage(`assets/images/clown.png`);
}

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
  fill(loadingText.fill);
  textSize(loadingText.size);
  textStyle(loadingText.style);
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
  updateBubbles(border);

  // If all bubbles have been popped, display victory text that grows and shrinks, party style
  if (bubbles.length === 0) {
    changeTextSize();
    displayVictoryText();
  }
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
  stroke(pin.lineStrokeFill);
  line(fingerTip.x, fingerTip.y, fingerBase.x, fingerBase.y);
  pop();

  // Draw a red circle at base of index finger
  push();
  noStroke();
  fill(pin.circleFill.r, pin.circleFill.g, pin.circleFill.b);
  ellipse(fingerBase.x, fingerBase.y, pin.circleSize);
  pop();
}

// Update bubbles' behaviour
// Also remove bubble and drop a clown if bubble's been popped
function updateBubbles(border) {
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    // Update bubble's behaviour
    bubble.update(border);

    // If bubble overlaps with finger tip, remove bubble from array and create clown on bubble's last position
    if (bubble.overlapsWith(fingerTip)) {
      // create a new clown on bubble's last position
      let clown = new Clown(clownImage, bubble.x, bubble.y);
      clowns.push(clown);
      // remove bubble from array
      bubbles.splice(i, 1);
    }

    // Update clown's behaviour
    for (let j = 0; j < clowns.length; j++) {
      clowns[j].update();
    }
  }
}

// Decrease and increase victory text size
function changeTextSize() {
  // If text size reaches min size, increase its size
  if (victoryText.size.current <= victoryText.size.min) {
    victoryText.size.increaseSize = true;
  }
  // If text size reaches max size, decrease text size
  else if (victoryText.size.current >= victoryText.size.max) {
    victoryText.size.increaseSize = false;
  }

  // If it's time to increase size, set size to positive change rate
  if (victoryText.size.increaseSize) {
    victoryText.size.changeRate = victoryText.size.positiveChangeRate;
  }
  // Else, set to negative change rate
  else {
    victoryText.size.changeRate = victoryText.size.negativeChangeRate;
  }

  // Update text's current s ize
  victoryText.size.current += victoryText.size.changeRate;
}

// Display victory text
function displayVictoryText() {
  push();
  fill(victoryText.fill);
  textSize(victoryText.size.current);
  textAlign(CENTER, CENTER);
  text(victoryText.string, width/2, height/2);
}
