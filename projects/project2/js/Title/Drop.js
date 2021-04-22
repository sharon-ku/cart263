// Drop of water that falls from top of canvas when user clicks on pulsating circle

class Drop {
  constructor(p, dropImage, x, y, pulsatingCircle) {
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
        alpha: 255,
      },
      start: {
        r: 215,
        g: 245,
        b: 191,
        alpha: 255,
      },
      end: {
        r: 231,
        g: 112,
        b: 255,
        alpha: 30,
      },
    };
    // position
    this.x = x;
    this.y = y;
    this.yInitial = y;
    this.yFinal = pulsatingCircle.y;
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

  // Update all behaviour of drop
  update() {
    // Display drop image
    this.display();

    // Apply gravity to drop
    this.applyGravity();

    // Move drop
    this.move();

    // Update drop tint based on y position
    this.updateTint();
  }

  // Display drop image
  display() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.tint(
      this.tint.current.r,
      this.tint.current.g,
      this.tint.current.b,
      this.tint.current.alpha
    );
    this.p.image(this.image, this.x, this.y);
    this.p.pop();
  }

  // Apply gravitational force
  applyGravity() {
    this.ay = this.gravity;
  }

  // Drop the drop
  move() {
    // Do not exceed terminal velocity
    this.vy = this.p.constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    // Update position with velocity and acceleration
    this.vy += this.ay;
    this.y += this.vy;
  }

  // Update tint of drop
  updateTint() {
    // Update tint's r value
    this.tint.current.r = this.p.map(
      this.y,
      this.yInitial,
      this.yFinal,
      this.tint.start.r,
      this.tint.end.r
    );
    // Update tint's g value
    this.tint.current.g = this.p.map(
      this.y,
      this.yInitial,
      this.yFinal,
      this.tint.start.g,
      this.tint.end.g
    );
    // Update tint's b value
    this.tint.current.b = this.p.map(
      this.y,
      this.yInitial,
      this.yFinal,
      this.tint.start.b,
      this.tint.end.b
    );
    // Update tint's alpha value
    this.tint.current.alpha = this.p.map(
      this.y,
      this.yInitial,
      this.yFinal,
      this.tint.start.alpha,
      this.tint.end.alpha
    );
  }
}
