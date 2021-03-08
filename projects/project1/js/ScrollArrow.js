// Arrow indicating scrolling direction in `learn` state
class ScrollArrow {
  constructor({ image, y, yMax, yMin, scaleY }) {
    // image
    this.image = image;

    // position
    this.x = width / 2 + 5;
    this.y = y;
    // top position
    this.yMax = yMax;
    // bottom position
    this.yMin = yMin;

    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 0.2;

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
    // If arrow reaches its y max, make it go down
    if (this.y >= this.yMax) {
      this.vy = -this.speed;
    }
    // Else if arrow reaches its y min, make it go up
    else if (this.y <= this.yMin) {
      this.vy = this.speed;
    }

    // Update y position
    this.y += this.vy;
  }
}
