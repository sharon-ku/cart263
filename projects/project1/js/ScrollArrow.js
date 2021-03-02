// Arrow indicating scrolling direction
class ScrollArrow {
  constructor({ image, y, yMax, yMin, scaleY }) {
    // image
    this.image = image;
    // position
    this.x = width / 2 + 5;
    this.y = y;
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 0.2;
    // top position
    this.yMax = yMax;
    // bottom position
    this.yMin = yMin;
    // image scale
    this.scale = {
      x: 1,
      y: scaleY,
    };
  }

  // Update all behaviour of scroll arrow
  update() {
    // Display image of arrow
    this.display();

    // Move arrow up and down
    this.move();
  }

  // Display image of arrow
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    scale(this.scale.x, this.scale.y);
    image(this.image, 0, 0);
    pop();
  }

  // Move up and down
  move() {
    if (this.y >= this.yMax) {
      this.vy = -this.speed;
    } else if (this.y <= this.yMin) {
      this.vy = this.speed;
    }

    this.y += this.vy;
  }
}
