// Rectangular button for "Game" in intro state

class RectButtonGame extends RectButton {
  constructor(font) {
    super(font);
    // position of button
    this.x = width - 350;
    // if button clicked, switch to this state
    this.state = `game`;

    // Cantonese text that goes inside button
    this.cantoneseText = {
      string: `遊戲: 零食時間!`,
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
      string: `Game: Snack Time!`,
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
