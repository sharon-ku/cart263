// Fwoggy in end state (either defeated or victory state)

class VictoryFwoggy {
  constructor(fwoggyImages, mouthImages) {
    // fwoggy images array (mouthless)
    this.images = fwoggyImages;
    // index of fwoggy images array
    this.imageIndex = 3;
    // frames elapsed for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 20;
    // image size
    this.width = 615;
    this.height = 624;
    // position
    this.x = width / 2;
    this.y = height - this.height / 2;

    // Fwoggy's mouth
    this.mouth = {
      // Fwoggy's mouth images
      images: mouthImages,
      // image index for mouth images
      imageIndex: 1,
      // position
      x: this.x - 10,
      y: this.y + 30,
      // size
      width: 176,
      height: 157,
    };
  }

  // Update all behaviour of fwoggy
  update(mouse, victoryHamburger) {
    // Display image
    this.display();

    // Switch images
    this.switchImages(mouse, victoryHamburger);

    // if mouth is open and hamburger overlaps with mouth, eat hamburger
    if (
      this.mouth.imageIndex === 2 &&
      this.overlapsWith(victoryHamburger, this.mouth)
    ) {
      victoryHamburger.isEaten = true;
    }
  }

  // Reset Fwoggy's variables
  reset() {
    // // Reset the current angle
    // this.theta.current = 0;
  }

  // Swith images depending
  switchImages(mouse) {
    // Body animation (does not include mouth)
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.imageIndex === 3) {
        this.imageIndex = 4;
      } else {
        this.imageIndex = 3;
      }

      // Mouth animation
      // if mouse hovers over body, open the mouth
      if (this.overlapsWith(mouse, this)) {
        this.mouth.imageIndex = 2;
      }
      // or else, saliva in mouth
      else {
        if (this.framesElapsed === this.framesBtwEachImage) {
          if (this.mouth.imageIndex === 0) {
            this.mouth.imageIndex = 1;
          } else {
            this.mouth.imageIndex = 0;
          }
        }
      }
      this.framesElapsed = 0;
    }
  }

  // Display Fwoggy
  display() {
    push();
    // Fwoggy's body (everything except mouth)
    imageMode(CENTER);
    image(this.images[this.imageIndex], this.x, this.y);

    // Fwoggy's mouth
    imageMode(CENTER);
    image(this.mouth.images[this.mouth.imageIndex], this.mouth.x, this.mouth.y);
    pop();
  }

  // Return true if object1 is inside object 2
  overlapsWith(object1, object2) {
    if (
      object1.x > object2.x - object2.width / 2 &&
      object1.x < object2.x + object2.width / 2 &&
      object1.y > object2.y - object2.height / 2 &&
      object1.y < object2.y + object2.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Does not do anything
  fallsDown() {
    // OVERRIDE parent's method
  }
}
