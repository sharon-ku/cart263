// Play button in intro state
// When clicked, brings user to game state
class PlayButton {
  constructor(title) {
    // Rectangle shape of button
    this.rect = {
      // position
      x: title.x,
      y: title.y + 280,
      // color
      fill: {
        // current color: darkish, foresty green
        current: {
          r: 2,
          g: 173,
          b: 96,
        },
        // color when mouse not hovering over button: darkish, foresty green
        noHover: {
          r: 2,
          g: 173,
          b: 96,
        },
        // color when mouse hovers over button: orange
        hover: {
          r: 240,
          g: 123,
          b: 14,
        },
      },
      // size information
      width: 200,
      height: 80,
      cornerRadius: 50,
    };
    // `Play` text inside button
    this.text = {
      string: `PLAY`,
      size: 50,
      // offset positions from rectangle's position
      xOffset: 0,
      yOffset: 5,
    };

    // returns true if button has been clicked
    this.clicked = false;
  }

  // Update each frame of play button
  update(mouse) {
    // Display button
    this.display();

    // Set color of rectangle button
    this.setColor(mouse);
  }

  // Set rectangle color of button (depends on whether mouse hovers or not)
  setColor(mouse) {
    // if mouse hovers over button shape, set color to `hover` fill
    if (this.overlapsWith(mouse)) {
      this.rect.fill.current.r = this.rect.fill.hover.r;
      this.rect.fill.current.g = this.rect.fill.hover.g;
      this.rect.fill.current.b = this.rect.fill.hover.b;
    }
    // else, set color to `noHover` fill
    else {
      this.rect.fill.current.r = this.rect.fill.noHover.r;
      this.rect.fill.current.g = this.rect.fill.noHover.g;
      this.rect.fill.current.b = this.rect.fill.noHover.b;
    }
  }

  // If user clicks on button, set state to game
  mousePressed(mouse) {
    if (this.overlapsWith(mouse)) {
      this.clicked = true;
    }
  }

  // Display button
  display() {
    // Display background rectangle
    push();
    rectMode(CENTER);
    fill(this.rect.fill.current.r, this.rect.fill.current.g, this.rect.fill.current.b);
    rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height, this.rect.cornerRadius);
    pop();

    // Display `Play` text
    push();
    textAlign(CENTER);
    textSize(this.text.size);
    text(this.text.string, this.text.xOffset + this.rect.x, this.text.yOffset + this.rect.y);
    pop();
  }

  // Returns true if subject overlaps with rectangle
  overlapsWith({ x, y }) {
    if (
      x > this.rect.x - this.rect.width / 2 &&
      x < this.rect.x + this.rect.width / 2 &&
      y > this.rect.y - this.rect.height / 2 &&
      y < this.rect.y + this.rect.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
