// Deliverer: little birdie character in work place

class Deliverer {
  constructor(p, images) {
    // p5 instance
    this.p = p;
    // position
    this.x = p.width / 2;
    this.y = 20;
    // images
    this.images = images;
    this.imageIndex = 0;
    // size
    this.size = 50;
  }

  // Update all deliverer behaviour
  update(mouse) {
    // Move deliverer only if it intersects with mouse
    if (this.intersects(mouse)) {
      this.move();
    }

    // Display image
    this.display();
  }

  // Display image
  display() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.image(this.images[this.imageIndex], this.x, this.y);
    this.p.pop();
  }

  // Move image with mouse position
  move() {
    // Only move if mouse is inside canvas
    if (
      this.p.mouseX > 0 &&
      this.p.mouseX < this.p.width &&
      this.p.mouseY > 0 &&
      this.p.mouseY < this.p.height
    ) {
      // Hide cursor
      this.p.push();
      this.p.noCursor();
      this.p.pop();
      this.x = this.p.mouseX;
      this.y = this.p.mouseY;
    }
  }

  // Returns true if deliverer intersects with "other"
  intersects(other) {
    let distanceBtwDelivererAndOther = this.p.dist(
      this.x,
      this.y,
      other.x,
      other.y
    );
    if (distanceBtwDelivererAndOther < this.size / 2) {
      return true;
    } else {
      return false;
    }
  }

  // Switch images of deliverer to show Kay dropped food
  spillsFood() {
    this.imageIndex = 1;
  }

  // Deliver food successfully to table
  deliversFood() {}

  // Reset position and image
  reset() {
    // this.x = this.p.width / 2;
    // this.y = 20;
    this.imageIndex = 0;
  }
}
