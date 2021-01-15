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
const NUM_ANIMALS = 10;

// array that stores animals
let animals = [];

// array that stores animal images (everything except sausage dog)
let animalImages = [];

// our friendly neighborhood sausage dog
let sausageDog;

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
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
}

// setup()
//
// Create canvas and new objects here
function setup() {
  // create a canvas that covers entire window
  createCanvas(windowWidth, windowHeight);

  // Create new temporary animal objects and push to animals array
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let animal = new Animal(animalImages[i]);
    animals.push(animal);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  // Set background color of canvas
  background(bgFill.r, bgFill.g, bgFill.b);

  // Display animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let animal = animals[i];
    animal.display();
  }
}
