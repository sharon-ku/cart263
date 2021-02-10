// Border line displayed on spy profile (for aesthetic purposes)

class Border {
  constructor() {
    // position points of border line
    this.x1 = 0;
    this.x2 = width;
    this.y1 = undefined;
    this.y2 = undefined;
    // appearance information
    this.strokeFill = {
      r: 255,
      g: 0,
      b: 0,
    };
    this.strokeWeight = 4;
  }

  // Display the border line
  display() {
    push();
    strokeWeight(this.strokeWeight);
    stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}
