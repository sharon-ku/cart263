// Cantonese word displayed in `learn` state

class CantoneseWordText extends LessonText {
  constructor(cantoneseWord, font) {
    super(cantoneseWord, font);
    // string to be displayed
    this.string = cantoneseWord;
    // language of string
    this.language = `cantonese`;
    // position
    this.y = 360;
    // appearance information
    this.size = 100;
  }
}
