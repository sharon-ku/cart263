/**************************************************
Project 1: Learn English
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

// Vocabulary word
let vocabularyWord;

// Background color
let bgFill = {
  r: 0,
  g: 0,
  b: 0
};

// Title rectangle
let titleRectangle;


// preload()
//
// Preload images, json files
function preload() {
  vocabularyWord = loadJSON("assets/data/vocabularyWords.json");
}

// setup()
//
// Description of setup() goes here.
function setup() {
  // Create canvas, remove strokes
  createCanvas(1280, 720);
  noStroke();

  // Create a new rectangle for title
  let titleRectangleProperties  = {
    x: width / 2,
    y: height / 2,
    width: width - 50,
    height: height - 50,
    cornerRadius: 20,
    fillR: 70,
    fillG: 197,
    fillB: 149,
  };
  titleRectangle = new Rectangle(titleRectangleProperties);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  // Set background color
  background(bgFill.r, bgFill.g, bgFill.b);

  // Display title rectangle
  titleRectangle.display();
}
