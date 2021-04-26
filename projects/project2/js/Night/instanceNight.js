// Instance: Night canvas
//
function createNightCanvas() {
  let instanceNightSketch = function (p) {
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

    // Night room with all its behaviour
    let nightRoom = undefined;

    // Load assets
    p.preload = function () {
      // Load room images
      for (let i = 0; i < NUM_ROOM_IMAGES; i++) {
        let roomImage = p.loadImage(`assets/images/scenes/night-room${i}.png`);
        roomImages.push(roomImage);
      }

      // Load title font
      titleFont = p.loadFont(`assets/fonts/ShipporiMincho-Medium.ttf`);
    };

    // Create canvas and objects
    p.setup = function () {
      // Remove all strokes
      p.noStroke();

      // Create a night canvas
      let nightCanvas = p.createCanvas(1280, 720);
      nightCanvas.parent(`night-canvas`);

      // Create a new room
      nightRoom = new Room(p, roomImages);
    };

    // Set mouse positions, set background color, update behaviour of rectangle, pulsating circle, and drop
    p.draw = function () {
      // Set mouse x and y positions
      mouse.x = p.mouseX;
      mouse.y = p.mouseY;

      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // Update night room's behaviour
      nightRoom.update();
    };
  };

  let myp5Night = new p5(instanceNightSketch);
}
