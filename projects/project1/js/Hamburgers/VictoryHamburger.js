// Victory hamburger that flies left and right and that Fwoggy will eat

class VictoryHamburger {
  constructor(images) {
    // images for flying animation
    this.images = images;
    // current image index
    this.imageIndex = 1;
    // image scale
    this.scale = {
      current: 1,
      min: 0.1,
      shrinkSpeed: 0.01,
      shrinkAcceleration: 0.001,
    };
    // frames elapsed for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 10;
    // min and max x positions
    this.xMin = 150;
    this.xMax = width - 150;
    // current x and y positions
    this.x = this.xMax;
    this.y = height - 300;
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    // image size
    this.width = 214;
    this.height = 149;
    // true if hamburger is eaten
    this.isEaten = false;
  }

  // Update all behaviour of hamburger
  update() {
    // Display image
    if (this.scale.current > this.scale.min) {
      this.display();
    }

    // Wing flapping animation
    this.flapWings();

    // If hamburger is eaten, make it shrink into victoryFwoggy's mouth
    if (this.isEaten) {
      this.shrink();
    }
    // Or else, make it fly
    else {
      this.fly();
    }
  }

  // Display image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.current);
    image(this.images[this.imageIndex], 0, 0);
    pop();
  }

  // Fly left and right
  fly() {
    // Update vx
    if (this.x <= this.xMin) {
      // Fly right
      this.vx = this.speed;
    } else if (this.x >= this.xMax) {
      // Fly left
      this.vx = -this.speed;
    }
    // Update x and y positions with velocity
    this.x += this.vx;
    this.y += this.vy;
  }

  // Flapping wing animation
  flapWings() {
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.imageIndex === 1) {
        this.imageIndex = 2;
      } else {
        this.imageIndex = 1;
      }
      this.framesElapsed = 0;
    }
  }

  // Returns true if hamburger is inside user's mouth
  isInHamburgerHeaven() {
    if (this.y + this.height / 2 < 0) {
      return true;
    } else {
      return false;
    }
  }

  // If hamburger is eaten, make it shrink into victoryFwoggy's mouth
  shrink() {
    if (this.scale.current > this.scale.min) {
      // accelerate shrink speed
      this.scale.shrinkSpeed += this.scale.shrinkAcceleration;

      // decrease scale with shrink speed
      this.scale.current -= this.scale.shrinkSpeed;
    }
  }

  // Reset defeatHamburger's variables
  reset() {
    // true if hamburger is eaten
    this.isEaten = false;
    // scale
    this.scale.current = 1;
    // position
    this.x = this.xMax;
    this.y = height - 300;
    // initial velocity
    this.vx = 0;
    this.vy = 0;
  }
}
