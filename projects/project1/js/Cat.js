// Evil cat

class Cat {
  constructor(x, y, images, font, cantoneseWord, englishWord) {
    // images
    this.images = images;
    // image index
    this.imageIndex = 0;
    // position
    this.x = x;
    this.y = y;

    // rectangle card
    this.rectangle = {
      xOffset: 0,
      yOffset: -16,
      width: 100,
      height: 32,
    };

    // word
    this.word = {
      string: cantoneseWord,
      size: 32,
      font: font,
      fill: 255,
    };
  }

  // Update all behaviour
  update(hamburger) {
    // Display cat
    this.displayCat();

    // Display card that cat is holding
    this.displayCard();

    // Move towards hamburger
    this.move(hamburger);
  }

  // Display cat
  displayCat() {
    // Display image
    push();
    imageMode(CENTER);
    image(this.images[this.imageIndex], this.x, this.y);
    pop();
  }

  // Display card that cat is holding
  displayCard() {
    // Display rectangle
    push();
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(
      this.x + this.rectangle.xOffset,
      this.y + this.rectangle.yOffset,
      this.rectangle.width,
      this.rectangle.height
    );
    pop();

    // Display text
    push();
    textAlign(CENTER);
    textFont(this.word.font);
    textSize(this.word.size);
    fill(this.word.fill);
    text(this.word.string, this.x, this.y);
    pop();
  }

  // Move towards hamburger
  move(hamburger) {
    if (this.x > hamburger.x) {
      this.x -= hamburger.x / 1000;
    } else if (this.x < hamburger.x) {
      this.x += hamburger.x / 1000;
    }

    if (this.y > hamburger.y) {
      this.y -= hamburger.y / 1000;
    } else if (this.y < hamburger.y) {
      this.y += hamburger.y / 1000;
    }
  }
}