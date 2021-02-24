// English sentence displayed in `learn` state

class EnglishSentenceText extends LessonText {
  constructor(englishSentence, font) {
    super(englishSentence, font);
    // string to be displayed
    this.string = englishSentence;
    // language of string
    this.language = `english`;
    // position
    this.y = 540;
    // appearance information
    this.size = 40;
  }
}
