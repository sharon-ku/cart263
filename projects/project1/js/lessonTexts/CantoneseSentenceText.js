// Cantonese sentence displayed in `learn` state

class CantoneseSentenceText extends LessonText {
  constructor(cantoneseSentence, font) {
    super(cantoneseSentence, font);
    // string to be displayed
    this.string = cantoneseSentence;
    // position
    this.y = 600;
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
