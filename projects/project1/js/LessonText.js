// Lesson text to be displayed in `learn` state
// I.e. English word, Cantonese word, English sentence, and Cantonese sentence

class LessonText {
  constructor(cantoneseWord, englishWord, cantoneseSentence, englishSentence) {
    // position of center of canvas
    this.x = width / 2;
    this.y = height / 2;

    // English word
    this.englishWord = {
      string: englishWord,
      // position offset from rectangle's center point
      xOffset: 0,
      yOffset: -50,
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
      yOffset: 65,
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
      yOffset: 180,
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
      yOffset: 240,
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
    this.displayText(this.englishWord);
    this.displayText(this.cantoneseWord);
    this.displayText(this.englishSentence);
    this.displayText(this.cantoneseSentence);

    // this.obtainBoundingBox(this.englishWord);
    // print(`${this.englishWord.boundingBox}`);
    // this.obtainBoundingBox(this.cantoneseWord);
    // this.obtainBoundingBox(this.englishSentence);
    // this.obtainBoundingBox(this.cantoneseSentence);

    // this.overlapsWith(this.englishWord.boundingBox, subject);
    // this.overlapsWith(this.cantoneseWord.boundingBox, subject);
    // this.overlapsWith(this.englishSentence.boundingBox, subject);
    // this.overlapsWith(this.cantoneseSentence.boundingBox, subject);

    if (this.overlapsWith(this.englishWord, subject)) {
      console.log(`hello`);
    }
    this.overlapsWith(this.cantoneseWord, subject);
    this.overlapsWith(this.englishSentence, subject);
    this.overlapsWith(this.cantoneseSentence, subject);
  }

  // Display text
  displayText({ string, xOffset, yOffset, size, font, fillR, fillG, fillB }) {
    push();
    textAlign(CENTER, CENTER);
    fill(fillR, fillG, fillB);
    textFont(font);
    textSize(size);
    text(string, this.x + xOffset, this.y + yOffset);
    pop();
  }


  // Return true if subject provided as argument is overlapping with button
  overlapsWith({font, string, xOffset, yOffset, size}, subject) {
    push();
    rectMode(CENTER, CENTER);
    let boundingBox = font.textBounds(string, this.x + xOffset, this.y + yOffset, size);

    fill(255);
  stroke(0);
  rect(boundingBox.x, boundingBox.y + 50, boundingBox.w, boundingBox.h);
    pop();

    if (
      subject.x > boundingBox.x - boundingBox.w / 2 &&
      subject.x < boundingBox.x + boundingBox.w / 2 &&
      subject.y > boundingBox.y - boundingBox.h / 2 &&
      subject.y < boundingBox.y + boundingBox.h / 2
    ) {
      background(255,0,0);
      return true;
    } else {
      return false;
    }
  }


  // // Bounding box returns the textbox's x and y coordinates, width, and height
  // // The rectangle object returned has properties: x, y, w, h
  // obtainBoundingBox({boundingBox, font, string, x, y, size}) {
  //   boundingBox = font.textBounds(string, x, y, size);
  //   print(`${boundingBox}`);
  // }
  //
  // // Return true if subject provided as argument is overlapping with button
  // overlapsWith(boundingBox, subject) {
  //   // this.obtainBoundingBox();
  //
  //   if (
  //     subject.x > boundingBox.x - boundingBox.w / 2 &&
  //     subject.x < boundingBox.x + boundingBox.w / 2 &&
  //     subject.y > boundingBox.y - boundingBox.h / 2 &&
  //     subject.y < boundingBox.y + boundingBox.h / 2
  //   ) {
  //     print(`true`);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

}
