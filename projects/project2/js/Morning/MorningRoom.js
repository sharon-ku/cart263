// Morning oom: to be displayed as background of morning

class MorningRoom {
  constructor(p, images) {
    // p5 instance
    this.p = p;
    // position
    this.x = p.width / 2;
    this.y = p.height / 2;

    // images array
    this.images = images;
    // current image index
    this.imageIndex = 0;

    // frames for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 50;

    // size information
    this.width = undefined;
    this.height = undefined;
  }

  // Update all room behaviour
  update() {
    // Display image
    this.display();

    // Switch images for animation
    this.switchImages();
  }

  // Display image
  display() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.image(this.images[this.imageIndex], this.x, this.y);
    this.p.pop();
  }

  // Switch images for animation
  switchImages() {
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.imageIndex === 0) {
        this.imageIndex = 1;
      } else {
        this.imageIndex = 0;
      }
      this.framesElapsed = 0;
    }
  }
}