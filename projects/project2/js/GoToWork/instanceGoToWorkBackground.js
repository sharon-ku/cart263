// Instance: GoToWork background canvas
//
function createGoToWorkBackgroundCanvas() {
  let instanceGoToWorkBackgroundSketch = function (p) {
    // Background color: white
    const BG_FILL = {
      r: 255,
      g: 255,
      b: 255,
    };

    // Number of background images
    const NUM_BACKGROUND_IMAGES = 2;

    // Store background images in here
    let backgroundImages = [];

    // Go to work background with all its behaviour
    let goToWorkBackground = undefined;

    // Load assets
    p.preload = function () {
      // Load background images
      for (let i = 0; i < NUM_BACKGROUND_IMAGES; i++) {
        let backgroundImage = p.loadImage(
          `assets/images/backgrounds/go-to-work-background${i}.jpg`
        );
        backgroundImages.push(backgroundImage);
      }
    };

    // Create canvas and objects
    p.setup = function () {
      // Create a goToWork canvas
      let goToWorkCanvas = p.createCanvas(1280, 720);
      goToWorkCanvas.parent(`go-to-work-background-canvas`);

      // Create a new background
      goToWorkBackground = new Background(p, backgroundImages);
    };

    // Update behaviour of background
    p.draw = function () {
      // // Set background color
      // p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);

      // Update goToWork background's behaviour
      goToWorkBackground.update();
    };
  };

  let myp5GoToWorkBackground = new p5(instanceGoToWorkBackgroundSketch);
}
