/**************************************************
Project 1: Learning English for Food Lovers
Sharon Ku

Here is a description of this template p5 project.
**************************************************/
"use strict";

// States of program
// Possible states: intro, learn, game, end
let state = `game`;

// Text font
let font;

// Mouse positions
let mouse = {
  x: undefined,
  y: undefined,
};

// Background color for different states
let bgFill = {
  current: {
    r: undefined,
    g: undefined,
    b: undefined,
  },
  intro: {
    r: 226,
    g: 248,
    b: 249,
  },
  learn: {
    r: 250,
    g: 250,
    b: 250,
  },
};

// English and Cantonese voices
let voice = {
  english: `US English Female`,
  cantonese: `Chinese (Hong Kong) Female`,
};

// English speaker
let englishSpeaker = {
  voice: `US English Female`,
  voiceProperties: {
    pitch: 2,
    rate: 0.9,
  },
};

// Cantonese speaker
let cantoneseSpeaker = {
  voice: `Chinese (Hong Kong) Female`,
  voiceProperties: {
    pitch: 1.15,
  },
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

// Logo that when clicked, brings user to homepage
let logo = undefined;
// Store logo images
let logoImages = [];
// Number of logo images
let NUM_LOGO_IMAGES = 2;

// Introduction circles
let introCircles = [];
const NUM_INTRO_CIRCLES = 15;

// Array that stores food images in intro state
let foodImages = [];
const NUM_FOOD_IMAGES = 10;

// Store floating foods for intro state
let floatingFoods = [];

// Rectangular button for learning new words
let rectButtonLearn = undefined;
let rectButtonFlashcards = undefined;
let rectButtonGame = undefined;

// Store all rectangular buttons here
let rectButtons = [];

// Vocabulary word
let vocabularyWord = undefined;

let currentWord = undefined;
let englishWord = undefined;
let cantoneseWord = undefined;
let englishSentence = undefined;
let cantoneseSentence = undefined;

// Track which word user is at in the `learn` state
let lessonWordIndex = 0;

// Text to be dislayed on canvas in `learn` state
// Contains: English and Cantonese words and sentences
let lessonText = undefined;

// Text to be displayed in `learn` state
let englishWordText = undefined;
let cantoneseWordText = undefined;
let englishSentenceText = undefined;
let cantoneseSentenceText = undefined;

// Lesson progress bar in `learn` state
let lessonProgressBar = undefined;

// Scroll arrow image
let scrollArrowImage = undefined;

// Scroll arrow in `learn` state
let scrollArrow = undefined;

// True if time to choose random word in `flashcards` state
let timeToChooseRandomWord = false;

// Finish line in `game` state
let finishLine = undefined;

// Hamburger
let hamburger;
// Hamburger image
let hamburgerImage;

// Fwoggy
let fwoggy;
// Fwoggy image
let fwoggyImage;

// Store all cats
let cats = [];
// Number of cats
let numCats = 2;
// Cat images
let catImages = [];
// Number of cat images
const NUM_CAT_IMAGES = 2;

// preload()
//
// Preload images, json files
function preload() {
  // Load JSON file containing vocabulary words
  vocabularyWord = loadJSON(`assets/data/vocabularyWords.json`);

  // Load text font
  // font = loadFont(`assets/fonts/NotoSansSC-Medium.otf`);
  font = loadFont(`assets/fonts/NotoSansSC-Medium.otf`);

  // Load logo images and push to logoImages array
  for (let i = 0; i < NUM_LOGO_IMAGES; i++) {
    let logoImage = loadImage(`assets/images/logo${i}.png`);
    logoImages.push(logoImage);
  }

  // Load food images for intro state
  for (let i = 0; i < NUM_FOOD_IMAGES; i++) {
    let foodImage = loadImage(`assets/images/food/food${i}.png`);
    foodImages.push(foodImage);
  }

  // Load scroll arrow image
  scrollArrowImage = loadImage(`assets/images/food/food6.png`);

  // Load hamburger image
  hamburgerImage = loadImage(`assets/images/hamburger.png`);

  // Load fwoggy image
  fwoggyImage = loadImage(`assets/images/fwoggy.png`);

  // Load cat images
  for (let i = 0; i < NUM_CAT_IMAGES; i++) {
    let catImage = loadImage(`assets/images/cat${i}.png`);
    catImages.push(catImage);
  }
}

// =============================================================
// setup()
//
// Description of setup() goes here.
// =============================================================
function setup() {
  // Create canvas, remove strokes
  createCanvas(1280, 720);
  noStroke();

  // Set current word from the JSON file
  setCurrentLessonWord();

  // Create new lesson text for `learn` state
  createLessonText();

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

  // Create new logo
  logo = new Logo(logoImages);

  // Create intro circles are store in array
  for (let i = 0; i < NUM_INTRO_CIRCLES; i++) {
    let introCircle = new IntroCircle();
    introCircles.push(introCircle);
  }

  // Create a new rectangular button for "Learn New Words"
  rectButtonLearn = new RectButtonLearn(font);
  // Create a new rectangular button for "Activity: Flashcards"
  rectButtonFlashcards = new RectButtonFlashcards(font);
  // Create a new rectangular button for "Game: Snack Time!"
  rectButtonGame = new RectButtonGame(font);

  // Push all created buttons to rectButtons array
  rectButtons.push(rectButtonLearn, rectButtonFlashcards, rectButtonGame);

  // Create new food items for intro state
  for (let i = 0; i < foodImages.length; i++) {
    let floatingFood = new FloatingFood(foodImages[i]);
    floatingFoods.push(floatingFood);
  }

  // Create lesson progress bar
  lessonProgressBar = new LessonProgressBar();

  // Create new scroll arrow
  scrollArrow = new ScrollArrow(scrollArrowImage);

  // Create new finish line
  finishLine = new FinishLine();

  // Create a new hamburger
  hamburger = new Hamburger(hamburgerImage);

  // Create a new fwoggy
  fwoggy = new Fwoggy(fwoggyImage);

  // Check if annyang is available
  if (annyang) {
    // Create commands
    let commands = {
      // If the user responds, set the current answer to the animal guessed
      "*guess": guessEnglishWord,
    };
    // Add the commands and start annyang
    annyang.addCommands(commands);
    annyang.start();
  }
}

// Get the current vocabulary word from JSON file and grab its English and Cantonese words and sentences
function setCurrentLessonWord() {
  // Set current word from the JSON file
  currentWord = vocabularyWord.lessonWords[lessonWordIndex];

  // Get the English and Cantonese words and sentences at the current word
  englishWord = currentWord.englishWord;
  cantoneseWord = currentWord.cantoneseWord;
  englishSentence = currentWord.englishSentence;
  cantoneseSentence = currentWord.cantoneseSentence;
}

// Create new lesson text for `learn` state
function createLessonText() {
  englishWordText = new EnglishWordText(englishWord, font);
  cantoneseWordText = new CantoneseWordText(cantoneseWord, font);
  englishSentenceText = new EnglishSentenceText(englishSentence, font);
  cantoneseSentenceText = new CantoneseSentenceText(cantoneseSentence, font);
}

// =============================================================
// draw()
//
// Set mouse positions, background color, and states of program
// =============================================================
function draw() {
  // Set mouse x and y position
  mouse.x = mouseX;
  mouse.y = mouseY;

  // Set background color
  background(bgFill.current.r, bgFill.current.g, bgFill.current.b);

  // Setting program states
  if (state === `intro`) {
    intro();
  } else if (state === `learn`) {
    learn();
  } else if (state === `flashcards`) {
    flashcards();
  } else if (state === `game`) {
    game();
  } else if (state === `end`) {
    end();
  }
}

// =============================================================
// mousePressed()
//
// Behaviour for when mouse is pressed
// =============================================================
function mousePressed() {
  // Execute mousePressed method for logo
  logo.mousePressed(mouse);

  // If it's the intro state and mouse pressed on button, execute button's mousePressed method
  if (state === `intro`) {
    for (let i = 0; i < rectButtons.length; i++) {
      rectButtons[i].mousePressed(mouse);
    }
  }
  // If it's the learn state and mouse pressed on a string of text, execute mousePressed methods of each string
  else if (state === `learn`) {
    englishWordText.mousePressed(mouse, englishSpeaker, cantoneseSpeaker);
    cantoneseWordText.mousePressed(mouse, englishSpeaker, cantoneseSpeaker);
    englishSentenceText.mousePressed(mouse, englishSpeaker, cantoneseSpeaker);
    cantoneseSentenceText.mousePressed(mouse, englishSpeaker, cantoneseSpeaker);
  }
}

// =============================================================
// STATE: intro()
//
// Show title page
// =============================================================
function intro() {
  // Abort annyang
  annyang.abort();

  // Set background color
  bgFill.current = bgFill.intro;

  // // Display title rectangle
  // titleRectangle.display();

  // Draw page lines that resemble graph paper
  drawPageLines();

  // Update logo behaviour
  logo.update(mouse);

  // Make intro circles move around randomly
  for (let i = 0; i < introCircles.length; i++) {
    introCircles[i].update();
  }

  // Update all rectangular buttons in `learn` state
  rectButtonLearn.update(mouse);
  rectButtonFlashcards.update(mouse);
  rectButtonGame.update(mouse);

  // Make food float around randomly
  for (let i = 0; i < floatingFoods.length; i++) {
    floatingFoods[i].update();
  }

  // Set parameters for Cantonese title
  let cantoneseTitle = {
    string: `學英語: 情緒`,
    x: width / 2,
    y: 113,
    r: 255,
    g: 255,
    b: 255,
    strokeFill: color(119, 198, 220),
    strokeThickness: 8,
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
    strokeFill: 255,
    strokeThickness: 5,
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

// Draw page lines that resemble graph paper
function drawPageLines() {
  // Draw horizontal and vertical lines across the page
  drawHorizontalLines();
  drawVerticalLines();
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
  strokeFill,
  strokeThickness,
  size,
  font,
  horizAlign,
  vertAlign,
}) {
  push();
  textSize(size);
  textFont(font);
  stroke(strokeFill);
  strokeWeight(strokeThickness);
  textAlign(horizAlign, vertAlign);
  fill(r, g, b);
  text(string, x, y);
  pop();
}

// =============================================================
// STATE: learn()
//
// Show a new vocabulary word at a time with its corresponding Cantonese word, English example sentence, and Cantonese example sentence; scrolling allows you to switch between pages
// =============================================================
function learn() {
  // Set background color
  bgFill.current = bgFill.learn;

  // Draw page lines that resemble graph paper
  drawPageLines();

  // Update logo behaviour
  logo.update(mouse);

  // Set current lesson word
  setCurrentLessonWord();

  // Update lesson text that is displayed on canvas
  updateLessonText();

  // Update lesson progress bar
  lessonProgressBar.update(
    lessonWordIndex,
    vocabularyWord.lessonWords.length - 1
  );

  // Display scroll arrow image
  scrollArrow.update();
}

// Update lesson text that is displayed on canvas
function updateLessonText() {
  englishWordText.update(englishWord, mouse);
  cantoneseWordText.update(cantoneseWord, mouse);
  englishSentenceText.update(englishSentence, mouse);
  cantoneseSentenceText.update(cantoneseSentence, mouse);
}

// When scrolling mouse, change current word that is displayed
function mouseWheel(event) {
  // If scrolling down, go to next word & make sure not to exceed total lesson word count
  if (
    event.delta > 0 &&
    lessonWordIndex < vocabularyWord.lessonWords.length - 1
  ) {
    lessonWordIndex += 1;
  }
  // Else if scrolling up, go to previous word
  else if (event.delta < 0 && lessonWordIndex > 0) {
    lessonWordIndex -= 1;
  }
}

// =============================================================
// STATE: flashcards()
//
// Show a Cantonese word on each flashcard and have user say corresponding English word out loud
// =============================================================
function flashcards() {
  // Set background color
  bgFill.current = bgFill.learn;

  // Draw page lines that resemble graph paper
  drawPageLines();

  // If it's time to choose a random word, pick a random lessonWordIndex
  chooseRandomWord();

  // Set current lesson word
  setCurrentLessonWord();

  // Update Cantonese flashcard
  updateCantoneseFlashcard();
}

// If it's time to choose a random word, pick a random lessonWordIndex
function chooseRandomWord() {
  if (timeToChooseRandomWord) {
    // Get a random number within range of index numbers for lessonWords
    // Note that since Math.floor (used in next step) rounds number DOWN to an integer, the last argument provided in random() is an integer higher than range of index numbers
    let randomIndex = random(0, vocabularyWord.lessonWords.length);
    // Since randomIndex can be a decimal number, use Math.floor to return biggest integer that is less than or equal to randomIndex
    lessonWordIndex = Math.floor(randomIndex);
    print(lessonWordIndex);
    // It's no longer time to choose random word
    timeToChooseRandomWord = false;
  }
}

// Update lesson text that is displayed on canvas
function updateCantoneseFlashcard() {
  cantoneseWordText.update(cantoneseWord, mouse);
}

// =============================================================
// STATE: game()
//
// Reveal Cantonese vocabulary words as food items and have user say its corresponding English word before the food crosses the finish line. User has 3 sandwich lives.
// =============================================================
function game() {
  // Resume annyang
  annyang.resume();

  // Set background color
  background(0);

  // Update logo behaviour
  logo.update(mouse);

  // // Update finish line
  // finishLine.update();

  // Update hamburger
  hamburger.update();

  // Update fwoggy
  fwoggy.update();

  // Create a new cat
  if (cats.length < numCats) {
    // Set x position of cat
    let x;
    // Half the time, cat will appear on right side of canvas, the other half on left side
    if (random() < 0.5) {
      x = width + 100;
    } else {
      x = -100;
    }
    // Set y position of cat
    let y = random(0, height);

    // Set current word from the JSON file
    currentWord = random(vocabularyWord.lessonWords);

    // Get the English and Cantonese words and sentences at the current word
    cantoneseWord = currentWord.cantoneseWord;
    englishWord = currentWord.englishWord;

    // Create new cat
    let cat = new Cat(x, y, catImages, font, cantoneseWord, englishWord);

    cats.push(cat);
  }

  // Update cats
  for (let i = 0; i < cats.length; i++) {
    cats[i].update(hamburger);
  }
}

// Guess the English word
function guessEnglishWord(guess) {
  console.log(guess);
}
