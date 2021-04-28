// Instance 1: Title canvas
//
function createTitleCanvas() {
  let instance1Sketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Drop
    let drop = undefined;
    // Drop image
    let dropImage = undefined;

    // Title font
    let titleFont = undefined;

    // Title string
    let titleString = `fogdog`;
    // Title string split into letters
    let titleLetters = [];

    // Letter objects that contains behaviour
    let letters = [];

    // Letter properties
    let letterProperties = {
      // horizontal spacing between letters
      xSpacing: undefined,
      // maxmimum distance letter can be positioned from center line
      yRangeFromCenter: 50,
      // x position of first character
      firstXPosition: undefined,
    };

    // Title rectangle that spans width of window
    let titleRectangle = undefined;

    // Pulsating circle
    let pulsatingCircle = undefined;

    // Background color: white
    let bgFill = {
      r: 0,
      g: 0,
      b: 0,
    };

    // Load assets
    p.preload = function () {
      // Load drop image
      dropImage = p.loadImage(`assets/images/drop.png`);

      // Load title font
      titleFont = p.loadFont(`assets/fonts/SourceSansPro-SemiBold.ttf`);
    };

    // Create canvas and objects
    p.setup = function () {
      // Remove all strokes
      p.noStroke();

      // Create a title canvas
      let titleCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
      titleCanvas.parent(`title-canvas`);

      // Create new title rectangle whose position is at the center of the canvas
      let rectangleX = p.width / 2;
      let rectangleY = p.height / 2;
      let rectangleWidth = p.width;
      titleRectangle = new TitleRectangle(
        p,
        rectangleX,
        rectangleY,
        rectangleWidth
      );

      // Create a new pulsating circle
      let circleX = p.width / 2;
      let circleY = p.height / 2;
      pulsatingCircle = new PulsatingCircle(p, circleX, circleY);

      // Create a new drop
      let dropX = p.width / 2;
      let dropY = -10;
      drop = new Drop(p, dropImage, dropX, dropY, pulsatingCircle);

      // Split title into letters and store in titleLetters array
      titleLetters = p.split(titleString, ``);

      // Set horizontal spacing between each letter
      letterProperties.xSpacing = p.width / 8;

      // Calculate total length of word with custom spacing
      let wordLength = letterProperties.xSpacing * (titleLetters.length - 1);

      // Set x position of first letter
      letterProperties.firstXPosition = p.width / 2 - wordLength / 2;

      // Create new letters
      for (let i = 0; i < titleLetters.length; i++) {
        let letterX =
          letterProperties.firstXPosition + letterProperties.xSpacing * i;
        let letterY = p.random(
          p.height / 2 + 150 - letterProperties.yRangeFromCenter,
          p.height / 2 + 150 + letterProperties.yRangeFromCenter
        );

        let letter = new Letter(
          p,
          titleLetters[i],
          titleFont,
          letterX,
          letterY
        );

        letters.push(letter);
      }
    };

    // Set mouse positions, set background color, update behaviour of rectangle, pulsating circle, and drop
    p.draw = function () {
      // Set mouse x and y positions
      mouse.x = p.mouseX;
      mouse.y = p.mouseY;

      // Set background color
      p.background(bgFill.r, bgFill.g, bgFill.b);

      // Update all behaviour of rectangle
      titleRectangle.update();

      // Update circle behaviour
      pulsatingCircle.update();

      // Update behaviour of letters
      for (let i = 0; i < letters.length; i++) {
        letters[i].update();
      }

      // If mouse clicked on circle, release drop
      if (pulsatingCircle.overlapsWith(mouse) && p.mouseIsPressed) {
        drop.release = true;
      }

      // If time to release drop, update drop behaviour
      if (drop.release) {
        drop.update();
      }

      // If drop overlaps with circle, make circle expand throughout entire canvas
      if (pulsatingCircle.overlapsWith(drop)) {
        pulsatingCircle.expandAllTheWay();
      }

      // If circle exceeds rectangle height, switch states
      if (
        pulsatingCircle.size.current > titleRectangle.height &&
        state === `title`
      ) {
        morning();
      }
    };
  };

  let myp5Title = new p5(instance1Sketch);
}
