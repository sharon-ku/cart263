// Rectangular button for "Learn New Words" in intro state

class RectButtonLearn extends RectButton {
  constructor(font) {
    super(font);
    // position of button
    this.x = 250;
    this.y = 460;
    // size
    this.width = 290;
    this.height = 180;
    // radius of rounded corner
    this.cornerRadius = 30;
    // current fill color
    this.fillCurrent = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    // fill color when mouse is not hovering over button
    this.fillNoHover = {
      r: 245,
      g: 245,
      b: 245,
    };
    // fill color when mouse hovers over button
    this.fillHover = {
      r: 255,
      g: 255,
      b: 255,
    };
    // stroke color
    this.strokeFill = {
      r: 119, //155
      g: 198, //236
      b: 220, //255
    };
    // stroke weight
    this.strokeWeight = 5;

    // Cantonese text that goes inside button
    this.cantoneseText = {
      string: `學習新單詞`,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: -20,
      // appearance information
      size: 35,
      font: font,
      fillR: 119,
      fillG: 198,
      fillB: 220,
    };

    // English text that goes inside button
    this.englishText = {
      string: `Learn New Words`,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: 20,
      // appearance information
      size: 25,
      font: font,
      fillR: 119,
      fillG: 198,
      fillB: 220,
    };
  }
}
