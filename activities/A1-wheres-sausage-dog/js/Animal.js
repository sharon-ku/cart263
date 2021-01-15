// Animal that is displayed on the canvas
class Animal {
  constructor(x, y, image) {
    // image of animal
    this.image = image;
    // position
    this.x = x;
    this.y = y;
    // angle of image about its center point (used for rotation)
    this.theta = 0;
    // hitbox dimensions of image
    this.hitbox = {
      width: undefined,
      height: undefined,
    };
  }

  // Update every frame
  update() {
    this.display();
  }

  // Display image of the animal
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.theta);
    image(this.image, 0, 0);
    pop();
  }

  // Returns true if subject overlaps with animal's hitbox area
  overlapsWith({ x, y }) {
    if (
      x > this.x - this.hitbox.width / 2 &&
      x < this.x + this.hitbox.width / 2 &&
      y > this.y - this.hitbox.height / 2 &&
      y < this.y + this.hitbox.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
