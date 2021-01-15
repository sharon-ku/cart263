/**************************************************
Assignment 1: Where's Sausage Dog
Sharon Ku

The canvas will display many random images of animals at random positions,
one of which will be a sausage dog.
The player has to click on the sausage dog to win the game.
When clicked successfully, the sausage dog will start spinning.
**************************************************/

"use strict";

// number of animal images (does not include sausage dog)
const NUM_ANIMALS = 10;

// array that stores all non-sausage-dog animals
let animals = [];

// array that stores animal images (does not include sausage dog)
const animalImages = [];

// our friendly neighborhood sausage dog
let sausageDog;

// sausage dog image
let sausageDogImage = undefined;

// background fill color: vibrant green
let bgFill = {
  r: 84,
  g: 227,
  b: 151,
};

// mouse's x and y positions
let mouse = {
  x: 0,
  y: 0,
};

/* ----------------------------------------------------------------------- */

// preload()
//
// Preload all images
function preload() {
  // Loop through all animal images, load them, and push into animalImages array (does not include sausage dog)
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  // Load sausage dog image
  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

/* ----------------------------------------------------------------------- */

// setup()
//
// Create canvas and new objects here
function setup() {
  // create a canvas that covers entire window
  createCanvas(windowWidth, windowHeight);

  // Create new temporary animal objects and push to animals array (does not include sausage dog)
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let animal = new Animal(animalImages[i]);
    animals.push(animal);
  }

  // Create a new sausage dog
  sausageDog = new SausageDog(sausageDogImage);
}

/* ----------------------------------------------------------------------- */

// draw()
//
// Set mouse's x and y positions, set background color, display all animals, make sausage dog spin if clicked on it
function draw() {
  // Setting mouse's x and y position to cursor's position
  mouse.x = mouseX;
  mouse.y = mouseY;

  // Set background color of canvas
  background(bgFill.r, bgFill.g, bgFill.b);

  // Display all animals (sausage dog included!)
  displayAllAnimals();

  // When user clicks the sausage dog, the sausage dog will start spinning
  spinningSausageDog();
}

// Display all animals (sausage dog included!)
function displayAllAnimals() {
  // Display all non-sausage-dog animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let animal = animals[i];
    animal.display();
  }

  // Display sausage dog
  sausageDog.display();
}

// When user clicks the sausage dog, the sausage dog will start spinning
function spinningSausageDog() {
  // If user clicks on sausage dog, set timeToSpin sausage dog to true
  if (mouseIsPressed && sausageDog.overlapsWith(mouse)) {
    sausageDog.timeToSpin = true;
  }

  // If it's time for sausage dog to spin, let it spin!
  if (sausageDog.timeToSpin) {
    sausageDog.spin();
  }
}
