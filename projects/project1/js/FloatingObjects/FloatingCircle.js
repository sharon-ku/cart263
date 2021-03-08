// Circles that float around canvas

class FloatingCircle extends FloatingObject {
  constructor() {
    super();

    // speed
    this.speedCurrent = undefined;
    this.speedMin = 0.3;
    this.speedMax = 1;
    // size
    this.sizeMin = 5;
    this.sizeMax = 12;
    this.sizeCurrent = random(this.sizeMin, this.sizeMax);
    // color information
    this.fill = {
      r: random(125, 255),
      g: random(125, 255),
      b: random(125, 255),
    };
  }

  // Move circle randomly
  move() {
    // Map speed to size of circle (smaller circles are faster)
    this.speedCurrent = map(
      this.sizeCurrent,
      this.sizeMax,
      this.sizeMin,
      this.speedMin,
      this.speedMax
    );

    // Get code from superclass's method
    super.move();
  }

  // Display circle
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.sizeCurrent);
    pop();
  }
}
