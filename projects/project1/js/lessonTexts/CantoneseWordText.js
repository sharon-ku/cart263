// Cantonese word displayed in `learn` state

class CantoneseWordText extends LessonText {
  constructor(cantoneseWord, font) {
    super(cantoneseWord, font);
    // string to be displayed
    this.string = cantoneseWord;
    // language of string
    this.language = `cantonese`;
    // position
    this.y = 425;
    // appearance information
    this.size = 80;
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
