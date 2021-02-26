// Rectangular button for "Game" in intro state

class RectButtonGame extends RectButton {
  constructor(font) {
    super(font);
    // position of button
    this.x = width - 250;
    // if button clicked, switch to this state
    this.state = `game`;

    // Cantonese text that goes inside button
    this.cantoneseText = {
      string: `遊戲: 零食時間!`,
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
      string: `Game: Snack Time!`,
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
