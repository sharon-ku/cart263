// Contains image for top secret label!
// Displays this image - careful, it's top secret!

class TopSecretLabel {
  constructor(image) {
    // store image of top secret label
    this.image = image;
    // position of image
    this.x = width - 300;
    this.y = height - 500;
  }

  // Display top secret label image
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}
