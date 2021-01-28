// Sausage dog
// Displayed on canvas, has behaviour of animal
class SausageDog extends Animal {
  constructor(x, y, image) {
    super(x, y, image);
    // hitbox dimensions of image
    this.hitbox = {
      width: 125,
      height: 100,
    };
    // set to true if dog is found
    this.found = false;
    // true if time to update level
    this.updateLevel = false;
    // true if user did not click on sausage dog
    this.defeat = false;
  }

  // Update sausage dog every frame
  update(level) {
    super.update(level);

    // If user found the dog, update level
    if (this.found) {
      this.updateLevel = true;
      this.found = false;
    }
  }

  // If user clicks on sausage dog, sausage dog has been found!
  mousePressed(mouse) {
    if (this.overlapsWith(mouse)) {
      this.found = true;
    } else {
      this.found = false;
      this.defeat = true;
    }
  }
}
