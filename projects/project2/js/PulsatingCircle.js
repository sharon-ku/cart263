// Pulsating circle in start scene

class PulsatingCircle {
  constructor(p, x, y) {
    // p5 instance
    this.p = p;
    // position
    this.x = x;
    this.y = y;
    // stroke
    this.strokeWeight = {
      current: 5,
      min: 0,
      max: 5,
    };
    // stroke color: light purple
    this.strokeFill = {
      r: 240,
      g: 170,
      b: 255,
      alpha: {
        current: 255,
        min: 0,
        max: 255,
      },
    };
    // color
    this.fill = {
      r: 0,
      g: 0,
      b: 0,
      alpha: 0,
    };
    // size + growth
    this.size = {
      current: 0,
      min: 0,
      max: 150,
      growthRate: {
        initial: 0.005,
        current: 0.005,
      },
      growthAcceleration: 0.01,
    };
  }

  // Update all circle behaviour
  update() {
    // Draw circle
    this.display();

    // Make circle pulsate
    this.pulsate();
  }

  // Make circle pulsate (grow + shrink)
  pulsate() {
    // If rectangle has not reached max size yet
    if (this.size.current < this.size.max) {
      // Make rectangle grow on infinitely with speed and acceleration
      this.size.growthRate.current += this.size.growthAcceleration;
      this.size.current += this.size.growthRate.current;
    }
    // Else, if rectangle exceeds max size
    else {
      // Reset size
      this.size.current = this.size.min;
      // Reset growth rate
      this.size.growthRate.current = this.size.growthRate.initial;
    }
  }

  // Display circle
  display() {
    this.p.push();
    this.p.fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    this.p.stroke(
      this.strokeFill.r,
      this.strokeFill.g,
      this.strokeFill.b,
      this.strokeFill.alpha
    );
    this.p.strokeWeight(this.strokeWeight.current);
    this.p.ellipse(this.x, this.y, this.size.current);

    this.strokeWeight.current = this.p.map(
      this.size.current,
      this.size.min,
      this.size.max,
      this.strokeWeight.max,
      this.strokeWeight.min
    );
    this.p.pop();
  }
}
