/**************************************************
Exercise 2: Slamina New Game+
Sharon Ku

The program will speak the name of a common animal backwards.
The user will have to say (with their voice) what they think the animal is
If they get it right, their guess will be displayed in green.
If they get it wrong, their guess will be displayed in red.

Animal names from Darius Kazemi:
https://github.com/dariusk/corpora/blob/master/data/animals/common.json
**************************************************/

// because being strict is good
"use strict";

// current animal
let currentAnimal = ``;

// reversed name of animal
let reversedAnimal;

// stores answer that user has said
let currentAnswer = ``;

// contains list of animal names
const animals = [
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "zebra"
];

// Background color
let bgColor = 0;

// Green color for correct answer
let colorForCorrectAnswer = {
  r: 82,
  g: 199,
  b: 113,
};

// Red color for incorrect answer
let colorForWrongAnswer = {
  r: 252,
  g: 86,
  b: 91,
};

// setup()
//
// Create canvas, input commands for annyang, set text properties
function setup() {
  // Create a canvas
  createCanvas(800, 800);

  // Check if annyang is available
  if (annyang) {
    // Create commands
    let commands = {
      // If the user responds, set the current answer to the animal guessed
      '*animal': guessAnimal,
    }
    // Add the commands and start annyang
    annyang.addCommands(commands);
    annyang.start();

    // Set text properties
    textAlign(CENTER);
    textSize(width / 8);
  }
}

// draw()
//
// Set background color, display guess (sets text color depending on whether guess is right or wrong)
function draw() {
  // Set background color
  background(bgColor);

  // If user's guess is correct
  if (currentAnimal === currentAnswer) {
    // Set guess color to green
    fill(colorForCorrectAnswer.r, colorForCorrectAnswer.g, colorForCorrectAnswer.b);
  }
  // If incorrect
  else {
    // Set guess color to red
    fill(colorForWrongAnswer.r, colorForWrongAnswer.g, colorForWrongAnswer.b);
  }

  // Display text
  text(currentAnswer, width/2, height/2);
}

// When mouse pressed, generate a random reversed animal name and have computer say it
function mousePressed() {
  // Generates a random animal name reversed after 5 seconds
  generateAnimalName();
  // Computer says animal name backwards after 5 seconds
  sayReversedAnimalName();
}

// Generate a random animal name reversed
function generateAnimalName() {
  // Choose a random animal from animals array
  currentAnimal = random(animals);

  // Reverse animal's name
  reversedAnimal = reverseString(currentAnimal);
}

// Computer says animal name backwards after 5 seconds
function sayReversedAnimalName() {
  responsiveVoice.speak(reversedAnimal, `UK English Female`, {
    rate: 0.5, // slow down voice
  });
}

// Reverses the provided string
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

// Sets currentAnswer to the guess that user just said
function guessAnimal(animal) {
  // also converts answer to all lowercase
  currentAnswer = animal.toLowerCase();
}
