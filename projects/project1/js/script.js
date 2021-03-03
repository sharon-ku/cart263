/**************************************************
Project 1: Learning English for Food Lovers
Sharon Ku

Here is a description of this template p5 project.
**************************************************/
"use strict";

// States of program
// Possible states: intro, learn, game, defeat, victory
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

// Properties for the paper line
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
const NUM_LOGO_IMAGES = 2;

// FOR INTRO STATE ------------------------------
// Introduction circles
let introCircles = [];
const NUM_INTRO_CIRCLES = 15;

// Array that stores food images
let foodImages = [];
const NUM_FOOD_IMAGES = 10;

// Store floating foods
let floatingFoods = [];

// Rectangular button for learning new words
let rectButtonLearn = undefined;
let rectButtonFlashcards = undefined;
let rectButtonGame = undefined;

// Store all rectangular buttons here
let rectButtons = [];

// FOR LEARN STATE ------------------------------
// Vocabulary word
let vocabularyWord = undefined;

let currentWord = undefined;
let englishWord = undefined;
let cantoneseWord = undefined;
let englishSentence = undefined;
let cantoneseSentence = undefined;

// Track which word user is at
let lessonWordIndex = 0;

// Text to be dislayed on canvas
// Contains: English and Cantonese words and sentences
let lessonText = undefined;

// Text to be displayed
let englishWordText = undefined;
let cantoneseWordText = undefined;
let englishSentenceText = undefined;
let cantoneseSentenceText = undefined;

// Lesson progress bar
let lessonProgressBar = undefined;

// Scroll arrow image
let scrollArrowImage = undefined;

// Scroll arrows
let topArrow;
let bottomArrow;

// FOR GAME STATE ------------------------------
// Level of game
let level = -1;

// Number of lives
let numLives = 10;

// Hamburger hearts symbolizing number of lives
let hearts = [];
// Heart image
let heartImage = undefined;

// True if time to choose random word in `flashcards` state
let timeToChooseRandomWord = false;

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
// Cat images
let catImages = [];
// Number of cat images
const NUM_CAT_IMAGES = 4;

// Store all cat shiver lines
let shivers = [];
// Shiver images
let shiverImages = [];
// Number of shiver images
const NUM_SHIVER_IMAGES = 4;

// True if it's time to check if answer is correct
let timeToCheckIfAnswerCorrect = false;

// True if it's time to update number of correct answers
let timeToUpdateNumCorrectAnswers = false;

// True if it's victory time
let victoryTime = false;
// True if it's defeat time
let defeatTime = false;

// Store current answer
let currentAnswer = undefined;

// Info on cats for each level
let levelCat = undefined;

