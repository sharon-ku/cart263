// Lesson text to be displayed in `learn` state
// I.e. English word, Cantonese word, English sentence, and Cantonese sentence

class LessonText {
  constructor(string, font) {
    this.string = undefined;
    // position
    this.x = width / 2;
    this.y = undefined;
    // appearance information
    this.size = undefined;
    this.font = font;
    this.fill = {
      // current fill color
      current: {
        r: undefined,
        g: undefined,
        b: undefined,
      },
      // fill when mouse is not hovering over text
      noHover: {
        r: undefined,
        g: undefined,
        b: undefined,
      },
      // fill when mouse is hovering over text
      hover: {
        r: undefined,
        g: undefined,
        b: undefined,
      },
    };
    // Area around textbox's outer bounds that is accepted when mouse hovers
    this.boxWidthOffset = 0;
    this.boxHeightOffset = 15;
  }

  // Update behaviour of text
  update(mouse) {
    // Display text
    this.display();
    // If mouse overlaps with textbox, change color
    if (this.overlapsWith(mouse)) {
      this.changeColor();
    }
    // Or else, keep normal color
    else {
      this.keepDefaultColor();
    }
  }

  // Returns true if provided subject overlaps with text
  overlapsWith(subject) {
    // Bounding box around text box
    let boundingBox = this.font.textBounds(
      this.string,
      this.x,
      this.y,
      this.size
    );

    // Change text color if mouse hovers over bounding box
    if (
      subject.x > this.x - boundingBox.w / 2 - this.boxWidthOffset &&
      subject.x < this.x + boundingBox.w / 2 + this.boxWidthOffset &&
      subject.y > this.y - boundingBox.h / 2 - this.boxHeightOffset &&
      subject.y < this.y + boundingBox.h / 2 + this.boxHeightOffset
    ) {
      return true;
    } else {
      return false;
    }

    // Display green rectangle where bounding box is
    push();
    fill(0, 255, 0, 50);
    stroke(0);
    rectMode(CENTER);
    rect(boundingBox.x, boundingBox.y, boundingBox.w, boundingBox.h);
    pop();
  }

  // Changes text fill to hover color
  changeColor() {
    this.fill.current.r = this.fill.hover.r;
    this.fill.current.g = this.fill.hover.g;
    this.fill.current.b = this.fill.hover.b;
  }

  // Set color to default
  keepDefaultColor() {
    this.fill.current.r = this.fill.noHover.r;
    this.fill.current.g = this.fill.noHover.g;
    this.fill.current.b = this.fill.noHover.b;
  }

  // Display text
  display() {
    push();
    textAlign(CENTER);
    textFont(this.font);
    textSize(this.size);
    fill(this.fill.current.r, this.fill.current.g, this.fill.current.b);
    text(this.string, this.x, this.y);
    pop();
  }
}
