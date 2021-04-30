// Instance 1: Morning background canvas
//
function createMorningBackgroundCanvas() {
  let instanceMorningBackgroundSketch = function (p) {
    // Number of background images
    const NUM_BACKGROUND_IMAGES = 2;

    // Store background images in here
    let backgroundImages = [];

    // Morning background with all its behaviour
    let morningBackground = undefined;

    // Load assets
    p.preload = function () {
      // Load background images
      for (let i = 0; i < NUM_BACKGROUND_IMAGES; i++) {
        let backgroundImage = p.loadImage(
          `assets/images/backgrounds/morning-background${i}.png`
        );
        backgroundImages.push(backgroundImage);
      }
    };

    // Create canvas and objects
    p.setup = function () {
      // Create a morning background canvas
      let morningBackgroundCanvas = p.createCanvas(1280, 720);
      morningBackgroundCanvas.parent(`morning-background-canvas`);

      // Create a new background
      morningBackground = new Background(p, backgroundImages);
    };

    // Update behaviour of background
    p.draw = function () {
      // Update morning background's behaviour
      morningBackground.update();
    };
  };

  let myp5MorningBackground = new p5(instanceMorningBackgroundSketch);
}
