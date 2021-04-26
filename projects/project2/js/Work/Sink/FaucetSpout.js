// Faucet spout in sink instance

class FaucetSpout {
  constructor(p) {
    // p5 instance
    this.p = p;
    // position
    this.x = p.width / 2;
    this.y = 0;
    // size
    this.width = 35;
    this.height = 150;
    // fill: light orange
    this.fill = {
      r: 243,
      g: 214,
      b: 169,
    };
  }

  // Update all faucet spout behaviour
  update() {
    // Draw rectangle for faucet spout
    this.drawFaucetSpout();
  }

  // Draw rectangle for faucet spout
  drawFaucetSpout() {
    this.p.push();
    this.p.fill(this.fill.r, this.fill.g, this.fill.b);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(this.x, this.y + this.height / 2, this.width, this.height);
    this.p.pop();
  }
}
