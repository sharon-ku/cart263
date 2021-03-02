// Hamburger heart that symbolizes user's number of lives

class Heart {
  constructor({ image, x, y }) {
    // frames elapsed for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 30;
    // image
    this.image = image;
    // image scale
    this.scale = {
      current: 0.8,
      // min and max scale
      min: 0.75,
      max: 0.8,
    };
    // position
    this.x = x;
    this.y = y;
  }

  // Update all behaviour of heart
  update() {
    // Make the heart beat
    this.beat();
    // Display image
    this.display();
  }

  // Display image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.current);
    image(this.image, 0, 0);
    pop();
  }

  // Make the heart beat
  beat() {
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.scale.current === this.scale.min) {
        this.scale.current = this.scale.max;
      } else {
        this.scale.current = this.scale.min;
      }
      this.framesElapsed = 0;
    }
  }
}
