// Lesson text to be displayed in `learn` state
// I.e. English word, Cantonese word, English sentence, and Cantonese sentence

class LessonText {
  constructor(string, font) {
    this.string = undefined;
    // position
    this.x = width / 2;
    this.y = undefined;
    // appearance information
    this.size = undefined;
    this.font = font;
    this.fill = {
      r: undefined,
      g: undefined,
      b: undefined,
    };

  // constructor(cantoneseWord, englishWord, cantoneseSentence, englishSentence, font) {
  //   // English word
  //   this.englishWord = {
  //     string: englishWord,
  //     // position offset from rectangle's center point
  //     x: width / 2,
  //     y: 310,
  //     // appearance information
  //     size: 90,
  //     font: font,
  //     fillR: 0,
  //     fillG: 0,
  //     fillB: 0,
  //   };

    // // Cantonese word
    // this.cantoneseWord = {
    //   string: cantoneseWord,
    //   // position offset from rectangle's center point
    //   x: width / 2,
    //   y: 425,
    //   // appearance information
    //   size: 80,
    //   font: font,
    //   fillR: 0,
    //   fillG: 0,
    //   fillB: 0,
    // };
    //
    // // English sentence
    // this.englishSentence = {
    //   string: englishSentence,
    //   // position offset from rectangle's center point
    //   x: width / 2,
    //   y: 540,
    //   // appearance information
    //   size: 40,
    //   font: font,
    //   fillR: 0,
    //   fillG: 0,
    //   fillB: 0,
    // };
    //
    // // Cantonese sentence
    // this.cantoneseSentence = {
    //   string: cantoneseSentence,
    //   // position offset from rectangle's center point
    //   x: width / 2,
    //   y: 600,
    //   // appearance information
    //   size: 40,
    //   font: font,
    //   fillR: 0,
    //   fillG: 0,
    //   fillB: 0,
    // };

  }

  // Update behaviour of text
  update(subject) {
    this.mouseOverText(subject);
  }

  //Check mouseover
  mouseOverText(mouse) {
    // Display text
    push();
    textAlign(CENTER);
    textFont(this.font);
    textSize(this.size);
    text(this.string, this.x, this.y);
    pop();

    // Bounding box around text box
    let bbox = this.font.textBounds(this.string, this.x, this.y, this.size);

    // Change text color if mouse hovers over bounding box
    if (mouse.x > this.x - (bbox.w / 2) &&
      mouse.x < this.x + (bbox.w / 2) &&
      mouse.y > this.y - (bbox.h / 2) &&
      mouse.y < this.y + (bbox.h / 2)) {
      fill(255, 0, 0);
    } else {
      fill(0);
    }

    // Display green rectangle where bounding box is
    push();
    fill(0, 255, 0, 50);
    rectMode(CENTER);
    rect(bbox.x, bbox.y, bbox.w, bbox.h);
    pop();

  }

}
