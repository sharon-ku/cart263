/**************************************************
Activity 2: Slamina
Sharon Ku

The program will speak the name of a common animal backwards.
The user will have to say (with their voice) what they think it is in the form “I think it is x.”
If they get it right, their guess will be displayed in green.
If they get it wrong, their guess will be displayed in red.

Animal names from Darius Kazemi:
https://github.com/dariusk/corpora/blob/master/data/animals/common.json
**************************************************/

"use strict";

// current animal
let currentAnimal;

// contains list of animal names
const animals = [
  "aardvark",
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
  "gila monster",
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
  "ocelot",
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
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
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
  "yak",
  "zebra"
];


// setup()
//
// Description of setup() goes here.
function setup() {
  // Check if annyang is available
  if (annyang) {
    // Create commands
    let command = {
      // If the user responds, check if answer is correct
      'I think it is ': checkResponse
    }
    // Add the commands and start annyang
    annyang.addCommands(command);
    annyang.start();
  }

  // Choose a random animal from animals array
  currentAnimal = random(animals);

  // Reverse animal's name
  reverseString(currentAnimal);
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

// Checks whether user's answer was correct or incorrect
// Returns false if incorrect
function checkResponse() {

}

// draw()
//
// Description of draw() goes here.
function draw() {

  // // Choose a random animal from animals array
  // currentAnimal = random(animals);
  // print(currentAnimal);
  //
  // // Split letters in array
  // splitTokens(currentAnimal);
  // print(currentAnimal);

}
