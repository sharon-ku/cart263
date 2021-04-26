// Table in food delivery instance

class Table {
  constructor(p, x, y) {
    // p5 instance
    this.p = p;
    // position
    this.x = x;
    this.y = y;
    // size
    this.width = 50;
    this.height = 70;
    // fill: light orange
    this.fill = {
      r: 243,
      g: 214,
      b: 169,
    };
    // stroke
    this.strokeFill = {
      r: 255,
      g: 255,
      b: 255,
    };
    this.strokeWeight = 2;
    // corner radius
    this.cornerRadius = 5;
  }

  // Update all table behaviour
  update() {
    // Draw rectangle for table
    this.display();
  }

  // Draw rectangle for table
  display() {
    this.p.push();
    this.p.stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    this.p.strokeWeight(this.strokeWeight);
    this.p.fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    this.p.pop();
  }

  // Draw limit line
  displayWaterLimit() {
    this.p.push();

    this.p.line(
      this.waterLimit.xInitial,
      this.waterLimit.y,
      this.waterLimit.xFinal,
      this.waterLimit.y
    );
    this.p.pop();
  }
}
