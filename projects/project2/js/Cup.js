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
    // water limit line (water cannot surpass this line)
    this.waterLimit = {
      // position
      xInitial: this.x - 30,
      xFinal: this.x + 30,
      y: this.y - this.p.random(0, 30),
      // stroke
      strokeFill: {
        r: 255,
        g: 255,
        b: 255,
      },
      strokeWeight: 5,
    };
  }

  // Update all cup behaviour
  update() {
    // Draw rectangle for cup
    this.displayCup();

    // Display water limit line
    this.displayWaterLimit();
  }

  // Draw rectangle for cup
  displayCup() {
    this.p.push();
    this.p.fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(this.x, this.y, this.width, this.height);
    this.p.pop();
  }

  // Draw limit line
  displayWaterLimit() {
    this.p.push();
    this.p.stroke(
      this.waterLimit.strokeFill.r,
      this.waterLimit.strokeFill.g,
      this.waterLimit.strokeFill.b
    );
    this.p.strokeWeight(this.waterLimit.strokeWeight);
    this.p.line(
      this.waterLimit.xInitial,
      this.waterLimit.y,
      this.waterLimit.xFinal,
      this.waterLimit.y
    );
    this.p.pop();
  }
}
