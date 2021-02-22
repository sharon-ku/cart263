// Rectangular button for "Learn New Words" in intro state

class RectButtonLearn extends RectButton {
  constructor(font) {
    super(font);
    // position of button
    this.x = 250;
    this.y = 460;
    // size
    this.width = 290;
    this.height = 180;
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
      r: 155,
      g: 236,
      b: 255,
    };
    // stroke weight
    this.strokeWeight = 5;

    // Cantonese text that goes inside button
    this.cantoneseText = {
      string: `學習新單詞`,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: -20,
      // appearance information
      size: 35,
      font: font,
      fillR: 0,
      fillG: 0,
      fillB: 0,
    };

    // English text that goes inside button
    this.englishText = {
      string: `Learn New Words`,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: 20,
      // appearance information
      size: 25,
      font: font,
      fillR: 0,
      fillG: 0,
      fillB: 0,
    };
  }

  // // Update behaviour of rectangle
  // update(mouse) {
  //   // Change button color when mouse hovers over rectangle
  //   this.setFillColor(mouse);
  //   // Display rectangular button
  //   this.displayRect();
  //   // Display Cantonese and English text that go on top of button
  //   this.displayText(this.cantoneseText);
  //   this.displayText(this.englishText);
  // }
  //
  // // Display rectangle
  // displayRect() {
  //   push();
  //   rectMode(CENTER);
  //   fill(this.fillCurrent.r, this.fillCurrent.g, this.fillCurrent.b);
  //   rect(this.x, this.y, this.width, this.height, this.cornerRadius);
  //   pop();
  // }
  //
  // // Display text that goes on top of button
  // displayText({ string, xOffset, yOffset, size, font, fillR, fillG, fillB }) {
  //   push();
  //   textAlign(CENTER, CENTER);
  //   fill(fillR, fillG, fillB);
  //   textFont(font);
  //   textSize(size);
  //   text(string, this.x + xOffset, this.y + yOffset);
  //   pop();
  // }
  //
  // // Change fill color of rectangle depending on whether the mouse is hovering over it or not
  // setFillColor({ x, y }) {
  //   if (this.overlapsWith({ x, y })) {
  //     this.fillCurrent.r = this.fillHover.r;
  //     this.fillCurrent.g = this.fillHover.g;
  //     this.fillCurrent.b = this.fillHover.b;
  //   } else {
  //     this.fillCurrent.r = this.fillNoHover.r;
  //     this.fillCurrent.g = this.fillNoHover.g;
  //     this.fillCurrent.b = this.fillNoHover.b;
  //   }
  // }
  //
  // // Return true if subject provided as argument is overlapping with button
  // overlapsWith({ x, y }) {
  //   if (
  //     x > this.x - this.width / 2 &&
  //     x < this.x + this.width / 2 &&
  //     y > this.y - this.height / 2 &&
  //     y < this.y + this.height / 2
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
