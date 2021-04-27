// Instance: Work background canvas
//
function createWorkBackgroundCanvas() {
  let instanceWorkBackgroundSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

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

    // Background object with all its behaviour
    let workBackground = undefined;

    // Load assets
    p.preload = function () {
      // Load background images
      for (let i = 0; i < NUM_BACKGROUND_IMAGES; i++) {
        let backgroundImage = p.loadImage(
          `assets/images/backgrounds/work-background${i}.jpg`
        );
        backgroundImages.push(backgroundImage);
      }
    };

    // Create canvas and objects
    p.setup = function () {
      // Remove all strokes
      p.noStroke();

      // Create a night canvas
      let workBackgroundCanvas = p.createCanvas(1280, 720);
      workBackgroundCanvas.parent(`work-background-canvas`);

      // Create a new background
      workBackground = new Background(p, backgroundImages);
    };

    // Set mouse positions, set background color, update behaviour of rectangle, pulsating circle, and drop
    p.draw = function () {
      // Set mouse x and y positions
      mouse.x = p.mouseX;
      mouse.y = p.mouseY;

      // Set background color
      p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);

      // Update work background's behaviour
      workBackground.update();
    };
  };

  let myp5WorkBackground = new p5(instanceWorkBackgroundSketch);
}
