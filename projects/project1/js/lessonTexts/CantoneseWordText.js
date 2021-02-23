// Cantonese word displayed in `learn` state

class CantoneseWordText extends LessonText {
  constructor(cantoneseWord, font) {
    super(cantoneseWord, font);
    // string to be displayed
    this.string = cantoneseWord;
    // position
    this.y = 425;
    // appearance information
    this.size = 80;
    this.fill = {
      r: 0,
      g: 0,
      b: 0,
    };
  }
}
