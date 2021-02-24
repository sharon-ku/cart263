// Rectangular button that contains text and can be clicked on

class RectButton {
  constructor(font) {
    // position of button
    this.x = undefined;
    this.y = undefined;
    // size
    this.width = undefined;
    this.height = undefined;
    // radius of rounded corner
    this.cornerRadius = undefined;
    // current fill color
    this.fillCurrent = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    // fill color when mouse is not hovering over button
    this.fillNoHover = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    // fill color when mouse hovers over button
    this.fillHover = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    // stroke color
    this.strokeFill = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    // stroke weight
    this.strokeWeight = undefined;

    // Cantonese text that goes inside button
    this.cantoneseText = {
      string: undefined,
      // position offset from rectangle's center point
      xOffset: undefined,
      yOffset: undefined,
      // appearance information
      size: undefined,
      font: font,
      fillR: undefined,
      fillG: undefined,
      fillB: undefined,
    };

    // English text that goes inside button
    this.englishText = {
      string: undefined,
      // position offset from rectangle's center point
      xOffset: undefined,
      yOffset: undefined,
      // appearance information
      size: undefined,
      font: font,
      fillR: undefined,
      fillG: undefined,
      fillB: undefined,
    };
  }

  // Update behaviour of rectangle
  update(mouse) {
    // Change button color when mouse hovers over rectangle
    this.setFillColor(mouse);
    // Display rectangular button
    this.displayRect();
    // Display Cantonese and English text that go on top of button
    this.displayText(this.cantoneseText);
    this.displayText(this.englishText);
  }

  // Display rectangle
  displayRect() {
    push();
    rectMode(CENTER);
    strokeWeight(this.strokeWeight);
    stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    fill(this.fillCurrent.r, this.fillCurrent.g, this.fillCurrent.b);
    rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    pop();
  }

  // Display text that goes on top of button
  displayText({ string, xOffset, yOffset, size, font, fillR, fillG, fillB }) {
    push();
    textAlign(CENTER, CENTER);
    fill(fillR, fillG, fillB);
    textFont(font);
    textSize(size);
    text(string, this.x + xOffset, this.y + yOffset);
    pop();
  }

  // Change fill color of rectangle depending on whether the mouse is hovering over it or not
  setFillColor({ x, y }) {
    if (this.overlapsWith({ x, y })) {
      this.fillCurrent.r = this.fillHover.r;
      this.fillCurrent.g = this.fillHover.g;
      this.fillCurrent.b = this.fillHover.b;
    } else {
      this.fillCurrent.r = this.fillNoHover.r;
      this.fillCurrent.g = this.fillNoHover.g;
      this.fillCurrent.b = this.fillNoHover.b;
    }
  }

  // Return true if subject provided as argument is overlapping with button
  overlapsWith({ x, y }) {
    if (
      x > this.x - this.width / 2 &&
      x < this.x + this.width / 2 &&
      y > this.y - this.height / 2 &&
      y < this.y + this.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}