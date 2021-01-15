/**************************************************
Assignment 1: Where's Sausage Dog
Sharon Ku

The canvas will display many random images of animals at random positions,
one of which will be a sausage dog.
The player has to click on the sausage dog to win the game.
When clicked successfully, the sausage dog will start spinning.
**************************************************/

"use strict";

// number of animal images
const NUM_ANIMAL_IMAGES = 10;

// array that stores animal images
let animalImages = [];

// background fill color: vibrant green
let bgFill = {
  r: 84,
  g: 227,
  b: 151,
};

// preload()
//
// Preload all images
function preload() {
  // loop through all animal images and push into animalImages array
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
}

// setup()
//
// Create canvas and new objects here
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bgFill.r, bgFill.g, bgFill.b);
}
