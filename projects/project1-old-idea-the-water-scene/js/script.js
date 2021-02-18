/**************************************************
Project 1
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

// background fill
let bgFill = {
  r: 62,
  g: 115,
  b: 140,
};

// store boat image
let boatImage;

// user-controlled boat
let boat;

// store all dialog
let dialog;

// array of rocks
let rocks = [];
// number of rocks
let numRocks = 10;


// preload()
//
// Preload images, JSON files
function preload() {
  boatImage = loadImage(`assets/images/boat.png`);
  dialog = loadJSON(`assets/data/dialog.json`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  // Create a canvas
  createCanvas(1280,500);

  // Create a new boat
  boat = new Boat(boatImage);

  // Create new rocks
  for (let i = 0; i < numRocks; i++) {
    let rock = new Rock();
    rocks.push(rock);
  }

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bgFill.r, bgFill.g, bgFill.b);

  // Display rocks
  for (let i = 0; i < rocks.length; i++) {
    rocks[i].update();
  }

  // Update the boat's behaviour
  boat.update();
}
