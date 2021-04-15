// Instance: Sink canvas
//

// Current state of sink
// All possible states: `on`, `off`
let sinkState = `off`;

function createSinkCanvas() {
  let instanceSinkSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Faucet spout
    let faucetSpout = undefined;

    // Cup
    let cup = undefined;

    // Falling water
    let fallingWater = undefined;
    // Water that fills cup
    let cupWater = undefined;

    // Create canvas and objects
    p.setup = function () {
      // Create a start canvas
      let sinkCanvas = p.createCanvas(300, 400);
      sinkCanvas.parent(`sink-canvas`);

      // Create new faucet spout
      faucetSpout = new FaucetSpout(p);

      // Create new cup
      cup = new Cup(p);

      // Create mew falling water
      fallingWater = new FallingWater(p, faucetSpout, cup);

      // Create new cup water
      cupWater = new CupWater(p, cup);
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(0, 0, 0);

      // Display faucet spout and cup
      faucetSpout.update();
      cup.update();

      // If sink is off:
      if (sinkState === `on`) {
        // Update falling water
        fallingWater.update();

        // Fill cup based on water level
        if (fallingWater.heightCurrent === fallingWater.heightMax) {
          cupWater.fillCup();
        }
      } else if (sinkState === `on`) {
      }

      cupWater.update();
    };
  };

  let myp5Sink = new p5(instanceSinkSketch);
}

// Create sink dialog
function createSinkDialog() {
  $(`#sink-dialog`).dialog({
    // Hide close button
    dialogClass: "no-close",
    show: { effect: "fade", duration: 500 },
    // Set position of dialog based on window position
    position: { my: "center center", at: "center center", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Set dialog buttons
    buttons: [
      {
        id: "pour-button",
        text: "Pour!",
        // When button is clicked:
        click: function () {
          // If sink is off:
          if (sinkState === `off`) {
            // Turn it on
            sinkState = `on`;
            // Update button text to "Stop!"
            $("#pour-button").button("option", "label", "Stop!");
          }
          // Else, if sink is on:
          else if (sinkState === `on`) {
            // Turn it off
            sinkState = `off`;
            // Update button text to "Pour!"
            $("#pour-button").button("option", "label", "Pour!");
          }
        },
      },
    ],
  });
}
