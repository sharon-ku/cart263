/**************************************************
Exercise 3: Spy Profile Generator++
Sharon Ku

When the user first loads the proram it will ask for their name in a text prompt.
Once provided, the program will generate and save the user's super secret spy profile using random JSON data.
Profile contains: name, alias, secret weapon, favorite hobby, pet name, and password.
When the user returns later, they will need to enter their generated password to view their profile again.
User can delete all information by clicking DELETE key (this is for extreme cases like identity theft!!!)

Sources:
JSON files from https://github.com/dariusk/corpora
**************************************************/

"use strict";

// stores spy profile information
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  favoriteHobby: `**REDACTED**`,
  petName: `**REDACTED**`,
  password: `**REDACTED**`
};

// background color
const BG_COLOR = 0;

// Store data
//   strange word (used for alias)
let strangeWordData = undefined;
//   common object (used for secret weapon)
let objectData = undefined;
//   verb (used for favorite hobby)
let verbData = undefined;
//   condiment (used for pet name)
let condimentData = undefined;
//   tarot interpretation (used for password)
let tarotData = undefined;

// store top secret label image
let topSecretLabelImage = undefined;

// top secret label
let topSecretLabel;

// array that stores border lines
let borders = [];

// Preload JSON files and images
function preload() {
  // LOADING JSON FILES-----
  // Load JSON file containing a list of strange words
  strangeWordData = loadJSON(`assets/data/strange_words.json`);
  // Load JSON file containing a list of objects
  objectData = loadJSON(`assets/data/objects.json`);
  // Load JSON file containing a list of verbs
  verbData = loadJSON(`assets/data/verbs.json`);
  // Load JSON file containing a list of condiments
  condimentData = loadJSON(`assets/data/condiments.json`);
  // Load JSON file containing a list of tarot interpretations
  tarotData = loadJSON(`assets/data/tarot_interpretations.json`);

  // LOADING IMAGES-----
  // Load image for top secret label
  topSecretLabelImage = loadImage(`assets/images/top-secret-label.png`);
}

// setup()
//
// Create canvas, check if spy profile data exists already and either generate new data or restore old data, check password if restoring old data, create objects from classes
function setup() {
  // Create a canvas
  createCanvas(windowWidth, windowHeight);

  // Try to load the user data
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

  // Check if there's saved data, then copy it into the profile
  if (data) {
    // Ask use to type password
    let password = prompt(`What's your password?`);

    // If the password matches the password stored in the data, then load data of spy's profile
    if (password === data.password) {
      // If there is, set the spy data to the already saved data
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.favoriteHobby = data.favoriteHobby;
      spyProfile.petName = data.petName;
      spyProfile.password = data.password;
    }
  }
  else {
    // If there's no data, generate a spy profile
    generateSpyProfile();
  }

  // Create new top secret label
  topSecretLabel = new TopSecretLabel(topSecretLabelImage);

  // Create new border lines and store in borders array
  createNewBorders();
}

// Generate a spy profile
function generateSpyProfile() {
  // Set the spy's name to what the user types in
  spyProfile.name = prompt(`Enter your uber secret spy name`);

  // Set the spy's alias to a random strange word
  spyProfile.alias = `the ${random(strangeWordData.words)}`;

  // Set the spy's secret weapon to a random object
  spyProfile.secretWeapon = random(objectData.objects);

  // Find a random verb
  let verb = random(verbData.verbs);
  // Set the spy's favorite hobby to a random verb
  spyProfile.favoriteHobby = `to ${verb.present}`;

  // Set the spy's pet name to a random condiment
  spyProfile.petName = random(condimentData.condiments);

  // Find a random tarot card
  let card = random(tarotData.tarot_interpretations);
  // Set the spy's password to a random key word from the tarot interpretations
  spyProfile.password = random(card.keywords);

  // Save the user's spy profile
  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

// Create new border lines and store in borders array
function createNewBorders() {
  let topBorder = new TopBorder();
  borders.push(topBorder);
  let bottomBorder = new BottomBorder();
  borders.push(bottomBorder);
}

// draw()
//
// Set background color, display spy profile text, display top secret label image, display two red border lines
function draw() {
  // Set a background color
  background(BG_COLOR);

  // Display spy profile text
  displaySpyProfileText();

  // Display top secret label
  topSecretLabel.display();

  // Display border lines
  for (let i = 0; i < borders.length; i++) {
    borders[i].display();
  }
}

// If Delete key is pressed:
function keyPressed() {
  if (keyCode === DELETE) {
    // Remove all data stored for spy profile
    localStorage.removeItem(`spy-profile-data`);

    // Set all data to REDACTED
    spyProfile.name = `**REDACTED**`;
    spyProfile.alias = `**REDACTED**`;
    spyProfile.secretWeapon = `**REDACTED**`;
    spyProfile.favoriteHobby = `**REDACTED**`;
    spyProfile.petName = `**REDACTED**`;
    spyProfile.password = `**REDACTED**`;
  }
}

// Display spy profile text
function displaySpyProfileText() {
  let profile = `**SPY PROFILE**

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Favorite Hobby: ${spyProfile.favoriteHobby}
Pet Name: ${spyProfile.petName}
Password: ${spyProfile.password}


**IN THE CASE OF IDENTITY THEFT**
CLICK 'DELETE' ON YOUR KEYBOARD TO REMOVE ALL INFORMATION`;

  push();
  fill(255);
  textFont(`Courier, monospace`)
  textAlign(LEFT, TOP);
  textSize(30);
  text(profile, 100, 150);
  pop();
}
