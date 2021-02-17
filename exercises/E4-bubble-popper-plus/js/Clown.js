// Clown image to be displayed as reward for user

class Clown {
  constructor(image, x, y) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = 50;
    this.height = 50;
  }

  // Update clown's behaviour
  update() {
    // Display clown image
    this.display();
    // Drop clown

  }

  // Display image of clown
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.width, this.height);
    pop();
  }
}
