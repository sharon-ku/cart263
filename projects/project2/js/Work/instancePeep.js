// Instance: Peep canvas (little birdie)
//
function createPeepCanvas() {
  let instancePeepSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Background color: yellow
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

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);

      // Update Peep's behaviour
      peep.update(gameScore);

      // // Set Peep's feelings
      // if (gameScore <= 30) {
      //   peep.feeling = `mad`;
      // } else if (gameScore > 30 && gameScore <= 75) {
      //   peep.feeling = `normal`;
      // } else if (gameScore > 75) {
      //   peep.feeling = `happy`;
      // }
    };
  };

  let myp5Peep = new p5(instancePeepSketch);
}

// Make peep canvas draggable
$(`#peep-canvas`).draggable({
  drag: function (event, ui) {
    $(this).css(`cursor`, `grab`);
  },
});
