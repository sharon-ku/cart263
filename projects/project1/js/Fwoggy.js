// Fwoggy in `game state`

class Fwoggy {
  constructor(image) {
    // frames elapsed for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 50;
    // image
    this.image = image;
    // position
    this.x = width / 2;
    this.y = height / 2 + 50;
    // image scale
    this.scale = {
      x: 1,
      y: 1,
    };
    // fwoggy's task
    // all possible tasks: protectBurger, wackCat
    this.task = `protectBurger`;
  }

  // Update all behaviour of fwoggy
  update() {
    // Change animation depending on task
    if (this.task === `protectBurger`) {
      // Protect burger
      this.protectBurger();
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
}
