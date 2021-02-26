// Finish line displayed in `game` state

class FinishLine {
  constructor() {
    // position
    this.x = width / 2;
    this.y = height - 150;
    // size
    this.width = width;
    this.height = 30;
    // fill color
    this.fill = {
      r: 119,
      g: 198,
      b: 220,
    };
  }

  // Update all behaviour of finish line
  update() {
    // Display the finish line as rectangle
    this.display();
  }

  // Display the finish line as rectangle
  display() {
    push();
    rectMode(CENTER);
    fill(this.fill.r, this.fill.g, this.fill.b);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
