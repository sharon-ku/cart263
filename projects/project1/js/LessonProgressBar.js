// Progress bar displayed in `learn` state
// Helps user track number of words to learn
// Circular tracker moves along static rectangular bar
class LessonProgressBar {
  constructor() {
    // Rectangular bar
    this.rectangularBar = {
      // position
      x: width - 50,
      y: height / 2,
      // size
      width: 18,
      height: 600,
      // fill color
      fill: {
        r: 155,
        g: 236,
        b: 255,
        alpha: 255,
      },
      // stroke color
      strokeFill: {
        r: 255,
        g: 255,
        b: 255,
      },
      // stroke weight
      strokeWeight: 0,
      // corner radius
      cornerRadius: 100,
    };
    // Circular tracker
    this.circularTracker = {
      // position
      x: this.rectangularBar.x,
      y: 0,
      // size
      size: 30,
      // stroke fill and weight
      strokeFill: 255,
      strokeWeight: 3,
      // fill color
      fill: {
        current: {
          r: undefined,
          g: undefined,
          b: undefined,
        },
        min: {
          r: 20, //20
          g: 255, //255
          b: 196, //196
        },
        max: {
          r: 255, //252
          g: 160, //132
          b: 87, //3
        },
      },
    };
  }

  // Update behaviour of lesson progress bar
  update(lessonWordIndex, numLessonWords) {
    // Display rectangular bar
    this.displayRectangularBar();

    // Display circular tracker
    this.displayCircularTracker();

    // Move circular tracker
    this.moveCircularTracker(lessonWordIndex, numLessonWords);

    // Update circular tracker color
    this.updateCircularTrackerColor(lessonWordIndex, numLessonWords);
  }

  // Display rectangular bar
  displayRectangularBar() {
    push();
    rectMode(CENTER);
    fill(
      this.rectangularBar.fill.r,
      this.rectangularBar.fill.g,
      this.rectangularBar.fill.b,
      this.rectangularBar.fill.alpha
    );
    strokeWeight(this.rectangularBar.strokeWeight);
    stroke(
      this.rectangularBar.strokeFill.r,
      this.rectangularBar.strokeFill.g,
      this.rectangularBar.strokeFill.b
    );
    rect(
      this.rectangularBar.x,
      this.rectangularBar.y,
      this.rectangularBar.width,
      this.rectangularBar.height,
      this.rectangularBar.cornerRadius
    );
    pop();
  }

  // Display circular tracker
  displayCircularTracker() {
    push();
    strokeWeight(this.circularTracker.strokeWeight);
    stroke(this.circularTracker.strokeFill);
    fill(
      this.circularTracker.fill.current.r,
      this.circularTracker.fill.current.g,
      this.circularTracker.fill.current.b
    );
    ellipse(
      this.circularTracker.x,
      this.circularTracker.y,
      this.circularTracker.size
    );
    pop();
  }

  // Move circular tracker
  moveCircularTracker(lessonWordIndex, numLessonWords) {
    // Map tracker's y value to height of rectangular tracker and move based on current lessonWordIndex
    this.circularTracker.y = map(
      lessonWordIndex,
      0,
      numLessonWords,
      this.rectangularBar.y - this.rectangularBar.height / 2,
      this.rectangularBar.y + this.rectangularBar.height / 2
    );
  }

  // Update circular tracker color
  updateCircularTrackerColor(lessonWordIndex, numLessonWords) {
    // Map tracker's color to current lessonWordIndex
    // update red value
    this.circularTracker.fill.current.r = map(
      lessonWordIndex,
      0,
      numLessonWords,
      this.circularTracker.fill.min.r,
      this.circularTracker.fill.max.r
    );
    // update green value
    this.circularTracker.fill.current.g = map(
      lessonWordIndex,
      0,
      numLessonWords,
      this.circularTracker.fill.min.g,
      this.circularTracker.fill.max.g
    );
    // update blue value
    this.circularTracker.fill.current.b = map(
      lessonWordIndex,
      0,
      numLessonWords,
      this.circularTracker.fill.min.b,
      this.circularTracker.fill.max.b
    );
  }
}
