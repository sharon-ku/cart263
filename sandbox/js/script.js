/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
let vocabWord;

let chosenWord;

let englishWord;

let cantoneseWord;

function preload() {
  vocabWord = loadJSON("assets/data/vocabulary_words.json");
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  // let chosenWord = vocabWord.vocabulary_words[0].englishWord;

  push();
  textSize(32);
  textAlign(CENTER);
  fill(255);
  text(cantoneseWord, width/2, height/2);
  pop();
}


function mousePressed() {
  chosenWord = random(vocabWord.vocabulary_words);

  englishWord = chosenWord.englishWord;

  cantoneseWord = chosenWord.cantoneseWord;

  responsiveVoice.speak(cantoneseWord, "Chinese (Hong Kong) Female");
}
