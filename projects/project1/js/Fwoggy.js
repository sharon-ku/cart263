// Fwoggy in `game state`

class Fwoggy {
  constructor(image) {
    // image
    this.image = image;
    // position
    this.x = width / 2;
    this.y = height / 2 + 50;
    // image scale
    this.scale = 1;
  }

  // Update all behaviour of fwoggy
  update() {
    // Display image
    this.display();
  }

  // Display image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale);
    image(this.image, 0, 0);
    pop();
  }
}
