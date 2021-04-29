// Instance: Night background canvas
//
function createNightBackgroundCanvas() {
  let instanceNightBackgroundSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Title font
    let titleFont = undefined;

    // Background color: white
    let bgFill = {
      r: 255,
      g: 255,
      b: 255,
    };

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
      // Remove all strokes
      p.noStroke();

      // Create a night canvas
      let nightCanvas = p.createCanvas(1280, 720);
      nightCanvas.parent(`night-background-canvas`);

      // Create a new background
      nightBackground = new Background(p, backgroundImages);
    };

    // Set mouse positions, set background color, update behaviour of rectangle, pulsating circle, and drop
    p.draw = function () {
      // Set mouse x and y positions
      mouse.x = p.mouseX;
      mouse.y = p.mouseY;

      // Update night background's behaviour
      nightBackground.update();
    };
  };

  let myp5NightBackground = new p5(instanceNightBackgroundSketch);
}
