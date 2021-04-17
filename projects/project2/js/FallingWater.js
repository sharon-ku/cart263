// Falling water that comes out of faucet spout

class FallingWater {
  constructor(p, faucetSpout, cup) {
    // p5 instance
    this.p = p;
    // size
    this.width = 20;
    this.height = 200;
    // position
    this.x = faucetSpout.x - this.width / 2;
    this.y = faucetSpout.y + faucetSpout.height;
    // height values
    this.heightMin = 0;
    this.heightCurrent = this.heightMin;
    this.heightMax = cup.y + cup.height / 2 - this.y;
    this.heightIncreaseRate = 0.2; //0.5
    this.heightIncreaseAcceleration = 0.1;
    this.gravity = 0.1;
    // fill: light blue
    this.fill = {
      r: 207,
      g: 229,
      b: 255,
      alpha: 255,
    };
  }

  // Update all cup behaviour
  update() {
    // Draw rectangle for cup
    this.display();

    // Let water fall
    this.fall();
  }

  // Draw rectangle for cup
  display() {
    this.p.push();
    this.p.fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    this.p.rect(this.x, this.y, this.width, this.heightCurrent);
    this.p.pop();
  }

  // Let water fall from faucet spout
  fall() {
    // Let water fall with velocity and acceleration
    this.heightIncreaseAcceleration += this.gravity;
    this.heightCurrent +=
      this.heightIncreaseRate + this.heightIncreaseAcceleration;

    // Constrain height of water
    this.heightCurrent = this.p.constrain(
      this.heightCurrent,
      this.heightMin,
      this.heightMax
    );
  }
}