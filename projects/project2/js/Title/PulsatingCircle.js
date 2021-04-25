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
      current: 5,
      min: 0,
      max: 250,
      growthRate: {
        initial: 0.005,
        current: 0.005,
        final: 3,
      },
      growthAcceleration: {
        current: 0.01,
        final: 0.03,
      },
    };
  }

  // Update all circle behaviour
  update() {
    // Make circle pulsate
    this.pulsate();

    // Change stroke weight based on circle's size
    this.changeStrokeWeight();

    // Draw circle
    this.display();
  }

  // Make circle pulsate (grow + shrink)
  pulsate() {
    // If circle has not reached max size yet
    if (this.size.current < this.size.max) {
      // Make circle grow on infinitely with speed and acceleration
      this.size.growthRate.current += this.size.growthAcceleration.current;
      this.size.current += this.size.growthRate.current;
    }
    // Else, if circle exceeds max size
    else {
      // Reset size
      this.size.current = this.size.min;
      // Reset growth rate
      this.size.growthRate.current = this.size.growthRate.initial;
    }
  }

  // Expand to full width of canvas
  expandAllTheWay() {
    this.size.max = this.p.width;
    this.size.growthAcceleration.current = this.size.growthAcceleration.final;
  }

  // Change stroke weight based on circle's size
  changeStrokeWeight() {
    this.strokeWeight.current = this.p.map(
      this.size.current,
      this.size.min,
      this.size.max,
      this.strokeWeight.max,
      this.strokeWeight.min
    );
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
    this.p.pop();
  }

  // Returns true if object provided overlaps with circle
  overlapsWith({ x, y }) {
    if (
      x < this.x + this.size.current / 2 &&
      x > this.x - this.size.current / 2 &&
      y < this.y + this.size.current / 2 &&
      y > this.y - this.size.current / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
