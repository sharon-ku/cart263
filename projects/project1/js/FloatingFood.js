// Floating and rotating food in intro state

class FloatingFood {
  constructor(image) {
    // image
    this.image = image;
    // position
    this.x = random(0, width);
    this.y = random(0, height);
    // linear velocity
    this.vx = 0;
    this.vy = 0;
    // linear speed
    this.speedCurrent = random(0.3, 1);
    // rotational angle
    this.theta = 0;
    // rotational speed
    this.minAngularSpeed = PI / 1000;
    this.maxAngularSpeed = PI / 500;
    this.angularSpeed = random(this.minAngularSpeed, this.maxAngularSpeed);
    // size
    this.sizeMin = 10;
    this.sizeMax = 20;
    this.sizeCurrent = random(this.sizeMin, this.sizeMax);
  }

  // Update all behaviour of food
  update() {
    // Move food
    this.move();
    // Constrain food to inside of canvas
    this.constrain();
    // Display spinning food image
    this.display();
  }

  // Move food randomly
  move() {
    // Change direction only a certain percentage of the time
    if (random() < 0.005) {
      this.vx = random(-this.speedCurrent, this.speedCurrent);
      this.vy = random(-this.speedCurrent, this.speedCurrent);
    }

    // Update x and y position with velocity
    this.x += this.vx;
    this.y += this.vy;
  }

  // Constrain movement; do not let food escape the canvas!
  constrain() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // Display spinning food image
  display() {
    push();
    translate(this.x, this.y);

    // Spin floating food
    this.spin();

    imageMode(CENTER, CENTER);
    scale(0.7);
    image(this.image, 0, 0);
    pop();
  }

  // Spin floating food
  spin() {
    rotate(this.theta);
    this.theta += this.angularSpeed;
  }
}
