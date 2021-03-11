/**************************************************
Exercise 5: Haiku Generator
Sharon Ku

Generates a random haiku
You can switch a haiku line by clicking on it

Source: some haiku lines taken from Umaru-Chan's "An Ode to the Potato Chip"

Background video: Video by FL Studio from Pexels
https://www.pexels.com/video/beach-with-clear-blue-water-3089895/
**************************************************/

"use strict";

// Background fill
let backgroundFill = {
  r: 210,
  g: 210,
  b: 210,
  alpha: 0.95,
};

// All five syllable lines
let fiveSyllableLines = [
  `O, potato chip`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`,
  `I eat you for lunch`,
];
// All seven syllable lines
let sevenSyllableLines = [
  `Say the things left unsaid`,
  `Oh how I love to crunch thee`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`,
  `Your crispy corners are well equipped`,
];

// All titles
let titles = [
  `What a Life`,
  `A Crunching Sound`,
  `Journey to the Abyss`,
  `Love You Forever`,
  `Neglected Tears`,
  `Be My French Fry`,
  `Feeling Miserable`,
  `The Ant's Whisper`,
  `The Aunt's Whisper`,
];

// Create an array to store the 3 haiku lines
let lines = [];
// Number of haiku lines
const NUM_LINES = 3;

let title = document.getElementById(`title`);

// Content element
let content = document.getElementById(`content`);

content.style.background = `rgba(
    ${backgroundFill.r},
    ${backgroundFill.g},
    ${backgroundFill.b},
    ${backgroundFill.alpha}
  )`;

// For each line, get using document's ID and push to lines array
for (let i = 0; i < NUM_LINES; i++) {
  let line = document.getElementById(`line-${i + 1}`);
  lines.push(line);
}

// Assign initial haiku lines
for (let i = 0; i < lines.length; i++) {
  // If it's the 1st or 3rd line, assign random five syllable line
  if (i === 0 || i === 2) {
    lines[i].innerText = randomElement(fiveSyllableLines);
  }
  // Else, if it's the 2nd line, assign random 7 syllable line
  else {
    lines[i].innerText = randomElement(sevenSyllableLines);
  }

  // Add event listener to each line
  lines[i].addEventListener(`click`, lineClicked);
}

// Add event listener to title
title.addEventListener(`click`, lineClicked);

// Handles a click on a line
function lineClicked(event) {
  // Fade out
  fadeOut(event.target, getOpacity(event.target));

  // Set a random background fill to content
  setRandomBackgroundFill();

  // Grab the content's background and set new background fill to it
  content.style.background = `rgba(
      ${backgroundFill.r},
      ${backgroundFill.g},
      ${backgroundFill.b},
      ${backgroundFill.alpha}
    )`;
}

// Set a random background fill color
function setRandomBackgroundFill() {
  backgroundFill.r = Math.floor(150 + 105 * Math.random());
  backgroundFill.g = Math.floor(150 + 105 * Math.random());
  backgroundFill.b = Math.floor(150 + 105 * Math.random());
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
    element.innerText = randomElement(fiveSyllableLines);
  } else if (element === lines[1]) {
    element.innerText = randomElement(sevenSyllableLines);
  } else if (element === title) {
    element.innerText = randomElement(titles);
  }
}

// Returns a random element from any array passed as an argument
function randomElement(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
