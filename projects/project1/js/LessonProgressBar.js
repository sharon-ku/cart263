// Progress bar displayed in `learn` state
// Helps user track number of words to learn
// Tracker moves along static rectangular bar
class LessonProgressBar {
  constructor() {
    // Static full bar
    this.fullBar = {
      // position
      x: width - 50,
      y: height / 2,
      // size
      width: 10,
      height: 400,
      // fill color
      fill: {
        current: {
          r: 155,
          g: 236,
          b: 255,
          alpha: 255,
        },
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

    // Moving tracker
    this.tracker = {
      // position
      x: this.fullBar.x,
      y: 0,
      // size
      width: this.fullBar.width,
      height: this.fullBar.height / 10,
      // stroke fill
      strokeFill: {
        r: 255,
        g: 255,
        b: 255,
      },
      // stroke weight
      strokeWeight: 2,
      // fill color
      fill: {
        current: {
          r: undefined,
          g: undefined,
          b: undefined,
          alpha: 255,
        },
        min: {
          r: 20,
          g: 255,
          b: 196,
        },
        max: {
          r: 255,
          g: 160,
          b: 87,
        },
      },
      // corner radius
      cornerRadius: 20,
    };
  }

  // Update behaviour of lesson progress bar
  update(lessonWordIndex, numLessonWords) {
    // Draw full bar that is a rectangle
    this.drawRectangle(this.fullBar);

    // Draw tracker that is a rectangle
    this.drawRectangle(this.tracker);

    // Move tracker
    this.moveTracker(lessonWordIndex, numLessonWords);

    // Update tracker color based on current lesson word index
    this.updateTrackerColor(lessonWordIndex, numLessonWords);
  }

  // Draw rectangle
  drawRectangle(rectangle) {
    push();
    rectMode(CENTER);
    fill(
      rectangle.fill.current.r,
      rectangle.fill.current.g,
      rectangle.fill.current.b,
      rectangle.fill.current.alpha
    );
    strokeWeight(rectangle.strokeWeight);
    stroke(
      rectangle.strokeFill.r,
      rectangle.strokeFill.g,
      rectangle.strokeFill.b
    );
    rect(
      rectangle.x,
      rectangle.y,
      rectangle.width,
      rectangle.height,
      rectangle.cornerRadius
    );
    pop();
  }

  // Move tracker
  moveTracker(lessonWordIndex, numLessonWords) {
    // Map tracker's y value to height of full bar and move based on current lessonWordIndex
    this.tracker.y = map(
      lessonWordIndex,
      0,
      numLessonWords,
      this.fullBar.y - this.fullBar.height / 2 + this.tracker.height / 2,
      this.fullBar.y + this.fullBar.height / 2 - this.tracker.height / 2
    );
  }

  // Update tracker color
  updateTrackerColor(lessonWordIndex, numLessonWords) {
    // Map tracker's color to current lessonWordIndex
    // update red value:
    this.tracker.fill.current.r = map(
      lessonWordIndex,
      0,
      numLessonWords,
      this.tracker.fill.min.r,
      this.tracker.fill.max.r
    );
    // update green value:
    this.tracker.fill.current.g = map(
      lessonWordIndex,
      0,
      numLessonWords,
      this.tracker.fill.min.g,
      this.tracker.fill.max.g
    );
    // update blue value:
    this.tracker.fill.current.b = map(
      lessonWordIndex,
      0,
      numLessonWords,
      this.tracker.fill.min.b,
      this.tracker.fill.max.b
    );
  }
}
