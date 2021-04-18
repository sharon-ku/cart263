// Instance 3: Distraction canvas
//
function createDistractionCanvas() {
  let sketch2 = function (p) {
    // Background color: light purple
    let bgFill = {
      r: 240,
      g: 170,
      b: 255,
    };

    // For video capture
    let capture;
    // Properties for video capture display
    let captureProperties = {
      // position
      x: 0,
      y: 0,
    };

    // Create canvas and show video of user
    p.setup = function () {
      // Create canvas
      let distractionCanvas = p.createCanvas(320, 240);
      distractionCanvas.parent(`distraction-canvas`);

      // Show video of user
      p.createVideoCapture();
    };

    // Create video of user
    p.createVideoCapture = function () {
      // capture = p.createCapture(p.VIDEO);
      // capture.size(p.width, p.height);
      // capture.hide();
    };

    // Set background color and display video capture
    p.draw = function () {
      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // // Show video capture
      // p.image(
      //   capture,
      //   captureProperties.x,
      //   captureProperties.y,
      //   p.width,
      //   p.height
      // );
    };
  };

  let myp52 = new p5(sketch2);
}

// Create a distraction dialog
function createDistractionDialog() {
  $(`#distraction-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Button options
    buttons: {
      "I like what I see!": function () {
        $(`#distraction-description`).text(`keep looking then`);
      },
      "Please stop distracting me": function () {
        $(this).dialog(`close`);
      },
    },
  });
}
