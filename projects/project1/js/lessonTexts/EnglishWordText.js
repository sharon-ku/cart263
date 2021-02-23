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
