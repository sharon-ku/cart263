// Rectangle that spans the width of the window
// Used for dramatic effect

class StartRectangle {
  constructor(p, x, y, width) {
    // p5 instance
    this.p = p;
    // position
    this.x = x;
    this.y = y;
    // color: light purple
    this.fill = {
      r: 255,
      g: 230,
      b: 255,
    };
    // size
    this.width = width;
    this.height = 300;
  }

  // Update all behaviour
  update() {
    // Draw rectangle
    this.display();
  }

  // Draw rectangle
  display() {
    this.p.push();
    this.p.rectMode(this.p.CENTER);
    this.p.fill(this.fill.r, this.fill.g, this.fill.b);
    this.p.rect(this.x, this.y, this.width, this.height);
    this.p.pop();
  }
}
