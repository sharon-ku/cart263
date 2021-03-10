/**************************************************
Activity 5: Haiku Generator
Sharon Ku

Generates a random haiku
**************************************************/

"use strict";

let fiveSyllableLines = [
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`,
];
let sevenSyllableLines = [
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`,
];

let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);

let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;

line1P.addEventListener(`click`, lineClicked);
line2P.addEventListener(`click`, lineClicked);
line3P.addEventListener(`click`, lineClicked);

// Handles a click on a line
function lineClicked(event) {
  // setNewLine(event.target);
  fadeOut(event.target, getOpacity(event.target));
}

// Sets a new line to the provided element
function setNewLine(element) {
  if (element === line1P || element === line3P) {
    element.innerText = random(fiveSyllableLines);
  } else if (element === line2P) {
    element.innerText = random(sevenSyllableLines);
  }
}

// Returns a random element from any array passed as an argument
function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

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

function fadeOut(element, currentOpacity) {
  // Reduce the opacity
  currentOpacity -= 0.01;
  // Set the opacity on the element
  element.style[`opacity`] = currentOpacity;
  // Check if the opacity is still above 0
  if (currentOpacity > 0) {
    // if yes, call fadeOut() again on the next frame
    requestAnimationFrame(function () {
      fadeOut(element, currentOpacity);
    });
  }
}

// // setup()
// //
// // Description of setup() goes here.
// function setup() {}

// draw()
//
// Description of draw() goes here.
function draw() {}
