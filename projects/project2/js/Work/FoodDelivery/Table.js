// Table in food delivery instance

class Table {
  constructor(p, x, y, number, plateImage) {
    // p5 instance
    this.p = p;
    // table number
    this.number = number;
    // table number text size
    this.textSize = 25;

    // number of plates set on table
    this.numPlatesAcquired = 0;

    // true if time to create new plate
    this.timeToCreatePlate = false;

    // position
    this.x = x;
    this.y = y;
    // size of rectangle
    this.width = 50;
    this.height = 70;
    // corner radius
    this.cornerRadius = 0;

    // plates
    this.plates = [];
    // plate image
    this.plateImage = plateImage;
    // plate position
    this.plateX = this.p.random(
      this.x - this.width / 2 + 5,
      this.x + this.width / 2 - 5
    );
    this.plateY = this.p.random(
      this.y - this.height / 2 + 5,
      this.y + this.height / 2 - 5
    );

    // fill: light orange
    this.fill = {
      r: 235,
      g: 220,
      b: 255,
    };
    // stroke
    this.strokeFill = {
      r: 205,
      g: 118,
      b: 255,
    };
    this.strokeWeight = 1;
  }

  // Update all table behaviour
  update() {
    // Draw rectangle for table
    this.displayRectangle();

    // Display table number
    this.displayNumber();

    this.createNewPlate();

    // Display number of plates acquired on table
    this.displayPlate();
  }

  // Display table number
  displayNumber() {
    this.p.push();
    this.p.textSize(this.textSize);
    this.p.textAlign(this.p.CENTER);
    this.p.fill(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    this.p.text(`${this.number}`, this.x, this.y);
    this.p.pop();
  }

  // Display a plate anywhere on top of table
  displayPlate() {
    // Display plates
    for (let i = 0; i < this.plates.length; i++) {
      this.plates[i].update();
    }
  }

  createNewPlate() {
    if (this.timeToCreatePlate) {
      let plate = new BabyPlate(
        this.p,
        this.plateX,
        this.plateY,
        this.plateImage
      );
      this.plates.push(plate);
      this.timeToCreatePlate = false;
    }
  }

  // Randomize next plate location
  randomizePlatePosition() {
    this.plateX = this.p.random(
      this.x - this.width / 2 + 5,
      this.x + this.width / 2 - 5
    );
    this.plateY = this.p.random(
      this.y - this.height / 2 + 5,
      this.y + this.height / 2 - 5
    );
  }

  // Draw rectangle for table
  displayRectangle() {
    this.p.push();
    this.p.stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    this.p.strokeWeight(this.strokeWeight);
    this.p.fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    this.p.pop();
  }
}
