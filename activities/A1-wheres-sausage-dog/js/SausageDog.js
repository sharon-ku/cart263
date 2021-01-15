// Sausage dog
// Displayed on canvas
// When clicked, it spins around itself
class SausageDog extends Animal {
  constructor(sausageDogImage) {
    super();
    // image of animal
    this.image = sausageDogImage;
    // hitbox size of image
    this.hitbox = {
      width: 125,
      height: 100,
    };
    // angle of image about its center point (used for rotation)
    this.theta = 0;
    // rotation speed
    this.rotationSpeed = PI / 100;
    // set to true if time to spin
    this.timeToSpin = false;
  }

  // Returns true if subject overlaps with sausage dog's hitbox area
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

  // Display image of the animal
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.theta);
    image(this.image, 0, 0);
    pop();
  }

  // Give theta a rotationSpeed to make sausage dog spin
  spin() {
    this.theta += this.rotationSpeed;
  }
}
