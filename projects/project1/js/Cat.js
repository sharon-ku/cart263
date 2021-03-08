// Evil cat in `game` state that flies towards hamburger
// Cat holds a card that contains a random Chinese word
// If user says correct English word corresponding to card word, cat flees in opposite direction

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
      toHamburger: 0.4,
      fleeing: 2,
    };

    // acceptable distance to be from hamburger or Fwoggy
    this.buffer = {
      x: 100,
      y: 50,
    };

    // rectangle card that cat holds
    this.rectangle = {
      // offset distance from this.x and this.y
      xOffset: 0,
      yOffset: -16,
      // size
      width: 130,
      height: 48,
      // stroke color
      stroke: {
        r: 255,
        g: 255,
        b: 255,
      },
      // stroke weight
      strokeWeight: 3,
      // fill color
      fill: {
        r: 75,
        g: 161,
        b: 88,
      },
      // radius of rounded corner
      roundedCorner: 5,
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
      // Offset from this.x and this.y position
      xOffset: 0,
      yOffset: -3,
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

  // Display cat image
  displayCat() {
    push();
    imageMode(CENTER);
    image(this.images[this.imageIndex], this.x, this.y);
    pop();
  }

  // Swith images depending on cat's feeling
  switchImages() {
    // If cat is confident, switch between images with index 0 and 1
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
    }
    // Else, if cat is scared, switch between images with index 2 and 3
    else if (this.feeling === `scared`) {
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
    // Display rectangular card
    push();
    fill(this.rectangle.fill.r, this.rectangle.fill.g, this.rectangle.fill.b);
    stroke(
      this.rectangle.stroke.r,
      this.rectangle.stroke.g,
      this.rectangle.stroke.b
    );
    strokeWeight(this.rectangle.strokeWeight);
    rectMode(CENTER);
    rect(
      this.x + this.rectangle.xOffset,
      this.y + this.rectangle.yOffset,
      this.rectangle.width,
      this.rectangle.height,
      this.rectangle.roundedCorner
    );
    pop();

    // Display Cantonese word on top of card
    push();
    textAlign(CENTER);
    textFont(this.cardText.font);
    textSize(this.cardText.size);
    fill(this.cardText.fill);
    text(
      this.cantoneseWord,
      this.x + this.cardText.xOffset,
      this.y + this.cardText.yOffset
    );
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
  // this.buffer is the acceptable distance to be from subject
  updatePosition({ x, y }) {
    // Update x position
    if (this.x > x + this.buffer.x) {
      this.x -= this.vx;
    } else if (this.x < x - this.buffer.x) {
      this.x += this.vx;
    }

    // Update y position
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
