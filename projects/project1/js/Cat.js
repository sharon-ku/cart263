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
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 1.5; //0.5

    // acceptable hamburger overlap buffer
    this.buffer = {
      x: 100,
      y: 50,
    };

    // rectangle card
    this.rectangle = {
      xOffset: 0,
      yOffset: -16,
      width: 150,
      height: 48,
      stroke: 255,
      strokeWeight: 3,
      fill: 0,
    };

    // word
    this.word = {
      string: cantoneseWord,
      size: 35,
      font: font,
      fill: 255,
    };
  }

  // Update all behaviour
  update(hamburger) {
    // Display card that cat is holding
    this.displayCard();

    // Display cat
    this.displayCat();

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
    fill(this.rectangle.fill);
    stroke(this.rectangle.stroke);
    strokeWeight(this.rectangle.strokeWeight);
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
    this.vx = this.speed;
    this.vy = this.speed;

    if (this.x > hamburger.x + this.buffer.x) {
      this.x -= this.vx;
    } else if (this.x < hamburger.x - this.buffer.x) {
      this.x += this.vx;
    }

    if (this.y > hamburger.y + this.buffer.y) {
      this.y -= this.vy;
    } else if (this.y < hamburger.y - this.buffer.y) {
      this.y += this.vy;
    }
  }

  // Return true if cat overlaps with subject provided as argument
  overlapsWith(subject) {
    if (
      this.x > subject.x - subject.width / 2 &&
      this.x < subject.x + subject.width / 2 &&
      this.y > subject.y - subject.height / 2 &&
      this.y < subject.y + subject.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
