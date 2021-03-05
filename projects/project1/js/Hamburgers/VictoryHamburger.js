// Victory hamburger that flies around and that Fwoggy will eat

class VictoryHamburger {
  constructor(images) {
    // images for flying animation
    this.images = images;
    // current image index
    this.imageIndex = 1;
    // frames elapsed for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 10;
    // position
    this.x = 900;
    this.y = height - 300;
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
    // image size
    this.width = 214;
    this.height = 149;
  }

  // Update all behaviour of hamburger
  update() {
    // Display image
    this.display();

    // Fly off to hamburger heaven
    this.fly();

    // Wing flapping animation
    this.flapWings();
  }

  // Display image
  display() {
    push();
    imageMode(CENTER);
    image(this.images[this.imageIndex], this.x, this.y);
    pop();
  }

  // Fly off to hamburger heaven
  fly() {
    // Update x velocity
    this.vx = -this.speed;
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
      console.log(true);
      return true;
    } else {
      return false;
    }
  }

  // Reset defeatHamburger's variables
  reset() {
    // position
    this.x = 900;
    this.y = height - 300;
    // initial velocity
    this.vx = 0;
    this.vy = 0;
  }
}
