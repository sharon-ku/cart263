// Instance: Peep canvas (little birdie)
//
function createPeepCanvas() {
  let instancePeepSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Background color: blue
    let bgFill = {
      r: 251,
      g: 235,
      b: 241,
    };

    // Store Peep images
    let peepImages = [];
    // Number of Peep images
    const NUM_PEEP_IMAGES = 2;

    // Peep (little birdie)
    let peep = undefined;

    // Preload assets
    p.preload = function () {
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
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // Update Peep's behaviour
      peep.update(gameScore);
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
