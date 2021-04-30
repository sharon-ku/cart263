// Instance: ReturnHome background canvas
//
function createReturnHomeBackgroundCanvas() {
  let instanceReturnHomeBackgroundSketch = function (p) {
    // Background color: black
    const BG_FILL = {
      r: 0,
      g: 0,
      b: 0,
    };

    // Number of background images
    const NUM_BACKGROUND_IMAGES = 2;

    // Store background images in here
    let backgroundImages = [];

    // returnHome background with all its behaviour
    let returnHomeBackground = undefined;

    // Load assets
    p.preload = function () {
      // Load background images
      for (let i = 0; i < NUM_BACKGROUND_IMAGES; i++) {
        let backgroundImage = p.loadImage(
          `assets/images/backgrounds/return-home-background${i}.jpg`
        );
        backgroundImages.push(backgroundImage);
      }
    };

    // Create canvas and objects
    p.setup = function () {
      // Create a returnHome canvas
      let returnHomeCanvas = p.createCanvas(1280, 720);
      returnHomeCanvas.parent(`return-home-background-canvas`);

      // Create a new background
      returnHomeBackground = new Background(p, backgroundImages);
    };

    // Update behaviour of background
    p.draw = function () {
      // Set background color
      p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);

      // Update returnHome background's behaviour
      returnHomeBackground.update();
    };
  };

  let myp5ReturnHomeBackground = new p5(instanceReturnHomeBackgroundSketch);
}
