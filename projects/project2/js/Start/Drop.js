// Drop of water that falls from top of canvas when user clicks on pulsating circle

class Drop {
  constructor(p, dropImage, x, y) {
    // p5 instance
    this.p = p;
    // image
    this.image = dropImage;
    // image color tint
    this.tint = {
      current: {
        r: 215,
        g: 245,
        b: 191,
      },
      start: {
        r: 215,
        g: 245,
        b: 191,
      },
      end: {
        r: 231,
        g: 112,
        b: 255,
      },
    };
    // position
    this.x = x;
    this.y = y;
    this.yInitial = y;
    // velocity and speed
    this.vx = 0;
    this.vy = 5;
    this.maxSpeed = 5;
    // acceleration
    this.ax = 0;
    this.ay = 0;
    this.gravity = 0.01;
    // true if time to release drop
    this.release = false;
  }

  // Update all behaviour of circle
  update(circle) {
    // Display drop image
    this.display();

    // Apply gravity to drop
    this.applyGravity();

    // Move drop
    this.move();

    // Update drop tint based on y position
    this.updateTint(circle);
  }

  // Display drop image
  display() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.tint(this.tint.current.r, this.tint.current.g, this.tint.current.b);
    this.p.image(this.image, this.x, this.y);
    this.p.pop();
  }

  // Apply gravitational force
  applyGravity() {
    this.ay = this.gravity;
  }

  // Drop the drop
  move() {
    this.vy = this.p.constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    this.vy += this.ay;

    this.y += this.vy;
  }

  // Update tint of drop
  updateTint(circle) {
    // Update tint's r value
    this.tint.current.r = this.p.map(
      this.y,
      this.yInitial,
      circle.y,
      this.tint.start.r,
      this.tint.end.r
    );
    // Update tint's g value
    this.tint.current.g = this.p.map(
      this.y,
      this.yInitial,
      circle.y,
      this.tint.start.g,
      this.tint.end.g
    );
    // Update tint's b value
    this.tint.current.b = this.p.map(
      this.y,
      this.yInitial,
      circle.y,
      this.tint.start.b,
      this.tint.end.b
    );
  }
}
