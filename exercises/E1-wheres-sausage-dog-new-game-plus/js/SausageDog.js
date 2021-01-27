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
    // true if time to update level
    this.updateLevel = false;
  }

  // Update sausage dog every frame
  update(level, createNewCreatures) {
    super.update(level);

    // If user found the dog, let it spin and update level
    if (this.found) {
      this.updateLevel = true;
      this.found = false;
      // let dog spin
      // this.spin();

      // // Set create new creatures to true
      // createNewCreatures = true;

      // // update level based on current level
      // this.changeLevel(createNewCreatures);
    }

    // if (this.updateLevel) {
    //   if (level === 1) {
    //     level = 2;
    //     this.updateLevel = false;
    //   }
    //   else if (level === 2) {
    //     level = 3;
    //     this.updateLevel = false;
    //   }
    //   else if (level === 3) {
    //     level = 4;
    //     this.updateLevel = false;
    //   }
    //
    // }
    // // console.log(`${level}`);
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
