// Rectangular button for "Activity: Flashcards" in intro state

class RectButtonFlashcards extends RectButton {
  constructor(font) {
    super(font);
    // position of button
    this.x = width / 2;
    // if button clicked, switch to this state
    this.state = `flashcards`;
    // Cantonese text that goes inside button
    this.cantoneseText = {
      string: `活動: 抽認卡`,
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
      string: `Activity: Flashcards`,
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

  // If mouse pressed on button, switch states and set time to choose random word
  // OVERRIDE parent's method
  mousePressed(mouse) {
    if (this.overlapsWith(mouse)) {
      // Time to choose random word from vocabulary words list
      timeToChooseRandomWord = true;
      // Update state
      state = this.state;
    }
  }
}
