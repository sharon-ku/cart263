// Title displayed in intro state
class Title {
  constructor() {
    // position
    this.x = width / 2;
    this.y = height / 3;
    // text information
    this.string = `Where's
  Sausage Dog?`
    this.size = 150;
    this.fill = 255;
  }

  // Update each frame of title
  update() {
    // Display the title
    this.display();
  }

  // Display the title
  display() {
    fill(this.fill);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.string, this.x, this.y);
  }
}
