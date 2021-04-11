// Instance: Sink canvas
//
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

    // Create canvas and objects
    p.setup = function () {
      // Create a start canvas
      let sinkCanvas = p.createCanvas(300, 500);
      sinkCanvas.parent(`sink-canvas`);

      // Create new faucet spout
      faucetSpout = new FaucetSpout(p);

      // Create new cup
      cup = new Cup(p);
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(0, 0, 0);

      // Update behaviour of all objects
      faucetSpout.update();
      cup.update();
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
  });
}
