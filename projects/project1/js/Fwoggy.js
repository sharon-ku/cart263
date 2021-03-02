// Fwoggy in `game state`

class Fwoggy {
  constructor(image) {
    // frames elapsed for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 50;
    // image
    this.image = image;
    // image size
    this.width = 285;
    this.height = 212;
    // position
    this.x = width / 2;
    this.y = height / 2 + 50;
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 0.4;
    // image scale
    this.scale = {
      x: 1,
      y: 1,
    };

    // fwoggy's task
    // all possible tasks: protectBurger, walkToCat
    this.task = `protectBurger`;

    // acceptable distance to be from cat (for whacking purposes)
    this.buffer = {
      x: 50,
      y: 50,
    };
  }

  // Update all behaviour of fwoggy
  update(cat) {
    // Change animation depending on task
    if (this.task === `protectBurger`) {
      // Stay still in front of burger with arms protecting it
      this.protectBurger();
    } else if (this.task === `moveToCat`) {
      this.moveTo(cat);
    }

    // Display image
    this.display();
  }

  // Display image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.x, this.scale.y);
    image(this.image, 0, 0);
    pop();
  }

  // Protect burger
  protectBurger() {
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.scale.x === 1) {
        this.scale.x = -1;
      } else {
        this.scale.x = 1;
      }
      this.framesElapsed = 0;
    }
  }

  // Walk to cat
  moveTo(cat) {
    this.vx = this.speed;
    this.vy = this.speed;

    if (this.x > cat.x + this.buffer.x) {
      this.x -= this.vx;
    } else if (this.x < cat.x - this.buffer.x) {
      this.x += this.vx;
    }

    if (this.y > cat.y + this.buffer.y) {
      this.y -= this.vy;
    } else if (this.y < cat.y - this.buffer.y) {
      this.y += this.vy;
    }
  }
}
