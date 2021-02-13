/**************************************************
Project 1
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

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

// preload()
//
// Preload images
function preload() {
  boatImage = loadImage(`assets/images/boat.png`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  // Create a canvas
  createCanvas(1280,500);

  // Create a new boat
  boat = new Boat(boatImage);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bgFill.r, bgFill.g, bgFill.b);

  // Update the boat's behaviour
  boat.update();
}
