// Peep: little birdie character in work place

class Peep {
  constructor(p, images) {
    // p5 instance
    this.p = p;

    // position
    this.x = p.width / 2;
    this.y = p.height / 2 - 30;

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

    // size of images
    this.width = 250;
    this.height = 188;

    // tracker displaying peep's mood
    this.tracker = {
      // total width of tracker rectangle
      totalWidth: 200,

      // positive end
      positive: {
        x: undefined,
        y: this.p.height - 70,
        width: gameScore,
        height: 20,
        // green
        fill: {
          r: 117,
          g: 208,
          b: 126,
        },
      },

      // negative end
      negative: {
        x: undefined,
        y: this.p.height - 70,
        width: maxScore - gameScore,
        height: 20,
        // peachy red
        fill: {
          r: 239,
          g: 86,
          b: 122,
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
    if (peepFeeling === `neutral`) {
      this.imageIndex.first = 0;
      this.imageIndex.second = 1;
      this.framesBtwEachImage = 30;
    } else if (peepFeeling === `happy`) {
      this.imageIndex.first = 2;
      this.imageIndex.second = 3;
      this.framesBtwEachImage = 10;
    } else if (peepFeeling === `mad`) {
      this.imageIndex.first = 4;
      this.imageIndex.second = 5;
      this.framesBtwEachImage = 10;
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
    this.tracker.negative.width = maxScore - gameScore;

    // Constrain gameScore
    gameScore = this.p.constrain(gameScore, minScore, maxScore);

    // Constrain tracker to not exceed min or max score
    this.tracker.positive.width = this.p.constrain(
      this.tracker.positive.width,
      minScore,
      maxScore
    );
    this.tracker.negative.width = this.p.constrain(
      this.tracker.negative.width,
      minScore,
      maxScore
    );
  }
}
