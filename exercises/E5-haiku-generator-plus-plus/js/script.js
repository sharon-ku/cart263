/**************************************************
Activity 5: Haiku Generator
Sharon Ku

Generates a random haiku
**************************************************/

"use strict";

// All five syllable lines
let fiveSyllableLines = [
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`,
];
// All seven syllable lines
let sevenSyllableLines = [
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`,
];

// Create an array to store the 3 haiku lines
let lines = [];
// Number of haiku lines
const NUM_LINES = 3;

// For each line, get using document's ID and push to lines array
for (let i = 0; i < NUM_LINES; i++) {
  let line = document.getElementById(`line-${i + 1}`);
  lines.push(line);
}

// Assign initial haiku lines
for (let i = 0; i < lines.length; i++) {
  // If it's the 1st or 3rd line, assign random five syllable line
  if (i === 0 || i === 2) {
    lines[i].innerText = random(fiveSyllableLines);
  }
  // Else, if it's the 2nd line, assign random 7 syllable line
  else {
    lines[i].innerText = random(sevenSyllableLines);
  }

  // Add event listener to each line
  lines[i].addEventListener(`click`, lineClicked);
}

// Handles a click on a line
function lineClicked(event) {
  // fade out
  fadeOut(event.target, getOpacity(event.target));
}

// Get opacity of line
function getOpacity(element) {
  // Get the opacity
  let opacity = element.style[`opacity`];
  // Convert opacity string to a number
  opacity = parseFloat(opacity);
  // Check if string is empty
  if (isNaN(opacity)) {
    // Set opacity to 1
    opacity = 1;
  }
  // Return it as a number
  return opacity;
}

// Make element fade out
function fadeOut(element, currentOpacity) {
  // Reduce the opacity
  currentOpacity -= 0.005;
  // Set the opacity on the element
  element.style[`opacity`] = currentOpacity;
  // Check if the opacity is still above 0
  if (currentOpacity > 0) {
    // if yes, call fadeOut() again on the next frame
    requestAnimationFrame(function () {
      fadeOut(element, currentOpacity);
    });
  }
  // if no, start fading in and swap lines
  else {
    fadeIn(element, getOpacity(element));
    setNewLine(element);
  }
}

// Make element fade in
function fadeIn(element, currentOpacity) {
  // Reduce the opacity
  currentOpacity += 0.005;
  // Set the opacity on the element
  element.style[`opacity`] = currentOpacity;
  // Check if the opacity is still above 0
  if (currentOpacity < 1) {
    // if yes, call fadeOut() again on the next frame
    requestAnimationFrame(function () {
      fadeIn(element, currentOpacity);
    });
  }
}

// Sets a new line to the provided element
function setNewLine(element) {
  if (element === lines[0] || element === lines[2]) {
    element.innerText = random(fiveSyllableLines);
  } else if (element === lines[1]) {
    element.innerText = random(sevenSyllableLines);
  }
}

// Returns a random element from any array passed as an argument
function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

// // setup()
// //
// // Description of setup() goes here.
// function setup() {}

// draw()
//
// Description of draw() goes here.
function draw() {}
