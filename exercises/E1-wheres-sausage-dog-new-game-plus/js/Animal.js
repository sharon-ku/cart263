// Animal that is displayed on the canvas
class Animal {
  constructor(x, y, image) {
    // image of animal
    this.image = image;
    // position
    this.x = x;
    this.y = y;
    // minimum position
    this.xMin = -width;
    this.yMin = 0;
    // maximum position
    this.xMax = width;
    this.yMax = height;
    // velocity
    this.vx = 5;
    this.vy = 0;
    this.speed = random(1.5, 2.5);
    // maximum speed (used for level 3)
    this.maxSpeed = 5;
    // angle of image about its center point (used for rotation)
    this.theta = 0;
    // rotation speed
    this.rotationSpeed = PI / 100;
    // hitbox dimensions of image
    this.hitbox = {
      width: undefined,
      height: undefined,
    };
    // when animal warps to left, add extra distance so it is completely off canvas
    this.extraWarpingDistance = 100;
  }

  // Update every frame
  update(level) {
    // In level 1, animals are static
    if (level === 1) {
      // Display image of animal
      this.display();
    }
    // In level 2, animals walk to the right and wrap back to left
    else if (level === 2) {
      // Make animal walk
      this.walk();
      // If animal exceeds right side of canvas, warp it back to left side
      this.warp();
      // Display image of animal
      this.display();
    }
    // In level 3, animals walk AND stampede (moving up and down)
    else if (level === 3) {
      // Make animal walk
      this.walk();
      // If animal exceeds right side of canvas, warp it back to left side
      this.warp();
      // Display image of animal
      this.display();
      // Move up and down randomly on canvas
      this.moveUpAndDown();
    }
    // In victory, animal floats around to the right, spinning in the air
    else if (state === `victory`) {
      // Make animal walk
      this.walk();
      // If animal exceeds right side of canvas, warp it back to left side
      this.warp();
      // Display image of animal
      this.display();
      // Move up and down randomly on canvas
      this.spin();
    }
  }

  // Randomly change positions
  changePosition(border) {
    this.x = random(this.xMin, this.xMax);
    this.y = random(this.yMin + border, this.yMax - border);
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

  // When animal exceeds right side of canvas, wrap it back to left side
  warp() {
    if (this.x > (width + this.image.width)) {
      this.x -= width + this.image.width + this.extraWarpingDistance;
    }
  }

  // Stampede! Make animals move up and down on canvas
  moveUpAndDown() {
    // Set random y velocity to animal; animal changes direction 20% of the time
    if (random() < 0.2) {
      this.vy = random(-this.maxSpeed, this.maxSpeed);
    }

    // Update y position
    this.y += this.vy;
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

  // Give theta a rotationSpeed to make sausage dog spin
  spin() {
    this.theta += this.rotationSpeed;
  }
}
