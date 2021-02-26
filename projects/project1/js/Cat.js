// Evil cat

class Cat {
  constructor(images) {
    // images
    this.images = images;
    // image index
    this.imageIndex = 0;
    // position
    this.x = width + 100;
    this.y = height - 100;

    // rectangle word
    this.rectangle = {
      xOffset: 0,
      yOffset: -16,
      width: 100,
      height: 32,
    };
  }

  // Update all behaviour
  update(hamburger) {
    // Display image
    this.display();

    // Move towards hamburger
    this.move(hamburger);
  }

  // Display image
  display() {
    push();
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(
      this.x + this.rectangle.xOffset,
      this.y + this.rectangle.yOffset,
      this.rectangle.width,
      this.rectangle.height
    );
    pop();

    push();
    imageMode(CENTER);
    image(this.images[this.imageIndex], this.x, this.y);
    pop();
  }

  // Move towards hamburger
  move(hamburger) {
    if (this.x > hamburger.x) {
      this.x -= hamburger.x / 1000;
      this.y -= hamburger.y / 1000;
    }
  }
}
