// Introduction circles that move around canvas

class IntroCircle {
  constructor() {
    // position
    this.x = random(0, width);
    this.y = random(0, height);
    // velocity
    this.vx = 0;
    this.vy = 0;
    // speed
    this.speedCurrent = undefined;
    this.speedMin = 0.3;
    this.speedMax = 1;
    // size
    this.sizeMin = 10;
    this.sizeMax = 20;
    this.sizeCurrent = random(this.sizeMin, this.sizeMax);
    // color information
    this.fill = {
      r: random(125, 255),
      g: random(125, 255),
      b: random(125, 255)
    }
  }

  // Update all behaviour of circle
  update() {
    // Move circle
    this.move();
    // Constrain circle to inside of canvas
    this.constrain();
    // Display circle
    this.display();
  }

  // Move circle randomly
  move() {
    // Map speed to size of circle (smaller circles are faster)
    this.speedCurrent = map(this.sizeCurrent, this.sizeMax, this.sizeMin, this.speedMin, this.speedMax);

    // Change direction only a certain percentage of the time
    if (random() < 0.005) {
      this.vx = random(-this.speedCurrent, this.speedCurrent);
      this.vy = random(-this.speedCurrent, this.speedCurrent);
    }

    // Update x and y position with velocity
    this.x += this.vx;
    this.y += this.vy;
  }

  // Constrain movement; do not let circle escape the canvas!
  constrain() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // Display circle
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.sizeCurrent);
    pop();
  }
}
