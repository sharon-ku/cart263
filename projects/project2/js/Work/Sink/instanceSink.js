// Instance: Sink canvas
//
// In this task, Kay needs to pour water into a cup.
// Some customers are thirsty and some are not. Kay must respect the water limit line.
// Click on "Pour" and "Stop" to control sink output.

function createSinkCanvas() {
  let instanceSinkSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Background color: light green
    const BG_FILL = {
      r: 220,
      g: 244,
      b: 196,
    };

    // Number of cups to fill
    const TOTAL_NUM_CUPS = 20;
    // Count number of cups filled
    let numCupsFilled = 0;

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
      p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);

      // If sink is on:
      if (sinkState === `on`) {
        // Update falling water
        fallingWater.update();

        // Fill cup based on water level
        if (fallingWater.heightCurrent === fallingWater.heightMax) {
          cupWater.fillCup();
        }
      }
      // Else if sink is off and time to give feedback
      else if (sinkState === `off` && givingFeedbackForPouring === true) {
        // Reset water line if water reaches limit line
        if (cup.limitLineIsReached(cupWater)) {
          // Play victory sound effect
          yaySFX.play();

          // Peep is happy
          peepFeeling = `happy`;

          // Add points
          gameScore += scoreIncreaseRate;
        }

        // If water does not match limit line, dock points
        else {
          // Play Peep yelling
          peepYell.play();

          // Peep is mad you messed up
          peepFeeling = `mad`;

          // Dock points
          gameScore -= scoreDecreaseRate;
        }

        // Update number of cups filled
        numCupsFilled++;

        // If done filling total number of cups:
        if (numCupsFilled === TOTAL_NUM_CUPS) {
          // Hide sink canvas and "Pour" button
          $(`#sink-canvas`).hide();
          $("#pour-button").hide();

          // Change text in dialog to "Task Complete"
          $(`#sink-dialog`).text(`Task Complete`);
          // Mark task as completed
          taskCompleted = true;
          // Remove a task
          removeATask();
        }

        // Reset cup values
        p.resetCupValues();

        // Done giving feedback
        givingFeedbackForPouring = false;
      }

      // Display faucet spout
      faucetSpout.update();

      // Update cup water's behaviour
      cupWater.update();

      // Display cup and water limit line
      cup.update();
    };

    // Reset cup values
    p.resetCupValues = function () {
      // Reset water limit line
      cup.resetWaterLimit();
      // Reset cup water level
      cupWater.resetHeight();
    };
  };

  let myp5Sink = new p5(instanceSinkSketch);
}
