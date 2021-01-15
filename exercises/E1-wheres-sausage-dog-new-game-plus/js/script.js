/**************************************************
Assignment 1: Where's Sausage Dog?
Sharon Ku

The canvas will display many random images of animals at random positions,
one of which will be a sausage dog.
The player has to click on the sausage dog to win the game.
When clicked successfully, the sausage dog will start spinning.
**************************************************/

"use strict";

// state of program
// all possible states: intro, game, defeat, victory
let state = `intro`;

// title
let title = undefined;

// intro sausage dog
let introDog = undefined;

// play button in intro
let playButton = undefined;

// ANIMALS (does not include sausage dog)
// number of animal images
const NUM_ANIMALS = 100;
// number of animal images
const NUM_ANIMAL_IMAGES = 10;
// array that stores all non-sausage-dog animals
let animals = [];
// array that stores animal images
let animalImages = [];

// SAUSAGE DOG
// our friendly neighborhood sausage dog
let sausageDog = undefined;
// sausage dog image
let sausageDogImage = undefined;

// background fill color: vibrant green
let bgFill = {
  r: 84,
  g: 227,
  b: 151,
};

// border around canvas where animals cannot be displayed
let border = 80;

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
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  // Load sausage dog image
  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

/* ----------------------------------------------------------------------- */

// setup()
//
// Create canvas and new objects here, remove all strokes
function setup() {
  // Create a canvas that covers entire window
  createCanvas(windowWidth, windowHeight);

  // Remove all strokes
  noStroke();

// Create all elements for intro: title, intro dog, and play button
  createIntroElements();

  // Create new animal objects and push to animals array
  createAnimals();

  // Create a new sausage dog
  createSausageDog();
}

// Create all elements for intro: title, intro dog, and play button
function createIntroElements() {
  title = new Title();

  let x = width / 2;
  let y = title.y + 400;
  introDog = new IntroDog(x, y, sausageDogImage);

  playButton = new PlayButton(title);
}

// Create new animal objects and push to animals array
function createAnimals() {
  for (let i = 0; i < NUM_ANIMALS; i++) {
    // Setting random x and y positions
    let x = random(-width, width);
    let y = random(border, height - border);

    // Selecting random image
    let animalImage = random(animalImages);

    // Create an animal
    let animal = new Animal(x, y, animalImage);

    // Push temporary animal object into animals array
    animals.push(animal);
  }
}

// Create a new sausage dog
function createSausageDog() {
  // Setting random x and y positions
  let x = random(border, width - border);
  let y = random(border, height - border)

  // Create a new sausage dog;
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

/* ----------------------------------------------------------------------- */

// draw()
//
// Set mouse's x and y positions, set background color, set states
function draw() {
  // Setting mouse's x and y position to cursor's position
  mouse.x = mouseX;
  mouse.y = mouseY;

  // Set background color of canvas
  background(bgFill.r, bgFill.g, bgFill.b);

  // Set states
  if (state === `intro`) {
    intro();
  }
  else if (state === `game`) {
    game();
  }
  else if (state === `victory`) {
    victory();
  }
  else if (state === `defeat`) {
    defeat();
  }
}

// Intro state
// Display title and play button
function intro() {
  // Update the title
  title.update();

  // Update the play button
  playButton.update();

  // Update intro dog
  // introDog.update();

  // If play button clicked, set to game state
  if (playButton.clicked) {
    state = `game`;
  }
}

// Game state
// Display all animals and have them walk left to right, make sausage dog spin if clicked on it
function game() {
  // Update all non-sausage-dog animals
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  // Update sausage dog
  sausageDog.update();
}

// If mouse is pressed, call sausage dog's mousePressed method
function mousePressed() {
  if (state === `intro`) {
    playButton.mousePressed(mouse);
  } else if (state === `game`) {
    sausageDog.mousePressed(mouse);
  }
}

// Victory state
function victory() {

}