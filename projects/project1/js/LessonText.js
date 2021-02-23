// Lesson text to be displayed in `learn` state
// I.e. English word, Cantonese word, English sentence, and Cantonese sentence

class LessonText {
  constructor(cantoneseWord, englishWord, cantoneseSentence, englishSentence, font) {
    // position of center of canvas
    this.x = width / 2;
    this.y = 0;

    // English word
    this.englishWord = {
      string: englishWord,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: 310,
      // appearance information
      size: 90,
      font: font,
      fillR: 0,
      fillG: 0,
      fillB: 0,
      // bounding box of text box
      // boundingBox: undefined,
    };

    // Cantonese word
    this.cantoneseWord = {
      string: cantoneseWord,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: 425,
      // appearance information
      size: 80,
      font: font,
      fillR: 0,
      fillG: 0,
      fillB: 0,
      // bounding box of text box
      // boundingBox: undefined,
    };

    // English sentence
    this.englishSentence = {
      string: englishSentence,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: 540,
      // appearance information
      size: 40,
      font: font,
      fillR: 0,
      fillG: 0,
      fillB: 0,
      // bounding box of text box
      // boundingBox: undefined,
    };

    // Cantonese sentence
    this.cantoneseSentence = {
      string: cantoneseSentence,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: 600,
      // appearance information
      size: 40,
      font: font,
      fillR: 0,
      fillG: 0,
      fillB: 0,
      // bounding box of text box
      // boundingBox: undefined,
    };

  }

  // Display English and Cantonese words and sentences
  displayAllText(subject) {
    // this.displayText(this.englishWord);
    // this.displayText(this.cantoneseWord);
    // this.displayText(this.englishSentence);
    // this.displayText(this.cantoneseSentence);

    this.mouseOverText(this.englishWord, subject);
    // this.mouseOverText(this.cantoneseWord, subject);
    // this.mouseOverText(this.englishSentence, subject);
    // this.mouseOverText(this.cantoneseSentence, subject);
  }


  // mouseOverText(myText, mouse) {
  //   //Check mouseover
  //   push();
  //   textAlign(CENTER, CENTER);
  //   textFont(myText.font);
  //   textSize(myText.size);
  //
  //   let w = textWidth(myText);
  //   let h = textAscent(myText);
  //
  //
  //   if (mouse.x > myText.xOffset + this.x - w / 2 &&
  //     mouse.x < myText.xOffset + this.x + w / 2 &&
  //     mouse.y > myText.yOffset + this.y - h / 2 &&
  //     mouse.y < myText.yOffset + this.y + h / 2) {
  //     background(255, 0, 0);
  //   }
  //
  //   text(myText.string, this.x + myText.xOffset, this.y + myText.yOffset);
  //   pop();
  //   push();
  //   fill(0, 255, 0, 50);
  //   rectMode(CENTER, CENTER);
  //   rect(myText.xOffset + this.x, myText.yOffset + this.y, w, h);
  //   pop();
  //
  // }

  mouseOverText(myText, mouse) {
    //Check mouseover
    push();
    textAlign(CENTER);
    textFont(myText.font);
    textSize(myText.size);

    text(myText.string, this.x + myText.xOffset, this.y + myText.yOffset);
    pop();

    let bbox = myText.font.textBounds(myText.string, this.x + myText.xOffset, this.y + myText.yOffset, myText.size);

    if (mouse.x > myText.xOffset + this.x - (bbox.w / 2) &&
      mouse.x < myText.xOffset + this.x + (bbox.w / 2) &&
      mouse.y > myText.yOffset + this.y - (bbox.h / 2) &&
      mouse.y < myText.yOffset + this.y + (bbox.h / 2)) {
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

  // Display text
  // displayText({ string, xOffset, yOffset, size, font, fillR, fillG, fillB }) {
  //   push();
  //   textAlign(CENTER, CENTER);
  //   fill(fillR, fillG, fillB);
  //   textFont(font);
  //   textSize(size);
  //   text(string, this.x + xOffset, this.y + yOffset);
  //   pop();
  // }

}
