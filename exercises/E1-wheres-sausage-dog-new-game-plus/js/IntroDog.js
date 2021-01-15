// Intro sausage dog
// Displayed on canvas
// When clicked, it spins around itself
class IntroDog extends SausageDog {
  constructor(x, y, image) {
    super(x, y, image);
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    // scale of image
    this.scale = 2;
  }

  // Update sausage dog every frame
  update() {
    // Display image of animal
    this.display();

    // Intro dog walks around
    this.walk();
  }

  // Make intro dog walk
  walk() {
    this.changeDirections();
    let change = random();

    // Set velocity
    if (change < 0.1) {
      this.vx = random(-this.speed, this.speed);
    }

    // Increase x position with vx
    this.x += this.vx;
  }

  changeDirections() {
    if (this.vx >= 0) {
      this.scale = 2;
    } else if (this.vx < 0) {
      this.scale = -2;
    }
  }

  // Display image of sausage dog
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.theta);
    scale(this.scale);
    image(this.image, 0, 0);
    pop();
  }

  // If user clicks on sausage dog, set timeToSpin sausage dog to true
  mousePressed(mouse) {

  }

  // nothing happens
  warp() {

  }

  // Give theta a rotationSpeed to make sausage dog spin
  spin() {
    // this.theta += this.rotationSpeed;
  }
}
