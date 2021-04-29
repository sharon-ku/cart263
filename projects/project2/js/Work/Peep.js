// Peep: little birdie character in work place

class Peep {
  constructor(p, images) {
    // p5 instance
    this.p = p;

    // position
    this.x = p.width / 2;
    this.y = p.height / 2;

    // images
    this.images = images;
    // used to keep track of image in animation
    this.imageIndex = {
      current: 0,
      // animation is composed of 2 images
      first: undefined,
      second: undefined,
    };

    // frames for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 30;

    // how is Peep feeling right now?
    // possible feelings: normal, happy, mad
    this.feeling = `mad`;

    // size
    this.width = 250;
    this.height = 188;

    // user's game score
    this.maxScore = 100;
    this.minScore = 0;
    this.scoreDecreaseRate = 20;
    this.scoreIncreaseRate = 0.005;

    // tracker displaying peep's mood
    this.tracker = {
      totalWidth: 100,

      // positive end
      positive: {
        x: undefined,
        y: this.p.height - 30,
        width: this.currentScore,
        height: 20,
        // light green
        fill: {
          r: 215,
          g: 245,
          b: 191,
        },
      },

      // negative end
      negative: {
        x: undefined,
        y: this.p.height - 30,
        width: this.maxScore - this.currentScore,
        height: 20,
        // peachy red
        fill: {
          r: 229,
          g: 174,
          b: 149,
        },
      },
    };
  }

  // Update all behaviour
  update(gameScore) {
    // Display image
    this.display();

    // Set Peep's feeling using images
    this.setFeelingImages();

    // Switch images
    this.switchImages();

    // Update tracker
    this.updateTracker(gameScore);

    // Display tracker
    this.displayTracker();
  }

  // Set Peep's feeling using images
  setFeelingImages() {
    // Change images in animation + frames between images
    if (this.feeling === `normal`) {
      this.imageIndex.first = 0;
      this.imageIndex.second = 1;
      this.framesBtwEachImage = 30;
    } else if (this.feeling === `happy`) {
      this.imageIndex.first = 2;
      this.imageIndex.second = 3;
      this.framesBtwEachImage = 10;
    } else if (this.feeling === `mad`) {
      this.imageIndex.first = 4;
      this.imageIndex.second = 5;
      this.framesBtwEachImage = 10;
    }
  }

  // Set noise of Peep based on feeling
  setVoice() {
    if (this.feeling === `normal`) {
    } else if (this.feeling === `happy`) {
    } else if (this.feeling === `mad`) {
    }
  }

  // Display image
  display() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.image(this.images[this.imageIndex.current], this.x, this.y);
    this.p.pop();
  }

  // Switch images for animation
  switchImages() {
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.imageIndex.current === this.imageIndex.first) {
        this.imageIndex.current = this.imageIndex.second;
      } else {
        this.imageIndex.current = this.imageIndex.first;
      }
      this.framesElapsed = 0;
    }
  }

  // Display all tracker pieces
  displayTracker() {
    this.displayTrackerPiece(this.tracker.positive);
    this.displayTrackerPiece(this.tracker.negative);
  }

  // Display tracker piece as rectangle
  displayTrackerPiece(trackerPiece) {
    this.p.push();
    this.p.noStroke();
    this.p.fill(trackerPiece.fill.r, trackerPiece.fill.g, trackerPiece.fill.b);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(
      trackerPiece.x,
      trackerPiece.y,
      trackerPiece.width,
      trackerPiece.height
    );
    this.p.pop();
  }

  // // Add points
  // addPoints() {
  //   this.currentScore += this.scoreIncreaseRate;
  // }
  //
  // // Remove points
  // removePoints() {
  //   this.currentScore -= this.scoreDecreaseRate;
  // }

  // Update tracker with current score
  updateTracker(gameScore) {
    // Update positive tracker
    this.tracker.positive.x =
      this.p.width / 2 -
      this.tracker.totalWidth / 2 +
      this.tracker.positive.width / 2;

    // Update negative tracker
    this.tracker.negative.x =
      this.p.width / 2 +
      this.tracker.totalWidth / 2 -
      this.tracker.negative.width / 2;

    // Update tracker widths
    this.tracker.positive.width = gameScore;
    this.tracker.negative.width = this.maxScore - gameScore;
  }
}
