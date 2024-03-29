/**************************************************
Exercise: Where's Sausage Dog? New Game+
Sharon Ku

The canvas will display many random images of animals at random positions,
one of which will be a sausage dog.
The player has to click on the sausage dog to win the game.
There are 3 levels in total. If player completes them, player will be rewarded with a spinning dog.
If not, player will feel bad after reading the defeat text.
**************************************************/

"use strict";

// state of program
// all possible states: intro, game, defeat, victory
let state = `intro`;

// level of game
// all possible levels: 1, 2, 3
let level = 1;

// title displayed in intro state
let title = undefined;
// text displayed in victory state
let victoryText = undefined;
// text displayed in defeat state
let defeatText = undefined;

// intro sausage dog
let introDog = undefined;

// play button in intro
let playButton = undefined;

// ANIMALS (does not include sausage dog)
// number of animals
const NUM_ANIMALS = 400;
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

// background fill colors
let bgFill = {
  normal: {
    r: 66,
    g: 199,
    b: 128,
  },
  level1: {
    r: 66,
    g: 199,
    b: 128,
  },
  level2: {
    r: 52,
    g: 99,
    b: 74,
  },
  level3: {
    r: 0,
    g: 0,
    b: 0,
  },
};

// border around canvas where animals cannot be displayed
let border = 20;

// mouse's x and y positions
let mouse = {
  x: 0,
  y: 0,
};

// font
let fontRegular;

/* ----------------------------------------------------------------------- */

// preload()
//
// Preload all images
function preload() {
  fontRegular = loadFont('assets/fonts/DarumadropOne-Regular.ttf');

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

  // Create end state text (victoryText and defeatText)
  createEndingText();
}

// Create all elements for intro: title, intro dog, and play button
function createIntroElements() {
  title = new Title();

  let x = width / 2;
  let y = title.y + 480;
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

  // Create a new sausage dog
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

// Create end state text (victoryText and defeatText)
function createEndingText() {
  victoryText = new VictoryText();
  defeatText = new DefeatText();
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
  background(bgFill.normal.r, bgFill.normal.g, bgFill.normal.b);

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
  playButton.update(mouse);

  // Update intro dog
  introDog.update();

  // If play button clicked, set to game state
  if (playButton.clicked) {
    state = `game`;
  }
}

// Game state
// Display all animals and have them walk left to right, make sausage dog spin if clicked on it
function game() {
  // Setting up the levels
  if (level === 1) {
    level1();
  } else if (level === 2) {
    level2();
  } else if (level === 3) {
    level3();
  }

  // Cue defeat state if user did not click on sausage dog
  if (sausageDog.defeat) {
    defeat();
  }
}

// Level 1
// Static animals
function level1() {
  // Set level 1 background color
  background(bgFill.level1.r, bgFill.level1.g, bgFill.level1.b);

  // Update the level to 2 if dog is found
  switchLevel();

  // Update all animals
  updateAllAnimals();
}

// Switch levels depending on current level + reset animal positions
function switchLevel() {
  if (sausageDog.updateLevel) {
    if (level === 1) {
      level = 2;
    } else if (level === 2) {
      level = 3;
    } else if (level === 3) {
      level = 4;
      state = `victory`;
    }

    // Reset all animals' positions
    resetAnimalPositions();
    // Set update level to false since we are done updating level
    sausageDog.updateLevel = false;
  }
}

// Update all animals
function updateAllAnimals() {
  // Update all non-sausage-dog animals
  for (let i = 0; i < animals.length; i++) {
    animals[i].update(level);
  }

  // Update sausage dog
  sausageDog.update(level);
}

// Level 2
// Moving animals
function level2() {
  // Set level 2 background color
  background(bgFill.level2.r, bgFill.level2.g, bgFill.level2.b);

  // Update the level to 3 if dog is found
  switchLevel();

  // Update all animals
  updateAllAnimals();
}

// Level 3
// Moving animals
function level3() {
  // Set level 2 background color
  background(bgFill.level3.r, bgFill.level3.g, bgFill.level3.b);

  // Update the level to 3 if dog is found
  switchLevel();

  // Update all animals
  updateAllAnimals();
}

// Reset positions of animals
function resetAnimalPositions() {
  // Change all non-sausage-dog animals' positions
  for (let i = 0; i < animals.length; i++) {
    animals[i].changePosition(border);
  }

  // Change sausage dog's position
  sausageDog.changePosition(border);
}

// Defines what happens when mouse is pressed
function mousePressed() {
  // If state is intro, set what happens if play button is pressed
  if (state === `intro`) {
    playButton.mousePressed(mouse);
  }
  // If state is game, call sausage dog's mousePressed method
  else if (state === `game`) {
    sausageDog.mousePressed(mouse);
  }
}

// Victory state
function victory() {
  // Update the victoryText
  victoryText.update();

  // Display spinning sausage dog that kind of floats around mindlessly
  sausageDog.update(level);
}

// Defeat state
function defeat() {
  // Set background color of canvas
  background(bgFill.normal.r, bgFill.normal.g, bgFill.normal.b);

  // Update the defeatText
  defeatText.update();
}
