// English sentence displayed in `learn` state

class EnglishSentenceText extends LessonText {
  constructor(englishSentence, font, englishSpeaker, cantoneseSpeaker) {
    super(englishSentence, font, englishSpeaker, cantoneseSpeaker);
    // string to be displayed
    this.string = englishSentence;
    // language of string
    this.language = `english`;
    // position
    this.y = 480;
    // appearance information
    this.size = 40;
  }
}