// =============================================================
// preload()
//
// Preload images, json files, sounds
// =============================================================
function preload() {
  // Load JSON file containing vocabulary words
  vocabularyWord = loadJSON(`assets/data/vocabularyWords.json`);

  // Load JSON file containing info on cats for each level
  levelCat = loadJSON(`assets/data/levelCats.json`);

  // Load text font
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
  scrollArrowImage = loadImage(`assets/images/arrow.png`);

  // Load hamburger image
  hamburgerImage = loadImage(`assets/images/hamburger.png`);

  // Load fwoggy image
  fwoggyImage = loadImage(`assets/images/fwoggy.png`);

  // Load cat images
  for (let i = 0; i < NUM_CAT_IMAGES; i++) {
    let catImage = loadImage(`assets/images/cat/cat${i}.png`);
    catImages.push(catImage);
  }

  // Load shiver images
  for (let i = 0; i < NUM_SHIVER_IMAGES; i++) {
    let shiverImage = loadImage(`assets/images/cat/shiver${i}.png`);
    shiverImages.push(shiverImage);
  }

  // Load hamburger heart image
  heartImage = loadImage(`assets/images/heart.png`);
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

  // // Create a new rectangle for title
  // let titleRectangleProperties = {
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

  // Prepare all elements for `intro`, `lesson`, and `game` states
  prepareIntro();
  prepareLesson();
  prepareGame();

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

// Setup for `intro` state
function prepareIntro() {
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

  // Create new food items
  for (let i = 0; i < foodImages.length; i++) {
    let floatingFood = new FloatingFood(foodImages[i]);
    floatingFoods.push(floatingFood);
  }
}

// Setup for `lesson` state
function prepareLesson() {
  // Set current word from the vocabularyWords.json
  setCurrentLessonWord();

  // Create new lesson text
  createLessonText();

  // Create lesson progress bar
  lessonProgressBar = new LessonProgressBar();

  // Create top and bottoms scroll arrows
  createScrollArrows();
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

// Create top and bottoms scroll arrows
function createScrollArrows() {
  // Create top scroll arrow
  let topArrowProperties = {
    image: scrollArrowImage,
    y: 50,
    yMax: 60,
    yMin: 50,
    scaleY: -1,
  };
  topArrow = new ScrollArrow(topArrowProperties);

  // Create bottom scroll arrow
  let bottomArrowProperties = {
    image: scrollArrowImage,
    y: height - 50,
    yMax: height - 50,
    yMin: height - 60,
    scaleY: 1,
  };
  bottomArrow = new ScrollArrow(bottomArrowProperties);
}

// Setup for `game` state
function prepareGame() {
  // Create a new hamburger
  hamburger = new Hamburger(hamburgerImage);

  // Create a new fwoggy
  fwoggy = new Fwoggy(fwoggyImage);

  // Create hearts that represent lives
  createHearts();
}

// Create hearts that represent lives
function createHearts() {
  for (let i = 0; i < numLives; i++) {
    // Set the x position of the last heart in row of hearts
    let lastXPositionOfHeart = width - 70;
    let distBtwHearts = 60;

    // Calculate x position of heart
    let calculatedXPosition = lastXPositionOfHeart - i * distBtwHearts;

    // Set heart properties
    let heartProperties = {
      image: heartImage,
      x: calculatedXPosition,
      y: 60,
    };
    // Create hearts with those properties
    let heart = new Heart(heartProperties);

    // Push new beating heart into hearts array
    hearts.push(heart);
  }
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
  } else if (state === `defeat`) {
    defeat();
  } else if (state === `victory`) {
    victory();
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

    if (rectButtonGame.overlapsWith(mouse)) {
      // Reset game variables
      resetGame();
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

// Reset all game variables
function resetGame() {
  // Delete all cats
  cats = [];

  // Level of game
  level = -1;

  // Number of lives
  numLives = 10;

  // True if it's time to check if answer is correct
  timeToCheckIfAnswerCorrect = false;

  // True if it's time to update number of correct answers
  timeToUpdateNumCorrectAnswers = false;

  // True if it's victory time
  victoryTime = false;

  // True if it's defeat time
  defeatTime = false;

  // Reset currentAnswer
  currentAnswer = undefined;
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
  for (let i = 0; i < rectButtons.length; i++) {
    rectButtons[i].update(mouse);
  }

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
    // Draw a horizontal line
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

  // Depending on the word user is at, show bottom and top arrow
  showScrollArrow();
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

// Depending on the word user is at, show bottom and top arrow
function showScrollArrow() {
  // If user is at the first word, only show bottom arrow
  if (lessonWordIndex === 0) {
    bottomArrow.update();
  }
  // If user is anywhere between first and last word, show both top and bottom arrows
  else if (
    lessonWordIndex > 0 &&
    lessonWordIndex < vocabularyWord.lessonWords.length - 1
  ) {
    topArrow.update();
    bottomArrow.update();
  }
  // If user is at the last word, only show top arrow
  else if (lessonWordIndex === vocabularyWord.lessonWords.length - 1) {
    topArrow.update();
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
// User must say the correct English word before the cat reaches the hamburger.
// =============================================================
function game() {
  // Resume annyang
  annyang.resume();
  // // Abort annyang
  // annyang.abort();

  // Set background color
  background(0);

  // Update logo behaviour
  logo.update(mouse);

  // Update hamburger
  hamburger.update();

  // Update hearts
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].update();
  }

  // Update fwoggy
  for (let i = 0; i < cats.length; i++) {
    fwoggy.update(cats[i]);
  }

  // Check if answer is correct
  checkIfAnswerIsCorrect();

  // // React to user's answer based on whether it is correct or not
  // reactToAnswer();

  // Display current answer on screen and change its color depending on whether it was right or wrong
  displayGuess();

  // If no more cats left, swith to next level or set to victory state
  if (cats.length === 0) {
    // Reset currentAnswer
    currentAnswer = undefined;

    // Add 1 to level
    level++;

    // If user hasn't reached last level yet
    if (level < levelCat.levelCats.length - 1) {
      // Create new level cats
      createCats(level);
    }
    // Or else, user won! Set to victory state
    else {
      state = `victory`;
    }
  }

  // If cat overlaps with hamburger, remove cat from cats array
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].x === hamburger.x && cats[i].y === hamburger.y) {
      cats.splice(i, 1);
    }
  }

  // console.log(state);

  // If cat overlaps with hamburger, player loses a life
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].overlapsWith(hamburger)) {
      // Remove a life
      numLives--;
      // Remove cat
      cats.splice(i, 1);
      // Remove a heart
      hearts.splice(hearts.length - 1, 1);
    }
  }

  // If user has zero lives or less, user lost
  if (numLives <= 0) {
    state = `defeat`;
  }

  // Update cats
  for (let i = 0; i < cats.length; i++) {
    cats[i].update(hamburger, fwoggy);

    // If cat flees off canvas, remove it
    if (
      cats[i].feeling === `scared` &&
      (cats[i].x > width ||
        cats[i].x < 0 ||
        cats[i].y > height ||
        cats[i].y < 0)
    ) {
      // Remove cat
      cats.splice(i, 1);
    }
  }
}

