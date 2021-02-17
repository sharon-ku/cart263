// Clown image to be displayed and dropped as reward for user

class Clown {
  constructor(image, x, y) {
    // position
    this.x = x;
    this.y = y;
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.maxSpeed = random(0.3, 0.5);
    // acceleration
    this.ax = 0;
    this.ay = 0.1;
    // image information
    this.image = image;
    this.width = 50;
    this.height = 50;
  }

  // Update clown's behaviour
  update() {
    // Display clown image
    this.display();
    // Drop clown
    this.drop();
  }

  // Display image of clown
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.width, this.height);
    pop();
  }

  // Let clown fall
  drop() {
    // Update clown's y position with velocity and acceleration (make it drop!)
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
    this.vy += this.ay;
    this.y += this.vy;
  }
}
