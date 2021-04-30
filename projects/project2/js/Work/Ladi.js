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

    // Ladi's speech (audio)
    this.speech = speech;

    // size
    this.width = 250;
    this.height = 188;
  }

  // Update all behaviour
  update(gameScore) {
    // Set Ladi's feeling using images
    this.setFeelingImages();

    // Display image
    this.display();

    // Switch images
    this.switchImages();
  }

  // Set Ladi's feeling using images
  setFeelingImages() {
    if (ladiFeeling === `welcoming`) {
      this.imageIndex.first = 0;
      this.imageIndex.second = 1;
    } else if (ladiFeeling === `pointy`) {
      this.imageIndex.first = 2;
      this.imageIndex.second = 3;
    } else if (ladiFeeling === `neutral`) {
      this.imageIndex.first = 4;
      this.imageIndex.second = 5;
    } else if (ladiFeeling === `happy`) {
      this.imageIndex.first = 6;
      this.imageIndex.second = 7;
    } else if (ladiFeeling === `mad`) {
      this.imageIndex.first = 8;
      this.imageIndex.second = 9;
    }
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
