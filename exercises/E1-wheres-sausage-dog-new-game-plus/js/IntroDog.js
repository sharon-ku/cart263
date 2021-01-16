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
    // chance that dogs switches directions
    this.chanceOfSwitchingDirections = 0.02;
    // scale of image
    this.scale = {
      x: 2,
      y: 2,
    };
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
    // Make sure dog stays inside canvas
    this.stayInsideCanvas();

    // Changes direction it faces based on where it walks
    this.changeDirections();

    // Store chance that dog will change directions
    let change = random();

    // Set velocity; dog only changes directoin a certain percentage of the time
    if (change < this.chanceOfSwitchingDirections) {
      // Assign a random speed to dog's velocity
      this.vx = random(-this.speed, this.speed);
    }

    // Increase x position with vx
    this.x += this.vx;
  }

  // Make sure dog stays inside limits of canvas
  stayInsideCanvas() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // Change dog's direction depending on its walking direction
  changeDirections() {
    // if dog is walking to the right, make it face right
    if (this.vx >= 0) {
      this.scale.x = 2;
    }
    // else if dog is walking to the left, make it face left
    else if (this.vx < 0) {
      this.scale.x = -2;
    }
  }

  // Display image of sausage dog
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.theta);
    scale(this.scale.x, this.scale.y);
    image(this.image, 0, 0);
    pop();
  }

  // nothing happens; override parents' method
  mousePressed(mouse) {

  }

  // nothing happens; override parents' method
  warp() {

  }

  // nothing happens; override parents' method
  spin() {

  }
}
