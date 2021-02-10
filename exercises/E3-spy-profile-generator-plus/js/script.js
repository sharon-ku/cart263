/**************************************************
Exercise 3: Spy Profile Generator++
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

// stores spy profile information
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
};

// background color
let bgColor = 0;

// strange word
let strangeWordData = undefined;

// common object
let objectData = undefined;

// tarot interpretation
let tarotData = undefined;

// store top secret label image
let topSecretLabelImage = undefined;

// top secret label
let topSecretLabel;

// array that stores border lines
let borders = [];

// Preload JSON files and images
function preload() {
  // Load JSON file containing a list of strange words
  strangeWordData = loadJSON(`assets/data/strange_words.json`);
  // Load JSON file containing a list of objects
  objectData = loadJSON(`assets/data/objects.json`);
  // Load JSON file containing a list of tarot interpretations
  tarotData = loadJSON(`assets/data/tarot_interpretations.json`);
  // Load image for top secret label
  topSecretLabelImage = loadImage(`assets/images/top-secret-label.png`);
}

// setup()
//
// Description of setup() goes here.
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
  let topBorder = new TopBorder();
  borders.push(topBorder);
  let bottomBorder = new BottomBorder();
  borders.push(bottomBorder);
}

// Generate a spy profile
function generateSpyProfile() {
  // Set the spy's name to what the user types in
  spyProfile.name = prompt(`Enter your uber secret spy name`);

  // Set the spy's alias to a random strange word
  spyProfile.alias = `the ${random(strangeWordData.words)}`;

  // Set the spy's secret weapon to a random object
  spyProfile.secretWeapon = random(objectData.objects);

  // Find a random tarot card
  let card = random(tarotData.tarot_interpretations);
  // Set the spy's password to a random key word from the tarot interpretations
  spyProfile.password = random(card.keywords);

  // Save the user's spy profile
  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

// draw()
//
// Description of draw() goes here.
function draw() {
  // Set a background color
  background(bgColor);

  // Store spy profile text
  let profile = `**SPY PROFILE**

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}`;

  // Display spy profile
  push();
  fill(255);
  textFont(`Courier, monospace`)
  textAlign(LEFT, TOP);
  textSize(30);
  text(profile, 100, 200);
  pop();

  // Display top secret label
  topSecretLabel.display();

  // Display border line
  for (let i = 0; i < borders.length; i++) {
    borders[i].display();
  }
}
