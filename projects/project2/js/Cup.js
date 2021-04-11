// Cup in sink instance

class Cup {
  constructor(p) {
    // p5 instance
    this.p = p;
    // position
    this.x = p.width / 2;
    this.y = p.height - 150;
    // size
    this.width = 50;
    this.height = 70;
    // fill: light orange
    this.fill = {
      r: 243,
      g: 214,
      b: 169,
      alpha: 150,
    };
  }

  // Update all cup behaviour
  update() {
    // Draw rectangle for cup
    this.display();
  }

  // Draw rectangle for cup
  display() {
    this.p.push();
    this.p.fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(this.x, this.y, this.width, this.height);
    this.p.pop();
  }
}
