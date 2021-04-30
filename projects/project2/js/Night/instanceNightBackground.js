// Instance: Night background canvas
//
function createNightBackgroundCanvas() {
  let instanceNightBackgroundSketch = function (p) {
    // Number of background images
    const NUM_BACKGROUND_IMAGES = 2;

    // Store background images in here
    let backgroundImages = [];

    // Night background with all its behaviour
    let nightBackground = undefined;

    // Load assets
    p.preload = function () {
      // Load background images
      for (let i = 0; i < NUM_BACKGROUND_IMAGES; i++) {
        let backgroundImage = p.loadImage(
          `assets/images/backgrounds/night-background${i}.png`
        );
        backgroundImages.push(backgroundImage);
      }
    };

    // Create canvas and objects
    p.setup = function () {
      // Create a night canvas
      let nightCanvas = p.createCanvas(1280, 720);
      nightCanvas.parent(`night-background-canvas`);

      // Create a new background
      nightBackground = new Background(p, backgroundImages);
    };

    // Update background
    p.draw = function () {
      // Update night background's behaviour
      nightBackground.update();
    };
  };

  let myp5NightBackground = new p5(instanceNightBackgroundSketch);
}
