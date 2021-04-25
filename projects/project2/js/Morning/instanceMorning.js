// Instance 1: Morning canvas
//
function createMorningCanvas() {
  let instanceMorningSketch = function (p) {
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

    // Number of room images
    const NUM_ROOM_IMAGES = 2;

    // Store room images in here
    let roomImages = [];

    // Morning room with all its behaviour
    let morningRoom = undefined;

    // Load assets
    p.preload = function () {
      // Load room images
      for (let i = 0; i < NUM_ROOM_IMAGES; i++) {
        let roomImage = p.loadImage(
          `assets/images/scenes/morning-room${i}.png`
        );
        roomImages.push(roomImage);
      }

      // Load title font
      titleFont = p.loadFont(`assets/fonts/ShipporiMincho-Medium.ttf`);
    };

    // Create canvas and objects
    p.setup = function () {
      // Remove all strokes
      p.noStroke();

      // Create a morning canvas
      let morningCanvas = p.createCanvas(1280, 720);
      morningCanvas.parent(`morning-canvas`);

      // Create a new room
      morningRoom = new MorningRoom(p, roomImages);
    };

    // Set mouse positions, set background color, update behaviour of rectangle, pulsating circle, and drop
    p.draw = function () {
      // Set mouse x and y positions
      mouse.x = p.mouseX;
      mouse.y = p.mouseY;

      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // Update morning room's behaviour
      morningRoom.update();
    };
  };

  let myp5Morning = new p5(instanceMorningSketch);
}
