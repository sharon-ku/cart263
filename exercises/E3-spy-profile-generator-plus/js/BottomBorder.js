// Bottom border line displayed on spy profile (for aesthetic purposes)
// Subclass of Border

class BottomBorder extends Border {
  constructor() {
    super();
    // y position of border line
    this.y1 = height - 50;
    this.y2 = height - 50;
  }
}
