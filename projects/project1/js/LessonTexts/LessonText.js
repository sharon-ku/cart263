// Lesson text to be displayed in `learn` state
// I.e. English word, Cantonese word, English sentence, and Cantonese sentence

class LessonText {
  constructor(string, font, englishSpeaker, cantoneseSpeaker) {
    // string to be displayed
    this.string = undefined;

    // language of string
    this.language = undefined;

    // position
    this.x = width / 2;
    this.y = undefined;

    // appearance information
    this.size = undefined;
    this.font = font;
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
        r: 75,
        g: 161,
        b: 88,
      },
    };

    // Area around textbox's outer bounds that is accepted when mouse hovers over textbox
    this.boxWidthOffset = 0;
    this.boxHeightOffset = 10;

    // English and Cantonese speaker for ResponsiveVoice
    this.englishSpeaker = englishSpeaker;
    this.cantoneseSpeaker = cantoneseSpeaker;
  }

  // Update behaviour of text
  update(updatedString, mouse) {
    // Display text
    this.display(updatedString);

    // If mouse overlaps with textbox, change font color
    this.changeColor(mouse);
  }

  // Returns true if provided subject overlaps with text
  overlapsWith(subject) {
    // Bounding box around text box
    let boundingBox = this.font.textBounds(
      this.string,
      this.x,
      this.y,
      this.size
    );

    // Return true if mouse hovers over bounding box
    if (
      subject.x > this.x - boundingBox.w / 2 - this.boxWidthOffset &&
      subject.x < this.x + boundingBox.w / 2 + this.boxWidthOffset &&
      subject.y > this.y - boundingBox.h / 2 - this.boxHeightOffset &&
      subject.y < this.y + boundingBox.h / 2 + this.boxHeightOffset
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Change font color depending on mouse behaviour
  changeColor(mouse) {
    // If mouse overlaps with textbox, change font color
    if (this.overlapsWith(mouse)) {
      this.fill.current = this.fill.hover;
    }
    // Or else, keep normal font color
    else {
      this.fill.current = this.fill.noHover;
    }
  }

  // Display text
  display(updatedString) {
    // Update string
    this.string = updatedString;
    // Display text
    push();
    textAlign(CENTER);
    textFont(this.font);
    textSize(this.size);
    fill(this.fill.current.r, this.fill.current.g, this.fill.current.b);
    text(this.string, this.x, this.y);
    pop();
  }

  // When mouse is pressed and overlapping with string, have ResponsiveVoice read the string
  mousePressed(mouse) {
    if (this.overlapsWith(mouse)) {
      this.speak(this.englishSpeaker, this.cantoneseSpeaker);
    }
  }

  // Have ResponsiveVoice say string out loud
  speak() {
    // If language is English, set English voice to read string
    if (this.language === `english`) {
      responsiveVoice.speak(
        this.string,
        this.englishSpeaker.voice,
        this.englishSpeaker.voiceProperties
      );
    }
    // Else if language is Cantonese, set Cantonese voice to read string
    else if (this.language === `cantonese`) {
      responsiveVoice.speak(
        this.string,
        this.cantoneseSpeaker.voice,
        this.cantoneseSpeaker.voiceProperties
      );
    }
  }
}
