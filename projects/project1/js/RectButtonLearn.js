// Rectangular button for "Learn New Words" in intro state

class RectButtonLearn extends RectButton {
  constructor(font) {
    super(font);
    // position of button
    this.x = 350;
    // if button clicked, switch to this state
    this.state = `learn`;

    // Cantonese text that goes inside button
    this.cantoneseText = {
      string: `學習新單詞`,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: -30,
      // appearance information
      size: 45,
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
      yOffset: 25,
      // appearance information
      size: 45,
      font: font,
      fillR: 119,
      fillG: 198,
      fillB: 220,
    };
  }
}
