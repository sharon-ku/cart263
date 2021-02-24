// English word displayed in `learn` state

class EnglishWordText extends LessonText {
  constructor(englishWord, font) {
    super(englishWord, font);
    // string to be displayed
    this.string = englishWord;
    // language of string
    this.language = `english`;
    // position
    this.y = 310;
    // appearance information
    this.size = 90;
  }
}
