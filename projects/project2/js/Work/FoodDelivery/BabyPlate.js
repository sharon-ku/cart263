// Baby plates that go on top of table

class BabyPlate {
  constructor(p, x, y, image) {
    // p5 instance
    this.p = p;

    // position
    this.x = x;
    this.y = y;

    // plate image
    this.image = image;
  }

  // Update all table behaviour
  update() {
    // Display plate
    this.display();
  }

  // Display a plate anywhere on top of table
  display() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.image(this.image, this.x, this.y);
    this.p.pop();
  }
}
