// Fwoggy in end state (either defeated or victory state)

class VictoryFwoggy {
  constructor(fwoggyImages, mouthImages) {
    // fwoggy images array (mouthless)
    this.fwoggyImages = fwoggyImages;
    // index of fwoggy images array
    this.fwoggyImageIndex = 3;
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
      imageIndex: 0,
      // position offset from this.x and this.y
      xOffset: -10,
      yOffset: 30,
    };
  }

  // Reset Fwoggy's variables
  reset() {
    // // Reset the current angle
    // this.theta.current = 0;
  }

  // Update all behaviour of fwoggy
  update(cat) {
    // Display image
    this.display();
  }

  // Display Fwoggy
  display() {
    push();
    // Fwoggy's body (everything except mouth)
    imageMode(CENTER);
    image(this.fwoggyImages[this.fwoggyImageIndex], this.x, this.y);

    // Fwoggy's mouth
    imageMode(CENTER);
    image(
      this.mouth.images[this.mouth.imageIndex],
      this.x + this.mouth.xOffset,
      this.y + this.mouth.yOffset
    );
    pop();
  }

  // Does not do anything
  fallsDown() {
    // OVERRIDE parent's method
  }
}
