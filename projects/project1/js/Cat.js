// Evil cat

class Cat {
  constructor(x, y, images, font, cantoneseWord, englishWord) {
    // images
    this.images = images;
    // image index
    this.imageIndex = 0;
    // frames elapsed for image animation
    this.framesElapsed = 0;
    this.framesBtwEachImage = 50;
    // position
    this.x = x;
    this.y = y;
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = {
      toHamburger: 0.5, //0.5
      fleeing: 2,
    };

    // acceptable distance to be from hamburger
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

    // Cantonese word on card
    this.cantoneseWord = cantoneseWord;

    // corresponding English word
    this.englishWord = englishWord;

    // properties for text on card
    this.cardText = {
      size: 35,
      font: font,
      fill: 255,
    };

    // cat's feeling
    // all possible feelings: confident, scared
    this.feeling = `confident`;
  }

  // Update all behaviour
  update(hamburger, fwoggy) {
    // Display card that cat is holding
    this.displayCard();

    // Display cat
    this.displayCat();

    // Swith images depending on cat's feeling
    this.switchImages();

    // Movement depends on feeling
    this.move(hamburger, fwoggy);
  }

  // Display cat
  displayCat() {
    // Display image
    push();
    imageMode(CENTER);
    image(this.images[this.imageIndex], this.x, this.y);
    pop();
  }

  // Swith images depending on cat's feeling
  switchImages() {
    if (this.feeling === `confident`) {
      this.framesElapsed++;
      if (this.framesElapsed === this.framesBtwEachImage) {
        if (this.imageIndex === 1) {
          this.imageIndex = 0;
        } else {
          this.imageIndex = 1;
        }
        this.framesElapsed = 0;
      }
    } else if (this.feeling === `scared`) {
      this.framesElapsed++;
      if (this.framesElapsed === this.framesBtwEachImage) {
        if (this.imageIndex === 2) {
          this.imageIndex = 3;
        } else {
          this.imageIndex = 2;
        }
        this.framesElapsed = 0;
      }
    }
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
    textFont(this.cardText.font);
    textSize(this.cardText.size);
    fill(this.cardText.fill);
    text(this.cantoneseWord, this.x, this.y);
    pop();
  }

  // Move depending on cat's feeling
  move(hamburger, fwoggy) {
    if (this.feeling === `confident`) {
      // Go to hamburger
      this.goTo(hamburger);
    } else if (this.feeling === `scared`) {
      // Flee from Fwoggy
      this.fleeFrom(fwoggy);
    }
  }

  // Go to hamburger
  goTo(hamburger) {
    // Set direction towards hamburger
    this.vx = this.speed.toHamburger;
    this.vy = this.speed.toHamburger;

    // Update position of cat by moving away towards hamburger
    this.updatePosition(hamburger);
  }

  // Flee from Fwoggy
  fleeFrom(fwoggy) {
    // Set direction away from Fwoggy
    this.vx = -this.speed.fleeing;
    this.vy = -this.speed.fleeing;

    // Update position of cat by moving away from Fwoggy
    this.updatePosition(fwoggy);
  }

  // Either move towards or away from subject
  updatePosition({ x, y }) {
    if (this.x > x + this.buffer.x) {
      this.x -= this.vx;
    } else if (this.x < x - this.buffer.x) {
      this.x += this.vx;
    }

    if (this.y > y + this.buffer.y) {
      this.y -= this.vy;
    } else if (this.y < y - this.buffer.y) {
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
