// Floating object that moves around randomly
// Superclass of FloatingCircle.js and FloatingFood.js

class FloatingObject {
  constructor() {
    // position
    this.x = random(0, width);
    this.y = random(0, height);
    // linear velocity
    this.vx = 0;
    this.vy = 0;
  }

  // Update all behaviour of object
  update() {
    // Move object
    this.move();
    // Constrain object to inside of canvas
    this.constrain();
    // Display object
    this.display();
  }

  // Move object randomly
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

  // Constrain movement; do not let object escape the canvas!
  constrain() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // Display object
  display() {}
}
