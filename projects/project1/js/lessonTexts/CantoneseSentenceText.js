// Cantonese sentence displayed in `learn` state

class CantoneseSentenceText extends LessonText {
  constructor(cantoneseSentence, font) {
    super(cantoneseSentence, font);
    // string to be displayed
    this.string = cantoneseSentence;
    // language of string
    this.language = `cantonese`;
    // position
    this.y = 600;
    // appearance information
    this.size = 40;
  }
}
