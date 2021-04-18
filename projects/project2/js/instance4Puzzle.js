// Left and right puzzle canvases + draggable pieces + puzzle box

// Create left-puzzle canvas
function createLeftPuzzleCanvas() {
  let sketch3 = function (p) {
    // Background color: light blue
    let bgFill = {
      r: 121,
      g: 216,
      b: 237,
    };

    // Eye
    let eye = {
      fill: 0,
      x: 35,
      y: 40,
      size: 20,
    };

    // Mouth
    let mouth = {
      fill: 0,
      x: 0,
      y: 75,
      width: 50,
      height: 50,
      startAngle: 0,
      endAngle: p.PI,
    };

    // Create canvas
    p.setup = function () {
      // Create canvas
      let leftPuzzleCanvas = p.createCanvas(70, 120);
      leftPuzzleCanvas.parent(`left-puzzle-canvas`);
    };

    // Set background color and display video capture
    p.draw = function () {
      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // Draw face
      p.drawFace();
    };

    // Draw face
    p.drawFace = function () {
      // Draw mouth
      p.push();
      p.fill(mouth.fill);
      p.arc(
        mouth.x,
        mouth.y,
        mouth.width,
        mouth.height,
        mouth.startAngle,
        mouth.endAngle
      );
      p.pop();

      // Draw eye
      p.push();
      p.fill(eye.fill);
      p.ellipse(eye.x, eye.y, eye.size);
      p.pop();
    };
  };

  let myp53 = new p5(sketch3);
}

// -----------------------------------------------------
// Create right-puzzle canvas
function createRightPuzzleCanvas() {
  let sketch4 = function (p) {
    // Background color: light blue
    let bgFill = {
      r: 121,
      g: 216,
      b: 237,
    };

    // Eye
    let eye = {
      fill: 0,
      x: 35,
      y: 40,
      size: 20,
    };

    // Mouth
    let mouth = {
      fill: 0,
      x: 70,
      y: 75,
      width: 50,
      height: 50,
      startAngle: p.PI / 2,
      endAngle: p.PI,
    };

    // Create canvas
    p.setup = function () {
      // Create canvas
      let rightPuzzleCanvas = p.createCanvas(70, 120);
      rightPuzzleCanvas.parent(`right-puzzle-canvas`);
    };

    // Set background color and display video capture
    p.draw = function () {
      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // Draw face
      p.drawFace();
    };

    // Draw face
    p.drawFace = function () {
      // Draw mouth
      p.push();
      p.fill(mouth.fill);
      p.arc(
        mouth.x,
        mouth.y,
        mouth.width,
        mouth.height,
        mouth.startAngle,
        mouth.endAngle
      );
      p.pop();

      // Draw eye
      p.push();
      p.fill(eye.fill);
      p.ellipse(eye.x, eye.y, eye.size);
      p.pop();
    };
  };

  let myp54 = new p5(sketch4);
}

// PUZZLE PIECES ---------------------------------------
// Make left puzzle draggable
$(`#left-puzzle-canvas`).draggable({
  drag: function (event, ui) {
    $(this).css(`cursor`, `grab`);
  },
});

// Make right puzzle draggable
$(`#right-puzzle-canvas`).draggable({
  drag: function (event, ui) {
    $(this).css(`cursor`, `grab`);
  },
});

// Make puzzle box droppable
function createPuzzleBox() {
  $(`#puzzle-box`).droppable({
    // When drop puzzle on box:
    drop: function (event, ui) {
      // Make puzzle snap to box
      $(ui.draggable).css("top", $(this).position().top);
      $(ui.draggable).css("left", $(this).position().left);
      $(ui.draggable).css("left", $(this).position().left);

      // Disable draggable functionality
      $(ui.draggable).draggable("disable");

      // Add 1 to numPuzzlesDropped
      numPuzzlesDropped++;
      console.log(numPuzzlesDropped);

      // If total number of puzzles dropped, open congratulations-dialog box
      if (numPuzzlesDropped === NUM_TOTAL_PUZZLES) {
        $("#congratulations-dialog").dialog("open");
      }
    },
  });
}
