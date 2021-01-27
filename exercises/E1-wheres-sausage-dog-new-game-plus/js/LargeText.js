// Large text displayed, taking up huge part of canvas
class LargeText {
  constructor() {
    // position
    this.x = undefined;
    this.y = undefined;
    // text information
    this.string = undefined;
    this.size = 150;
    this.fill = 255;
  }

  // Update each frame of text
  update() {
    // Display the text
    this.display();
  }

  // Display the text
  display() {
    fill(this.fill);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.string, this.x, this.y);
  }
}
