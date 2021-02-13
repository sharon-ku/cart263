// User-controlled boat

class Boat {
  constructor(image) {
    // position information
    this.x = width / 2;
    this.y = height - 50;
    // linear movement information
    this.vx = 0;
    this.vy = 0;
    this.speed = 0.5;
    // angle information
    this.theta = 0;
    this.thetaMin = -PI/4;
    this.thetaMax = PI/4;
    // rotational movement information
    this.angularVelocity = 0;
    this.rotationSpeed = PI / 1000;

    // image information
    this.width = 230;
    this.height = 373;
    this.image = image;
  }

  // Contains all behaviour of boat
  update() {
    // Display the boat
    this.display();
    // If boat rotates 45 degrees on either side, don't let it rotate more
    this.constrainRotation();
  }

  // Swerve in direction of mouse
  swerve() {
    // If mouse is on right side of boat, make boat swerve right
    if (mouseX > this.x) {
      this.angularVelocity = this.rotationSpeed;
    }
    // ELse, if mouse is on left side of boat, make boat swerve left
    else if (mouseX < this.x) {
      this.angularVelocity = -this.rotationSpeed;
    }
    // Update theta of boat
    this.theta += this.angularVelocity;
    // Rotate the boat
    rotate(this.theta);
  }

  // If boat rotates 45 degrees on either side, don't let it rotate more
  constrainRotation() {
    this.theta = constrain(this.theta, this.thetaMin, this.thetaMax);
  }

  // Float in direction of mouse
  float() {
    // If mouse is on right side of boat, make boat swerve right
    if (mouseX > this.x) {
      this.vx = this.speed;
    }
    // ELse, if mouse is on left side of boat, make boat swerve left
    else if (mouseX < this.x) {
      this.vx = -this.speed;
    }
    // Update theta of boat
    this.x += this.vx;
  }

  // Display the boat image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    this.float();
    this.swerve();
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }



}
