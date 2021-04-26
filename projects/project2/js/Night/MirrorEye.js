// Mirror eye in night scene

class MirrorEye {
  constructor(p, xOffset, yOffset) {
    // p5 instance
    this.p = p;
    // // eye position we get from detections
    // this.eyePosition = eyePosition;
    // position
    this.x = undefined;
    this.y = undefined;
    // Offset to add to head's position to make it centered
    this.xOffset = xOffset;
    this.yOffset = yOffset;

    // size
    this.width = 12;
    this.height = 12;

    // color
    this.fill = {
      r: 241,
      g: 142,
      b: 48,
    };
    // stroke color
    this.strokeFill = {
      r: 241,
      g: 142,
      b: 48,
    };
    // stroke
    this.strokeWeight = 0;
  }

  // Update all circle behaviour
  update(detections, eyePosition) {
    for (let i = 0; i < detections.length; i++) {
      // Calculate circle's size and xOffset
      this.calculateValues(i, detections, eyePosition);

      // Draw circle
      this.display();
    }
  }

  // Calculate circle's x and y positions
  calculateValues(i, detections, eyePosition) {
    // Set x and y positions of eye
    this.x = eyePosition[0]._x;
    this.y = eyePosition[4]._y;
  }

  // Display circle
  display() {
    this.p.push();
    this.p.fill(this.fill.r, this.fill.g, this.fill.b);
    this.p.stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    this.p.strokeWeight(this.strokeWeight);
    this.p.ellipse(
      this.x + this.xOffset,
      this.y + this.yOffset,
      this.width,
      this.height
    );
    this.p.pop();
  }
}
