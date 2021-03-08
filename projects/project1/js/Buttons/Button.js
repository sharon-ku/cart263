// Button that performs an action when clicked
// Superclass of RectButton.js, Logo.js, and VolumeButton.js

class Button {
  constructor() {
    // size
    this.width = undefined;
    this.height = undefined;
    // position
    this.x = undefined;
    this.y = undefined;
  }

  // Update all behaviour of button
  update() {}

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

  // If button clicked, do something
  mousePressed(mouse) {}
}
