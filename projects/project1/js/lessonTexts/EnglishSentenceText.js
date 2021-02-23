// English sentence displayed in `learn` state

class EnglishSentenceText extends LessonText {
  constructor(englishSentence, font) {
    super(englishSentence, font);
    // string to be displayed
    this.string = englishSentence;
    // position
    this.y = 540;
    // appearance information
    this.size = 40;
    this.fill = {
      // current fill color
      current: {
        r: undefined,
        g: undefined,
        b: undefined,
      },
      // fill when mouse is not hovering over text
      noHover: {
        r: 0,
        g: 0,
        b: 0,
      },
      // fill when mouse is hovering over text
      hover: {
        r: 255,
        g: 0,
        b: 0,
      },
    };
  }
}
