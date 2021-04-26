// Instance: Affirmations canvas
//
function createAffirmationsCanvas() {
  let instanceAffirmationsSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Background fill
    let bgFill = {
      r: 0,
      g: 0,
      b: 0,
    };

    // Store current answer here
    let currentAnswer = undefined;

    // Store affirmations in here
    let affirmations = [];
    // Number of affirmations
    const NUM_AFFIRMATIONS = 3;

    // Modified affirmation without punctuation or caps
    let affirmationsWithoutPunctuationAndCaps = [];
    let currentAffirmationIndex = 0;

    let affirmationsProperties = {
      fill: 255,
      textSize: 25,
      x: 20,
      y: undefined,
      textBoxWidth: 250,
      textBoxHeight: 400,
      lineSpacing: 100,
      yPositionOfFirstLine: 100,
    };

    // Store affirmations.json data
    let affirmationsList = undefined;

    // Preload assets
    p.preload = function () {
      // Load affirmations JSON file
      affirmationsList = p.loadJSON(`assets/data/affirmations.json`);
    };

    // Create canvas and objects
    p.setup = function () {
      // // Prep audio: need p5.sound for this!
      // p.userStartAudio();

      // Set up anyang
      p.setUpAnnyang();

      // Create canvas
      let affirmationsCanvas = p.createCanvas(300, 450);
      affirmationsCanvas.parent(`affirmations-canvas`);

      // Choose 3 random affirmations from list
      for (let i = 0; i < NUM_AFFIRMATIONS; i++) {
        let affirmationString = p.random(affirmationsList.affirmations);
        affirmations.push(affirmationString);
      }

      // Remove caps and punctuation from affirmations
      for (let i = 0; i < affirmations.length; i++) {
        const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
        let stringWithNoPunctuation = affirmations[i].replace(regex, "");

        let stringWithNoCaps = stringWithNoPunctuation.toLowerCase();

        affirmationsWithoutPunctuationAndCaps.push(stringWithNoCaps);
      }
    };

    // Set up annyang
    p.setUpAnnyang = function () {
      // Check if annyang is available
      if (annyang) {
        // Create commands
        let commands = {
          // If the user responds, process guess
          "*guess": p.processGuess,
        };

        // Add the commands
        annyang.addCommands(commands);

        // Start listening with annyang
        annyang.start();
      }
    };

    // Store guess that user just said, check if it's correct
    p.processGuess = function (guess) {
      // Store guess in currentAnswer and convert to all lowercase
      currentAnswer = guess.toLowerCase();
      // console.log(guess);
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // Display affirmations
      for (let i = 0; i < affirmations.length; i++) {
        // Set y position
        affirmationsProperties.y =
          affirmationsProperties.yPositionOfFirstLine +
          affirmationsProperties.lineSpacing * i;

        // Display string
        p.displayAffirmation(affirmationsProperties, affirmations[i]);
      }

      // If user's guess is correct, make cat feel scared
      p.checkIfGuessIsCorrect();

      // // Display current answer on screen
      // p.push();
      // // p.textFont(font);
      // p.fill(255, 255, 0);
      // p.textAlign(p.CENTER);
      // p.textSize(32);
      // p.text(currentAnswer, 50, 50);
      // p.pop();
    };

    // If user's guess is correct, make cat feel scared
    p.checkIfGuessIsCorrect = function () {
      // And if answer is correct, move on to next affirmation
      if (
        affirmationsWithoutPunctuationAndCaps[currentAffirmationIndex] ===
        currentAnswer
      ) {
        console.log(`YAY!`);
        // Update current affirmation index
        currentAffirmationIndex += 1;

        // If user said all 3 affirmations, time to say goodnight <3
        if (currentAffirmationIndex === affirmations.length) {
          console.log(`finished!`);
          // Close affirmations dialog
          $(`#affirmations-dialog`).dialog("close");
          // Open "Say goodnight" dialog
          $(`#say-goodnight-dialog`).dialog("open");
        }
      }
    };

    // Display affirmation string
    p.displayAffirmation = function (
      { fill, textSize, x, y, textBoxWidth, textBoxHeight },
      affirmationString
    ) {
      p.push();
      p.fill(fill);
      p.textSize(textSize);
      p.text(affirmationString, x, y, textBoxWidth, textBoxHeight);
      p.pop();
    };
  };

  let myp5Affirmations = new p5(instanceAffirmationsSketch);
}
