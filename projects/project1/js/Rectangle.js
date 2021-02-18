// Defines what it means to be rectangle
// Can edit the following properties: position, size, cornerRadius, fill color

class Rectangle {
  constructor({x, y, width, height, cornerRadius, fillR, fillG, fillB}) {
    // position
    this.x = x;
    this.y = y;
    // size
    this.width = width;
    this.height = height;
    // corner radius
    this.cornerRadius = cornerRadius;
    // fill color
    this.fill = {
      r: fillR,
      g: fillG,
      b: fillB
    }
  }

  // Display a rectangle
  display() {
    push();
    rectMode(CENTER);
    fill(this.fill.r, this.fill.g, this.fill.b);
    rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    pop();
  }
}
