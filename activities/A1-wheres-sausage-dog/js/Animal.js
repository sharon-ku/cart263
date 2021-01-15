// Animal that is displayed on the canvas
class Animal {
  constructor(animalImage) {
    // border around canvas where animals cannot be displayed
    this.border = 40;
    // position
    this.x = random(this.border, width - this.border);
    this.y = random(this.border, height - this.border);
    // image of animal
    this.image = animalImage;
  }

  // Display image of the animal
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}
