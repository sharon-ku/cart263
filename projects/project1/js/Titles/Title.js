// Title to be displayed in intro state
// Parent of CantoneseTitle.js and EnglishTitle.js

class Title {
  constructor(font) {
    // string
    this.string = undefined;
    // position
    this.x = width / 2;
    this.y = undefined;
    // color
    this.fill = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    // stroke fill
    this.strokeFill = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    // stroke thickness
    this.strokeThickness = undefined;
    // font size
    this.size = undefined;
    // font
    this.font = font;
  }

  // Update behaviour of text
  update() {
    // Display text
    this.display();
  }

  // Display text
  display() {
    push();
    textSize(this.size);
    textFont(this.font);
    stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    strokeWeight(this.strokeThickness);
    textAlign(CENTER, CENTER);
    fill(this.fill.r, this.fill.g, this.fill.b);
    text(this.string, this.x, this.y);
    pop();
  }
}
