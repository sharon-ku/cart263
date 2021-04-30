// Floating letters that form title

class Letter {
  constructor(p, character, font, x, y) {
    // p5 instance
    this.p = p;
    // font
    this.font = font;
    // letter
    this.character = character;
    // letter size
    this.size = 35;
    // letter color: pink
    this.fill = {
      r: 241,
      g: 171,
      b: 255,
    };
    // position
    this.x = x;
    this.y = y;
    // velocity and speed
    this.vx = 0;
    this.vy = 5;
    this.maxSpeed = 5;
    // acceleration
    this.ax = 0;
    this.ay = 0;
    this.gravity = 0.01;
  }

  // Update all behaviour of letter
  update() {
    // Display letter
    this.display();
  }

  // Display letter
  display() {
    this.p.push();
    this.p.textFont(this.font);
    this.p.fill(this.fill.r, this.fill.g, this.fill.b);
    this.p.textAlign(this.p.CENTER);
    this.p.textSize(this.size);
    this.p.text(this.character, this.x, this.y);
    this.p.pop();
  }
}
