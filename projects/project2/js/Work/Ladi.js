// Ladi: boss
// All behaviour found here

class Ladi {
  constructor(p, images, imageIndex1, imageIndex2, speech) {
    // p5 instance
    this.p = p;

    // position
    this.x = p.width / 2;
    this.y = p.height / 2;

    // images
    this.images = images;
    // used to keep track of image in animation
    this.imageIndex = {
      current: 0,
      // animation is composed of 2 images
      first: imageIndex1,
      second: imageIndex2,
    };

    // frames for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 30;

    // how is Ladi feeling right now?
    // possible feelings: welcoming, neutral, happy, mad
    this.feeling = `neutral`;

    // Ladi's speech (audio)
    this.speech = speech;

    // size
    this.width = 250;
    this.height = 188;
  }

  // Update all behaviour
  update(gameScore) {
    // Display image
    this.display();

    // Switch images
    this.switchImages();
  }

  // Set Peep's feeling using images
  setFeelingImages() {
    // Change images in animation + frames between images
    // if (this.feeling === `normal`) {
    //   this.imageIndex.first = 0;
    //   this.imageIndex.second = 1;
    //   this.framesBtwEachImage = 30;
    // } else if (this.feeling === `happy`) {
    //   this.imageIndex.first = 2;
    //   this.imageIndex.second = 3;
    //   this.framesBtwEachImage = 10;
    // } else if (this.feeling === `mad`) {
    //   this.imageIndex.first = 4;
    //   this.imageIndex.second = 5;
    //   this.framesBtwEachImage = 10;
    // }
  }

  // Display image
  display() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.image(this.images[this.imageIndex.current], this.x, this.y);
    this.p.pop();
  }

  // Switch images for animation
  switchImages() {
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.imageIndex.current === this.imageIndex.first) {
        this.imageIndex.current = this.imageIndex.second;
      } else {
        this.imageIndex.current = this.imageIndex.first;
      }
      this.framesElapsed = 0;
    }
  }
}
