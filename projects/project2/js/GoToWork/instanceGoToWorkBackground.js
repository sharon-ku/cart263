// Instance: GoToWork background canvas
//
function createGoToWorkBackgroundCanvas() {
  let instanceGoToWorkBackgroundSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

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
      // Remove all strokes
      p.noStroke();

      // Create a goToWork canvas
      let goToWorkCanvas = p.createCanvas(1280, 720);
      goToWorkCanvas.parent(`go-to-work-background-canvas`);

      // Create a new background
      goToWorkBackground = new Background(p, backgroundImages);
    };

    // Set mouse positions, set background color, update behaviour of rectangle, pulsating circle, and drop
    p.draw = function () {
      // Set mouse x and y positions
      mouse.x = p.mouseX;
      mouse.y = p.mouseY;

      // // Set background color
      // p.background(bgFill.r, bgFill.g, bgFill.b);

      // Update goToWork background's behaviour
      goToWorkBackground.update();
    };
  };

  let myp5GoToWorkBackground = new p5(instanceGoToWorkBackgroundSketch);
}
