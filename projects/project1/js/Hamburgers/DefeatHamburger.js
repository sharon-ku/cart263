// Defeat hamburger that flies off to hamburger heaven

class DefeatHamburger extends EndHamburger {
  constructor(images) {
    super(images);

    // image index
    this.imageIndex = {
      current: 3,
      min: 3,
      max: 4,
    };
    // image size
    this.width = 213;
    this.height = 199;

    // position
    this.x = 900;
    this.y = height - 300;
    // speed
    this.speed = 1;
  }

  // Update all behaviour of hamburger
  update() {
    // Get superclass's code for this method
    super.update();

    // Display image
    this.display();

    // Fly off to hamburger heaven
    this.fly();
  }

  // Display image
  display() {
    push();
    imageMode(CENTER);
    image(this.images[this.imageIndex.current], this.x, this.y);
    pop();
  }

  // Fly off to hamburger heaven
  fly() {
    // Set vy to be negative so it flies upward
    this.vy = -this.speed;
    // Update x and y positions with velocity
    this.x += this.vx;
    this.y += this.vy;
  }

  // Returns true if hamburger flew to top of canvas (aka hamburger heaven)
  isInHamburgerHeaven() {
    if (this.y + this.height / 2 < 0) {
      console.log(true);
      return true;
    } else {
      return false;
    }
  }

  // Reset defeatHamburger's variables
  reset() {
    // position
    this.x = 900;
    this.y = height - 300;
    // initial velocity
    this.vx = 0;
    this.vy = 0;
  }
}
