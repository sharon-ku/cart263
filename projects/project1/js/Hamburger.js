// Hamburger in `game` state

class Hamburger {
  constructor(image) {
    // image
    this.image = image;
    // position
    this.x = width / 2;
    this.y = height / 2;
  }

  // Update all behaviour of hamburger
  update() {
    // Display image
    this.display();
  }

  // Display image
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}
