// Bubble floating around that is meant to be popped!
class Bubble {
  constructor() {
    // position
    this.x = random(0, width);
    this.y = random(0, height);
    // movement
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
    // appearance
    this.size = random(30, 60);
    this.fill = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
      alpha: 125,
    };
  }

  // Update all behaviour of bubble
  update() {
    // Display bubble
    this.display();
    // Constrain bubble's movement to inside of canvas
    this.constrain();
    // Move bubble randomly on canvas
    this.float();
  }

  // Move bubble randomly on canvas
  float() {
    // Change velocity 10% of the time
    if (random() < 0.1) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update position with velocity
    this.x += this.vx;
    this.y += this.vy;
  }

  // Constrain bubble's movement to inside of canvas
  constrain() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // Display bubble as ellipse
  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // Returns true if subject overlaps with bubble
  overlapsWith({x, y}) {
    // Calculate distance between subject and bubble
    let distBtwSubjectAndBubble = dist(x, y, this.x, this.y);
    // If distance calculated is less than bubble's radius, then subject is overlapping with bubble and return true
    if (distBtwSubjectAndBubble < this.size / 2) {
      return true;
    } else {
      return false;
    }
  }
}
