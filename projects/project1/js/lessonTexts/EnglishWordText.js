// English word displayed in `learn` state

class EnglishWordText extends LessonText {
  constructor(englishWord, font) {
    super(englishWord, font);
    // string to be displayed
    this.string = englishWord;
    // position
    this.y = 310;
    // appearance information
    this.size = 90;
    this.fill = {
      r: 0,
      g: 0,
      b: 0,
    };
  }
}
