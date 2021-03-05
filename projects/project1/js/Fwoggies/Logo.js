// Logo image that, when clicked, brings user to intro state

class Logo {
  constructor(images) {
    // array of images
    this.images = images;
    // image index in array
    this.imageIndex = {
      current: 0,
      hover: 1,
      noHover: 0,
    };
    // size
    this.width = 78;
    this.height = 60;
    // position
    this.x = 60;
    this.y = 60;
  }

  // Update all behaviour of logo
  update(mouse) {
    // Display logo image
    this.display();

    // Set facial expression depending on whether mouse is hovering over face or not
    this.setFacialExpression(mouse);
  }

  // Set facial expression depending on whether mouse is hovering over face or not
  setFacialExpression(mouse) {
    // If mouse overlaps, change image to surprised face
    if (this.overlapsWith(mouse)) {
      this.imageIndex.current = this.imageIndex.hover;
    }
    // Else, set to normal smiley face
    else {
      this.imageIndex.current = this.imageIndex.noHover;
    }
  }

  // Display logo image
  display() {
    push();
    imageMode(CENTER);
    image(this.images[this.imageIndex.current], this.x, this.y);
    pop();
  }

  // Return true if subject provided as argument is overlapping with button
  overlapsWith({ x, y }) {
    if (
      x > this.x - this.width / 2 &&
      x < this.x + this.width / 2 &&
      y > this.y - this.height / 2 &&
      y < this.y + this.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  // If logo is clicked on, change to `intro` state
  mousePressed(mouse) {
    if (this.overlapsWith(mouse)) {
      state = `intro`;
    }
  }
}
