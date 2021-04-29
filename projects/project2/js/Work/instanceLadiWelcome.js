// Instance: LadiWelcome canvas
//
function createLadiWelcomeCanvas() {
  let instanceLadiWelcomeSketch = function (p) {
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
    const NUM_LADI_IMAGES = 2;

    // Ladi's welcoming speech
    let welcomeSpeech = new Audio(`assets/sounds/ladi-welcome.mp3`);
    welcomeSpeech.volume = 1;
    welcomeSpeech.play();

    // When Ladi is done talking, close its dialog box
    welcomeSpeech.addEventListener("ended", function () {
      $(`#ladi-welcome-dialog`).dialog("close");
    });

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
      let ladiWelcomeCanvas = p.createCanvas(1150, 500);
      ladiWelcomeCanvas.parent(`ladi-welcome-canvas`);

      // Create new Ladi
      ladi = new Ladi(p, ladiImages, 0, 1, welcomeSpeech);
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);

      // Update Ladi's behaviour
      ladi.update();
    };
  };

  let myp5LadiWelcome = new p5(instanceLadiWelcomeSketch);
}
