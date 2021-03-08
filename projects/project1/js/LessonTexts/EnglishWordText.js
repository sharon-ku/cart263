// English word displayed in `learn` state

class EnglishWordText extends LessonText {
  constructor(englishWord, font, englishSpeaker, cantoneseSpeaker) {
    super(englishWord, font, englishSpeaker, cantoneseSpeaker);
    // string to be displayed
    this.string = englishWord;
    // language of string
    this.language = `english`;
    // position
    this.y = 215;
    // appearance information
    this.size = 120;
  }
}
