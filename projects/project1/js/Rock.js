// Rock

class Rock {
  constructor() {
    // position information
    this.x = random(0, width);
    this.y = random(0, height);
    // movement information
    this.vx = 0;
    this.vy = 0;
    this.speed = 0.7;
    // size information
    this.size = random(10, 60);
    // color information
    this.fill = {
      r: 230,
      g: 255,
      b: 236,
    }
  }

  // Update rock at each frame
  update() {
    // Move with current
    this.moveDown();
    // Display rock as circle
    this.display();
  }

  // Display rock
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // Move with current
  moveDown() {
    this.vy = this.speed;
    this.y += this.vy;
  }
}
