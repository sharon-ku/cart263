// English title to be displayed in intro state

class EnglishTitle extends Title {
  constructor(font) {
    super(font);
    // string
    this.string = `Learn How to Say Emotions in English`;
    // position
    this.y = 267;
    // color
    this.fill = {
      r: 119,
      g: 198,
      b: 220,
    };
    // stroke fill
    this.strokeFill = {
      r: 255,
      g: 255,
      b: 255,
    };
    // stroke thickness
    this.strokeThickness = 5;
    // font size
    this.size = 50;
  }
}
