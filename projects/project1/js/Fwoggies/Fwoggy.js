// Fwoggy in `game` state that protects the hamburger

class Fwoggy {
  constructor(images) {
    // images
    this.images = images;
    // image index
    this.imageIndex = 0;
    // frames elapsed for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 50;
    // image size
    this.width = 285;
    this.height = 212;
    // image scale
    this.scale = {
      x: 1,
      y: 1,
    };

    // position
    this.x = width / 2;
    this.y = height / 2 + 50;
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;

    // acceptable distance to be from cat (for whacking purposes)
    this.buffer = {
      x: 10,
      y: 50,
    };
  }

  // Update all behaviour of fwoggy
  update() {
    // Stay still in front of burger with arms protecting it
    this.protectBurger();

    // Display image
    this.display();
  }

  // Display image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.x, this.scale.y);
    image(this.images[this.imageIndex], 0, 0);
    pop();
  }

  // Protect burger
  protectBurger() {
    this.imageIndex = 0;
    // Flip image right and left to make Fwoggy seem paranoid
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.scale.x === 1) {
        // Face left
        this.scale.x = -1;
      } else {
        // Face right
        this.scale.x = 1;
      }
      this.framesElapsed = 0;
    }
  }
}
