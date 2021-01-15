// Sausage dog
// Displayed on canvas
// When clicked, it spins around itself
class SausageDog extends Animal {
  constructor(x, y, image) {
    super(x, y, image);
    // hitbox dimensions of image
    this.hitbox = {
      width: 125,
      height: 100,
    };
    // rotation speed
    this.rotationSpeed = PI / 100;
    // set to true if dog is found
    this.found = false;
  }

  // Update sausage dog every frame
  update() {
    super.update();

    // If user found the dog, let it spin!
    if (this.found) {
      this.spin();
    }
  }

  // If user clicks on sausage dog, set timeToSpin sausage dog to true
  mousePressed(mouse) {
    if (this.overlapsWith(mouse)) {
      this.found = true;
    } else {
      this.found = false;
    }
  }



  // Give theta a rotationSpeed to make sausage dog spin
  spin() {
    this.theta += this.rotationSpeed;
  }
}