// Create cats
function createCats(level) {
  // Get the number of cats at the current level from levelCats.json
  let numCats = levelCat.levelCats[level].positions.length;

  // Create many cats
  if (cats.length < numCats) {
    for (let i = 0; i < levelCat.levelCats[level].positions.length; i++) {
      // Get x and y position of cat from levelCats.json
      let catPosition = levelCat.levelCats[level].positions[i];

      // Set random word from vocabularyWords.json
      currentWord = random(vocabularyWord.lessonWords);

      // Get the English and Cantonese words at the current word
      cantoneseWord = currentWord.cantoneseWord;
      englishWord = currentWord.englishWord;

      // Create new cat that will hold a card containing the random Cantonese word
      let cat = new Cat(
        catPosition.x,
        catPosition.y,
        catImages,
        font,
        cantoneseWord,
        englishWord
      );

      // Add cat to cats array (it's a happy cat family!)
      cats.push(cat);
    }
  }
}

// Guess the English word
function guessEnglishWord(guess) {
  // Sets currentAnswer to the guess that user just said
  // And convert answer to all lowercase
  currentAnswer = guess.toLowerCase();
  // Set that it's time to check if answer is correct
  timeToCheckIfAnswerCorrect = true;
}

// Check if the answer is correct and react to it
function checkIfAnswerIsCorrect() {
  // If it's time to check if answer is correct
  if (timeToCheckIfAnswerCorrect) {
    for (let i = 0; i < cats.length; i++) {
      // If user's guess is correct
      if (cats[i].englishWord === currentAnswer) {
        // fwoggy.task = `moveToCat`;
        // fwoggy.moveTo(cats[i]);

        // // It's time for computer to say something nice
        // victoryTime = true;

        // If Fwoggy successfully whacks the cat, remove cat
        if (cats[i].overlapsWith(fwoggy)) {
          cats.splice(i, 1);
        }
      }
      // If incorrect
      else {
        // // Have computer say something mean and discouraging so that the user will know to do better next time
        // defeatTime = true;
      }
      timeToCheckIfAnswerCorrect = false;
    }
  }
}

// // React to user's answer based on whether it is correct or not
// function reactToAnswer() {
//   // If it's victory time (user got right answer)
//   if (victoryTime) {
//     // // Have computer say some nice words of encouragement
//     // computerSaysNiceMessage();
//     // Update numCorrectAnswers counter
//     timeToUpdateNumCorrectAnswers = true;
//   }
//   // Else if it's defeat time (user got wrong answer)
//   else if (defeatTime) {
//     // // Have computer say some mean words
//     // computerSaysMeanMessage();
//   }
// }

// Display current answer on screen and change its color depending on whether it was right or wrong
function displayGuess() {
  for (let i = 0; i < cats.length; i++) {
    let cat = cats[i];
    if (cat.x > 0 && cat.x < width && cat.y > 0 && cat.y < height) {
      // If answer is correct:
      if (cat.englishWord === currentAnswer) {
        // Set cat to feeling scared
        cat.feeling = `scared`;
        // cats.splice(i, 1);
      }
      // Else if answer is wrong:
      else {
      }
      console.log(cat.englishWord);
    }
  }

  // Display text showing user's guess
  push();
  fill(255);
  textAlign(CENTER);
  textSize(60);
  text(currentAnswer, width / 2, height - 100);
  pop();
}

// =============================================================
// STATE: defeat()
//
// Display image of Fwoggy in utter sadness over death of hamburger lives.
// =============================================================
function defeat() {
  background(50);

  // Update logo behaviour
  logo.update(mouse);

  // console.log(state);
}

// =============================================================
// STATE: victory()
//
// Display extremely happy Fwoggy.
// =============================================================
function victory() {
  background(255, 0, 0);

  // Update logo behaviour
  logo.update(mouse);
}
