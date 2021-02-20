/**************************************************
Project 1: Learn English
Sharon Ku

Here is a description of this template p5 project.
**************************************************/
"use strict";

// States of program
// Possible states: intro, lesson, game, end
let state = `intro`;

// Vocabulary word
let vocabularyWord;

// Background color
let bgFill = {
  r: 255,
  g: 255,
  b: 255
};

// Text font
let font;

// // Title rectangle
// let titleRectangle;

// Properties for the paper line (for intro state)
let paperLine = {
  stroke: {
    r: 155,
    g: 236,
    b: 255
  },
  strokeWeight: 1.5,
  spacing: 30
};


// preload()
//
// Preload images, json files
function preload() {
  vocabularyWord = loadJSON("assets/data/vocabularyWords.json");

  // Load text font
  font = loadFont(`assets/fonts/NotoSansSC-Medium.otf`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  // Create canvas, remove strokes
  createCanvas(1280, 720);
  noStroke();

  // // Create a new rectangle for title
  // let titleRectangleProperties  = {
  //   x: width / 2,
  //   y: height / 2,
  //   width: width - 50,
  //   height: height - 50,
  //   cornerRadius: 20,
  //   fillR: 70,
  //   fillG: 197,
  //   fillB: 149,
  // };
  // titleRectangle = new Rectangle(titleRectangleProperties);


}

// draw()
//
// Set background color and states of program
function draw() {
  // Set background color
  background(bgFill.r, bgFill.g, bgFill.b);

  // Setting program states
  if (state === `intro`) {
    intro();
  } else if (state === `lesson`) {
    lesson();
  } else if (state === `game`) {
    game();
  } else if (state === `end`) {
    end();
  }
}

// STATE: intro()
//
// Show title page
function intro() {
  // // Display title rectangle
  // titleRectangle.display();

  // Draw horizontal and vertical lines across page
  drawHorizontalLines();
  drawVerticalLines();

  // Set parameters for title
  let title = {
    string: `學英語`,
    x: width / 2,
    y: 150,
    r: 0,
    g: 0,
    b: 0,
    size: 80,
    font: font,
    horizAlign: CENTER,
    vertAlign: CENTER,
  }
  // Display title
  displayText(title);
}

// Draw horizontal lines across the page
function drawHorizontalLines() {
  // Draw lines from top to bottom of page
  for (let i = paperLine.spacing; i < height; i += paperLine.spacing) {
    // End point coordinates of line
    let horizontalLine = {
      x1: 0,
      x2: width,
      y1: i,
      y2: i,
    }
    // Draw a vertical line
    drawALine(horizontalLine);
  }
}

// Draw vertical lines across the page
function drawVerticalLines() {
  // Draw lines from left to right of page
  for (let i = paperLine.spacing; i < width; i += paperLine.spacing) {
    // End point coordinates of line
    let verticalLine = {
      x1: i,
      x2: i,
      y1: 0,
      y2: height,
    }
    // Draw a vertical line
    drawALine(verticalLine);
  }
}

// Draws a single line with provided end points
function drawALine({x1, y1, x2, y2}) {
  push();
  strokeWeight(paperLine.strokeWeight);
  stroke(paperLine.stroke.r, paperLine.stroke.g, paperLine.stroke.b);
  line(x1, y1, x2, y2);
  pop();
}

// Display text by providing parameters
function displayText({string, x, y, r, g, b, size, font, horizAlign, vertAlign}) {
  push();
  textSize(size);
  textFont(font);
  textAlign(horizAlign, vertAlign);
  fill(r, g, b);
  text(string, x, y);
  pop();
}
