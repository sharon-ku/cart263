/**************************************************
Project 1: Learn English
Sharon Ku

Here is a description of this template p5 project.
**************************************************/
"use strict";

// States of program
// Possible states: intro, learn, game, end
let state = `learn`;

// Vocabulary word
let vocabularyWord = undefined;

let currentWord = undefined;
let englishWord = undefined;
let cantoneseWord = undefined;
let englishSentence = undefined;
let cantoneseSentence = undefined;

// Track which word user is at in the `learn` state
let lessonWordIndex = 1;

// Text to be dislayed on canvas in `learn` state
// Contains: English and Cantonese words and sentences
let lessonText = undefined;

// Background color
let bgFill = {
  r: 255,
  g: 255,
  b: 255,
};

// English speaker's voice (for ResponsiveVoice)
let englishVoice = `US English Male`;
let englishVoiceProperties = {
  pitch: 1.3,
  rate: 0.9,
};

// Cantonese speaker's voice (for ResponsiveVoice)
let cantoneseVoice = `Chinese (Hong Kong) Female`;
let cantoneseVoiceProperties = {
  pitch: 1.15,
};

// Text font
let font;

// Mouse positions
let mouse = {
  x: undefined,
  y: undefined,
};

// // Title rectangle
// let titleRectangle;

// Properties for the paper line (for intro state)
let paperLine = {
  stroke: {
    r: 155,
    g: 236,
    b: 255,
  },
  strokeWeight: 1.5,
  spacing: 30,
};

// Introduction circles
let introCircles = [];
const NUM_INTRO_CIRCLES = 15;

// Rectangular button for learning new words
let rectButtonLearn = undefined;

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

  // Set current word from the JSON file
  setCurrentLessonWord();

  // Create new lesson text for `learn` state
  lessonText = new LessonText(cantoneseWord, englishWord, cantoneseSentence, englishSentence);

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

  // Create intro circles are store in array
  for (let i = 0; i < NUM_INTRO_CIRCLES; i++) {
    let introCircle = new IntroCircle();
    introCircles.push(introCircle);
  }

  // Create a new rectangular button for "Learn"
  rectButtonLearn = new RectButtonLearn(font);


}

// draw()
//
// Set background color and states of program
function draw() {
  // Set mouse x and y position
  mouse.x = mouseX;
  mouse.y = mouseY;

  // Set background color
  background(bgFill.r, bgFill.g, bgFill.b);

  // Setting program states
  if (state === `intro`) {
    intro();
  } else if (state === `learn`) {
    learn();
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

  //   // Test position of rectangles for lesson sets
  //   push();
  //   rectMode(CENTER);
  //   fill(0, 0, 125);
  //   let distFromEdge = 250;
  //   let rectWidth = 290;
  //   let rectHeight = 180;
  //   // left rectangle
  //   rect(distFromEdge, 460, rectWidth, rectHeight, 30);
  //   // middle rectangle
  //   rect(width / 2, 460, rectWidth, rectHeight, 30);
  //   // right rectangle
  //   rect(width - distFromEdge, 460, rectWidth, rectHeight, 30);
  //   pop();
  //
  //   // Test position of text on rect button
  //   push();
  //   textAlign(CENTER, CENTER);
  //   fill(255);
  //   textSize(30);
  //   text(`學習新單詞
  // Learn New Words`, distFromEdge, 460);
  //   pop();

  // Display rectangular button for "learn"
  rectButtonLearn.update(mouse);

  // Make intro circles move around randomly
  for (let i = 0; i < introCircles.length; i++) {
    introCircles[i].update();
  }

  // Set parameters for Cantonese title
  let cantoneseTitle = {
    string: `學英語: 情緒`,
    x: width / 2,
    y: 113,
    r: 0,
    g: 0,
    b: 0,
    size: 100,
    font: font,
    horizAlign: CENTER,
    vertAlign: CENTER,
  };
  // Set parameters for English title
  let englishTitle = {
    string: `Learn How to Say Emotions in English`,
    x: width / 2,
    y: 217,
    r: 119,
    g: 198,
    b: 220,
    size: 40,
    font: font,
    horizAlign: CENTER,
    vertAlign: CENTER,
  };
  // Display Cantonese title
  displayText(cantoneseTitle);
  // Display English title underneath
  displayText(englishTitle);
}

function mousePressed() {
  if (state === `intro`) {
    if (rectButtonLearn.overlapsWith(mouse)) {
      state = `learn`;
    }
    // else if (rectButtonPractice1.overlapsWith(mouse)) {
    //   state = `practice1`;
    // }
    // else if (rectButtonPractice2.overlapsWith(mouse)) {
    //   state = `practice2`;
    // }
  } else if (state === `learn`) {
    // Set current word from the JSON file
    setCurrentLessonWord();

    responsiveVoice.speak(
      englishSentence,
      englishVoice,
      englishVoiceProperties
    );

    responsiveVoice.speak(
      cantoneseSentence,
      cantoneseVoice,
      cantoneseVoiceProperties
    );

    // // Create new lesson text for `learn` state
    // lessonText = new LessonText(cantoneseWord, englishWord, cantoneseSentence, englishSentence);
  }
}

function setCurrentLessonWord() {
  // Set current word from the JSON file
  currentWord = vocabularyWord.lessonWords[lessonWordIndex];
  // Get the English and Cantonese words and sentences at the current word
  englishWord = currentWord.englishWord;

  cantoneseWord = currentWord.cantoneseWord;

  englishSentence = currentWord.englishSentence;

  cantoneseSentence = currentWord.cantoneseSentence;
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
    };
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
    };
    // Draw a vertical line
    drawALine(verticalLine);
  }
}

// Draws a single line with provided end points
function drawALine({ x1, y1, x2, y2 }) {
  push();
  strokeWeight(paperLine.strokeWeight);
  stroke(paperLine.stroke.r, paperLine.stroke.g, paperLine.stroke.b);
  line(x1, y1, x2, y2);
  pop();
}

// Display text by providing parameters
function displayText({
  string,
  x,
  y,
  r,
  g,
  b,
  size,
  font,
  horizAlign,
  vertAlign,
}) {
  push();
  textSize(size);
  textFont(font);
  textAlign(horizAlign, vertAlign);
  fill(r, g, b);
  text(string, x, y);
  pop();
}

// STATE: learn()
//
//
function learn() {

  // Display lesson text
  lessonText.displayAllText(mouse);
}
