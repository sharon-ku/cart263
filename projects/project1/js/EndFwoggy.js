// Fwoggy in end state (either defeated or victory state)

class EndFwoggy {
  constructor({ images, imageIndex }) {
    // images array
    this.images = images;
    // index of images array
    this.imageIndex = imageIndex;
    // position
    this.x = 500;
    this.y = height / 2;
    // image size
    this.width = 334;
    this.height = 404;
    // angle for rotation
    this.theta = {
      current: 0,
      min: -PI / 2,
    };
    // angular velocity
    this.angularVelocity = -PI / 1000;
    // angular acceleration
    this.angularAcceleration = -PI / 1000;
  }

  // Reset End Fwoggy's variables
  reset() {
    // Reset the current angle
    this.theta.current = 0;
  }

  // Update all behaviour of fwoggy
  update(cat) {
    // Display image
    this.display();
  }

  // Display image
  display() {
    push();
    translate(this.x - 50, this.y + this.height / 2);
    rotate(this.theta.current);
    // this.fallsDown();
    imageMode(CENTER);
    image(this.images[this.imageIndex], 50, -this.height / 2);
    pop();
  }

  // Fall down with angular velocity and acceleration
  // When rotating, pivot about left foot
  fallsDown() {
    // translate(this.x - 50, this.y + this.height / 2);
    // rotate(this.theta.current);
    if (this.theta.current > this.theta.min) {
      this.angularVelocity += this.angularAcceleration;
      this.theta.current += this.angularVelocity;
    }
  }
}
