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

    // Store affirmations in here
    let affirmations = [];
    // number of affirmations
    const NUM_AFFIRMATIONS = 3;

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
      // Create canvas
      let affirmationsCanvas = p.createCanvas(300, 450);
      affirmationsCanvas.parent(`affirmations-canvas`);

      // Choose 3 random affirmations from list
      for (let i = 0; i < NUM_AFFIRMATIONS; i++) {
        let affirmationString = p.random(affirmationsList.affirmations);
        affirmations.push(affirmationString);
      }
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
