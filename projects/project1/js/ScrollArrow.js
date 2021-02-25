// Arrow indicating scrolling direction
class ScrollArrow {
  constructor(image) {
    // image
    this.image = image;
    // position
    this.x = width / 2;
    this.y = height - 50;
  }

  // Update all behaviour of scroll arrow
  update() {
    // Display image of arrow
    this.display();
  }

  // Display image of arrow
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}
