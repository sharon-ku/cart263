// Instance 1: Morning background canvas
//
function createMorningBackgroundCanvas() {
  let instanceMorningBackgroundSketch = function (p) {
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

      // Load title font
      titleFont = p.loadFont(`assets/fonts/ShipporiMincho-Medium.ttf`);
    };

    // Create canvas and objects
    p.setup = function () {
      // Remove all strokes
      p.noStroke();

      // Create a morning background canvas
      let morningBackgroundCanvas = p.createCanvas(1280, 720);
      morningBackgroundCanvas.parent(`morning-background-canvas`);

      // Create a new background
      morningBackground = new Background(p, backgroundImages);
    };

    // Set mouse positions, set background color, update behaviour of rectangle, pulsating circle, and drop
    p.draw = function () {
      // Set mouse x and y positions
      mouse.x = p.mouseX;
      mouse.y = p.mouseY;

      // // Set background color
      // p.background(bgFill.r, bgFill.g, bgFill.b);

      // Update morning background's behaviour
      morningBackground.update();
    };
  };

  let myp5MorningBackground = new p5(instanceMorningBackgroundSketch);
}
