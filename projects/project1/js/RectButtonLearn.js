// Rectangular button for "Learn New Words" in intro state

class RectButtonLearn extends RectButton {
  constructor(font) {
    super(font);
    // position of button
    this.x = 250;
    // if button clicked, switch to this state
    this.state = `learn`;

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
