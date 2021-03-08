// Floating and rotating food in intro state

class FloatingFood extends FloatingObject {
  constructor(image) {
    super();
    // image
    this.image = image;
    // linear speed
    this.speedCurrent = random(0.3, 1);
    // rotational angle
    this.theta = 0;
    // rotational speed
    this.minAngularSpeed = PI / 1000;
    this.maxAngularSpeed = PI / 500;
    this.angularSpeed = random(this.minAngularSpeed, this.maxAngularSpeed);
    // size
    this.scale = 0.7;
  }

  // Display spinning food image
  display() {
    push();
    translate(this.x, this.y);

    // Spin floating food
    this.spin();

    imageMode(CENTER, CENTER);
    scale(this.scale);
    image(this.image, 0, 0);
    pop();
  }

  // Spin floating food
  spin() {
    rotate(this.theta);
    this.theta += this.angularSpeed;
  }
}
