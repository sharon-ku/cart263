// Table in food delivery instance

class Table {
  constructor(p, x, y, number) {
    // p5 instance
    this.p = p;
    // table number
    this.number = number;
    // table number text size
    this.textSize = 25;
    // position
    this.x = x;
    this.y = y;
    // size
    this.width = 50;
    this.height = 70;
    // fill: light orange
    this.fill = {
      r: 235,
      g: 220,
      b: 255,
    };
    // stroke
    this.strokeFill = {
      r: 205,
      g: 118,
      b: 255,
    };
    this.strokeWeight = 1;
    // corner radius
    this.cornerRadius = 0;
  }

  // Update all table behaviour
  update() {
    // Draw rectangle for table
    this.displayRectangle();

    // Display table number
    this.displayNumber();
  }

  // Display table number
  displayNumber() {
    this.p.push();
    this.p.textSize(this.textSize);
    this.p.textAlign(this.p.CENTER);
    this.p.fill(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    this.p.text(`${this.number}`, this.x, this.y);
    this.p.pop();
  }

  // Draw rectangle for table
  displayRectangle() {
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
