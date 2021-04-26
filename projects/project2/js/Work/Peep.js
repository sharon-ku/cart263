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
    this.imageIndex = 0;
    // size
    // this.width = 50;
    // this.height = 70;

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

  // Update all cup behaviour
  update(gameScore) {
    // Display image
    this.display();

    // Update tracker
    this.updateTracker(gameScore);

    // Display tracker
    this.displayTracker();
  }

  // Display image
  display() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.image(this.images[this.imageIndex], this.x, this.y);
    this.p.pop();
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