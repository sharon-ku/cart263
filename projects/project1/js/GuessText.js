// Gues text displayed on canvas in `game` state

class GuessText {
  constructor(font, currentAnswer) {
    // string
    this.string = currentAnswer;

    // position
    this.x = width / 2;
    this.y = 150;

    // size
    this.size = 80;

    // fill color
    this.fill = {
      r: 75,
      g: 161,
      b: 88,
    };

    // stroke color
    this.stroke = {
      r: 255,
      g: 255,
      b: 255,
    };
    // stroke weight
    this.strokeWeight = 5;
  }

  // Update behaviour of text
  update(currentAnswer) {
    // Display text
    this.display(currentAnswer);
  }

  // Display text showing user's guess
  display(currentAnswer) {
    push();
    strokeWeight(this.strokeWeight);
    textFont(font);
    stroke(this.stroke.r, this.stroke.g, this.stroke.b);
    fill(this.fill.r, this.fill.g, this.fill.b);
    textAlign(CENTER);
    textSize(this.size);
    text(currentAnswer, this.x, this.y);
    pop();
  }
}
