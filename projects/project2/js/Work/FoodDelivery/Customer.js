// Customer in Food delivery task

class Customer {
  constructor(p) {
    // p5 instance
    this.p = p;

    // position to base body parts off of
    this.x = this.p.random(0, this.p.width);
    this.y = this.p.random(0, this.p.height);

    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;

    // angle of rotation
    this.theta = this.p.random(0, this.p.PI / 2);

    // border of canvas in which to constrain characters
    this.border = 50;

    // customer's body
    this.body = {
      // offset from this.x and this.y
      xOffset: 0,
      yOffset: 0,
      // size
      size: 35,
      // color
      fill: {
        r: 221,
        g: 176,
        b: 153,
      },
      // stroke info
      strokeFill: {
        r: 230,
        g: 86,
        b: 122,
      },
      strokeWeight: 1,
    };

    // customer's left eye
    this.leftEye = {
      xOffset: 7,
      yOffset: -7,
      size: 4,
      // color
      fill: {
        r: 230,
        g: 86,
        b: 122,
      },
      strokeFill: {
        r: 230,
        g: 86,
        b: 122,
      },
      strokeWeight: 1,
    };

    // customer's right eye
    this.rightEye = {
      xOffset: 7,
      yOffset: 7,
      size: 4,
      // color
      fill: {
        r: 230,
        g: 86,
        b: 122,
      },
      strokeFill: {
        r: 230,
        g: 86,
        b: 122,
      },
      strokeWeight: 1,
    };
  }

  // Update all customer behaviour
  update() {
    // Move customers
    this.move();

    // Draw customers
    this.display();
  }

  // Move circle
  move() {
    // Change direction only a certain percentage of the time
    if (this.p.random() < 0.005) {
      this.vx = this.p.random(-this.speed, this.speed);
      this.vy = this.p.random(-this.speed, this.speed);
    }

    // Set direction of character based on its vx and vy
    if (this.vx < 0) {
      this.theta = this.p.PI + this.p.atan(this.vy / this.vx);
    } else if (this.vx > 0) {
      this.theta = this.p.atan(this.vy / this.vx);
    }

    // Add velocity to position
    this.x += this.vx;
    this.y += this.vy;

    // Constrain movement
    this.x = this.p.constrain(this.x, this.border, this.p.width - this.border);
    this.y = this.p.constrain(this.y, this.border, this.p.height - this.border);
  }

  // Display customer as circle with 2 eyes
  display() {
    // Draw all body parts
    this.drawCircle(this.body);
    this.drawCircle(this.leftEye);
    this.drawCircle(this.rightEye);
  }

  // Draw a circle
  drawCircle(circleToDraw) {
    this.p.push();
    // set fill and stroke properties
    this.p.fill(circleToDraw.fill.r, circleToDraw.fill.g, circleToDraw.fill.b);
    this.p.stroke(
      circleToDraw.strokeFill.r,
      circleToDraw.strokeFill.g,
      circleToDraw.strokeFill.b
    );
    this.p.strokeWeight(circleToDraw.strokeWeight);

    // rotate about center point of circle
    this.p.translate(this.x, this.y);
    this.p.rotate(this.theta);

    // draw ellipse
    this.p.ellipse(
      circleToDraw.xOffset,
      circleToDraw.yOffset,
      circleToDraw.size
    );
    this.p.pop();
  }
}
