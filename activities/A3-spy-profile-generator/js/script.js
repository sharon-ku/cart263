/**************************************************
Activity 3: Spy Profile Generator
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

// stores spy profile information
let spyProfile = {
  name: `stranger`,
  alias: `potato head`,
  secretWeapon: `water bottle`,
  password: `kitkat`
};

// background color
let bgColor = 0;


// setup()
//
// Description of setup() goes here.
function setup() {
  // Create a canvas
  createCanvas(windowWidth, windowHeight);

  // Try to load the user data
  let data = JSON.parse(localStorage.getItem(`spy-profile-name`));

  // Check if there's data there
  if (data) {
    // If there is, use the name in the data
    spyProfile.name = data.name;
  }
else {
  // If there's no data, ask the user to enter their spy name
  spyProfile.name = prompt(`Enter your uber secret spy name`, `Bob`);
  // Save the user's name
  localStorage.setItem(`spy-profile-name`, JSON.stringify(spyProfile));
}

}

// draw()
//
// Description of draw() goes here.
function draw() {
  // Set a background color
  background(bgColor);

  let profile = `**SPY PROFILE**

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}`;

  // Display spy name
  push();
  fill(255);
  textFont(`Courier, monospace`)
  textAlign(LEFT, TOP);
  textSize(30);
  text(profile, 100, 100);
  pop();
}
