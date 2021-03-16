// Rectangular button that contains text and can be clicked on
// Superclass of RectButtonLearn.js and RectButtonGame.js

class RectButton extends Button {
  constructor(font) {
    super();
    // position of button
    this.x = undefined;
    this.y = 500;
    // if button clicked, switch to this state
    this.state = undefined;
    // size
    this.width = 400;
    this.height = 220;
    // radius of rounded corner
    this.cornerRadius = 30;
    // current fill color
    this.fillCurrent = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    // fill color when mouse is not hovering over button
    this.fillNoHover = {
      r: 245,
      g: 245,
      b: 245,
    };
    // fill color when mouse hovers over button
    this.fillHover = {
      r: 255,
      g: 255,
      b: 255,
    };
    // stroke color
    this.strokeFill = {
      r: 119,
      g: 198,
      b: 220,
    };
    // stroke weight
    this.strokeWeight = 5;

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
  setFillColor(mouse) {
    if (this.overlapsWith(mouse)) {
      this.fillCurrent = this.fillHover;
    } else {
      this.fillCurrent = this.fillNoHover;
    }
  }

  // If mouse pressed on button, switch states
  mousePressed(mouse) {
    if (this.overlapsWith(mouse)) {
      state = this.state;
    }
  }
}