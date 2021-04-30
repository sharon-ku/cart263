// Instance: Peep canvas (little birdie)
//
function createPeepCanvas() {
  let instancePeepSketch = function (p) {
    // Background color
    const BG_FILL = {
      r: 216,
      g: 237,
      b: 253,
    };

    // Store Peep images
    let peepImages = [];
    // Number of Peep images
    const NUM_PEEP_IMAGES = 6;

    // Peep (little birdie)
    let peep = undefined;

    // Preload assets
    p.preload = function () {
      // Load Peep images
      for (let i = 0; i < NUM_PEEP_IMAGES; i++) {
        let peepImage = p.loadImage(`assets/images/peeps/peep${i}.png`);
        peepImages.push(peepImage);
      }
    };

    // Create canvas and objects
    p.setup = function () {
      // Create canvas
      let peepCanvas = p.createCanvas(250, 300);
      peepCanvas.parent(`peep-canvas`);

      // Create a new Peep
      peep = new Peep(p, peepImages);
    };

    // Set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);

      // Update Peep's behaviour
      peep.update(gameScore);
    };
  };

  let myp5Peep = new p5(instancePeepSketch);
}
