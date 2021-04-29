// Instance: LadiFeedback canvas
//
function createLadiFeedbackCanvas() {
  let instanceLadiFeedbackSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Background fill
    let BG_FILL = {
      r: 0,
      g: 0,
      b: 0,
    };

    // Ladi
    let ladi;

    // Store Ladi images
    let ladiImages = [];
    const NUM_LADI_IMAGES = 10;

    // Speech that will be said based on gameScore
    let ladiSpeech = undefined;

    // Ladi's speeches
    let neutralSpeech = new Audio(`assets/sounds/ladi-neutral.mp3`);
    let madSpeech = new Audio(`assets/sounds/ladi-mad.mp3`);
    let happySpeech = new Audio(`assets/sounds/ladi-happy.mp3`);

    // Preload assets
    p.preload = function () {
      for (let i = 0; i < NUM_LADI_IMAGES; i++) {
        let ladiImage = p.loadImage(`assets/images/ladis/ladi${i}.jpg`);
        ladiImages.push(ladiImage);
      }
    };

    // Create canvas and objects
    p.setup = function () {
      // Create canvas
      let ladiFeedbackCanvas = p.createCanvas(1150, 500);
      ladiFeedbackCanvas.parent(`ladi-feedback-canvas`);

      // Set Ladi's speech depending on gameScore
      if (gameScore <= 30) {
        ladiSpeech = madSpeech;
      } else if (gameScore > 30 && gameScore <= 70) {
        ladiSpeech = neutralSpeech;
      } else if (gameScore > 70) {
        ladiSpeech = happySpeech;
      }

      // Play Ladi's speech
      ladiSpeech.play();

      // Create new Ladi
      ladi = new Ladi(p, ladiImages, 0, 1, ladiSpeech);
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);

      // Update Ladi's behaviour
      ladi.update();
    };
  };

  let myp5LadiFeedback = new p5(instanceLadiFeedbackSketch);
}
