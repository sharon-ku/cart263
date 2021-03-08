// Hamburger in end state
// Superclass of DefeatHamburger.js and VictoryHamburger.js

class EndHamburger {
  constructor(images) {
    // images for flying animation
    this.images = images;

    // image index
    this.imageIndex = {
      current: undefined,
      min: undefined,
      max: undefined,
    };

    // image size
    this.width = undefined;
    this.height = undefined;

    // frames elapsed for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 10;

    // position
    this.x = undefined;
    this.y = undefined;
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = undefined;
  }

  // Update all behaviour of hamburger
  update() {
    // Wing flapping animation
    this.flapWings();
  }

  // Display image
  display() {}

  // Fly
  fly() {}

  // Flapping wing animation
  flapWings() {
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.imageIndex.current === this.imageIndex.min) {
        this.imageIndex.current = this.imageIndex.max;
      } else {
        this.imageIndex.current = this.imageIndex.min;
      }
      this.framesElapsed = 0;
    }
  }

  // Reset hamburger's variables
  reset() {}
}
