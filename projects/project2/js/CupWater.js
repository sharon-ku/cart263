// Water filled inside cup
class CupWater {
  constructor(p, cup) {
    // p5 instance
    this.p = p;
    // size
    this.width = cup.width;
    this.height = 200;
    // position
    this.x = cup.x;
    this.yMin = cup.y + cup.height / 2;
    this.yMax = cup.y;
    this.yCurrent = this.yMin;
    // height values
    this.heightMin = 0;
    this.heightMax = cup.height;
    this.heightCurrent = this.heightMin;
    this.heightIncreaseRate = 0.1;
    // fill: light blue
    this.fill = {
      r: 207,
      g: 229,
      b: 255,
      alpha: 255,
    };
  }

  // Update all cup behaviour
  update() {
    // // Fill cup with water
    // this.fillCup();

    // Draw rectangle for cup
    this.display();
  }

  // Draw rectangle for cup
  display() {
    this.p.push();
    this.p.rectMode(this.p.CENTER);
    this.p.fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    this.p.rect(this.x, this.yCurrent, this.width, this.heightCurrent);
    this.p.pop();
  }

  // Fill cup with water
  fillCup() {
    // Increase water level
    this.heightCurrent += this.heightIncreaseRate;
    // Update y value based on height
    this.yCurrent = this.yMin - this.heightCurrent / 2;
  }
}
