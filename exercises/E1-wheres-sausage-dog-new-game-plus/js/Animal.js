// Animal that is displayed on the canvas
class Animal {
  constructor(x, y, image) {
    // image of animal
    this.image = image;
    // position
    this.x = x;
    this.y = y;
    // velocity
    this.vx = 5;
    this.vy = 0;
    this.speed = random(1.5, 2.5);
    // angle of image about its center point (used for rotation)
    this.theta = 0;
    // hitbox dimensions of image
    this.hitbox = {
      width: undefined,
      height: undefined,
    };
  }

  // Update every frame
  update(level) {
    // Make animal walk
    this.walk();
    // If animal exceeds right side of canvas, warp it back to left side
    this.warp();
    // Display image of animal
    this.display();

    // if (level === 1) {
    //   // Display image of animal
    //   this.display();
    // }
    // else if (level === 2) {
    //   // Make animal walk
    //   this.walk();
    //   // If animal exceeds right side of canvas, warp it back to left side
    //   this.warp();
    //   // Display image of animal
    //   this.display();
    // }
    // else if (level === 3) {
    //   // Make animal walk
    //   this.walk();
    //   // If animal exceeds right side of canvas, warp it back to left side
    //   this.warp();
    //   // Display image of animal
    //   this.display();
    // }
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

  // Animal walks towards the right
  walk() {
    // Set x velocity to speed value
    this.vx = this.speed;
    // Increase x position with vx
    this.x += this.vx;
  }

  // When animal exceeds right side of canvas, warp it back to left side
  warp() {
    if (this.x > (width + this.image.width)) {
      this.x -= width + this.image.width + 100;
    }
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
