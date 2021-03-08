// Cantonese title to be displayed in intro state

class CantoneseTitle extends Title {
  constructor(font) {
    super(font);
    // string
    this.string = `學英語: 情緒`;
    // position
    this.y = 163;
    // color
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
    // stroke fill
    this.strokeFill = {
      r: 119,
      g: 198,
      b: 220,
    };
    // stroke thickness
    this.strokeThickness = 8;
    // font size
    this.size = 110;
  }
}
