// Play button in intro state
// When clicked, brings user to game state
class PlayButton {
  constructor(title) {
    this.x = title.x;
    this.y = title.y + 300;
    this.text = {
      string: `PLAY`,
      size: 50,
    };
    this.rect = {
      // color: darkish, foresty green
      fill: {
        r: 2,
        g: 173,
        b: 96,
      },
      // size information
      width: 200,
      height: 80,
      cornerRadius: 50,

    };
    // returns true if button has been clicked
    this.clicked = false;
  }

  // Update each frame of play button
  update() {
    // Display button
    this.display();
  }

  // If user clicks on button, set state to game
  mousePressed(mouse) {
    if (this.overlapsWith(mouse)) {
      this.clicked = true;
    }
  }

  // Display button
  display() {
    // Display background rectangle
    push();
    rectMode(CENTER);
    fill(this.rect.fill.r, this.rect.fill.g, this.rect.fill.b);
    rect(this.x, this.y, this.rect.width, this.rect.height, this.rect.cornerRadius);
    pop();

    // Display `Play` text
    push();
    textAlign(CENTER, CENTER);
    textSize(this.text.size);
    text(this.text.string, this.x, this.y);
    pop();
  }

  // Returns true if subject overlaps with rectangle
  overlapsWith({ x, y }) {
    if (
      x > this.x - this.rect.width / 2 &&
      x < this.x + this.rect.width / 2 &&
      y > this.y - this.rect.height / 2 &&
      y < this.y + this.rect.height / 2
    ) {
      console.log(`true`);
      return true;
    } else {
      console.log(`false`);
      return false;
    }
  }
}
