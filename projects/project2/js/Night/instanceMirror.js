// Instance: Mirror canvas
//
// Attribution for Face API code: https://editor.p5js.org/ml5/sketches/FaceApi_Video_Landmarks

function createMirrorCanvas() {
  let instanceMirrorSketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Background fill
    let bgFill = {
      r: 0,
      g: 0,
      b: 0,
    };

    // Used for ml5 -----------------------
    // Faceapi object
    let faceapi = undefined;
    // The user's webcam
    let video = undefined;
    // Store all detections
    let detections;

    // Modifying detection options (by default, they are set to true)
    const detection_options = {
      withLandmarks: true,
      withDescriptors: false,
    };

    // Create canvas and objects
    p.setup = function () {
      // Create canvas
      let mirrorCanvas = p.createCanvas(300, 300);
      mirrorCanvas.parent(`mirror-canvas`);

      // load up user's video
      video = p.createCapture(p.VIDEO);
      video.size(p.width, p.height);
      video.hide(); // Hide the video element, and just show the canvas
      faceapi = ml5.faceApi(video, detection_options, p.modelReady);
      p.textAlign(p.RIGHT);
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      // p.background(bgFill.r, bgFill.g, bgFill.b);
    };

    p.modelReady = function () {
      console.log("ready!");
      console.log(faceapi);
      faceapi.detect(p.gotResults);
    };

    p.gotResults = function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      // console.log(result)
      detections = result;

      p.background(0, 0, 0);
      // image(video, 0,0, width, height)
      if (detections) {
        if (detections.length > 0) {
          // console.log(detections);
          // p.drawBox(detections);
          p.drawLandmarks(detections);
        }
      }
      faceapi.detect(p.gotResults);
    };

    p.drawBox = function (detections) {
      for (let i = 0; i < detections.length; i++) {
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x;
        const y = alignedRect._box._y;
        const boxWidth = alignedRect._box._width;
        const boxHeight = alignedRect._box._height;

        p.noFill();
        p.stroke(161, 95, 251);
        p.strokeWeight(2);
        p.rect(x, y, boxWidth, boxHeight);
      }
    };

    p.drawLandmarks = function () {
      p.noFill();
      p.stroke(161, 95, 251);
      p.strokeWeight(2);

      console.log(detections[0].parts.mouth);

      for (let i = 0; i < detections.length; i++) {
        const mouth = detections[i].parts.mouth;
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;

        // p.drawPart(mouth, true);
        // p.drawPart(nose, false);
        // p.drawPart(leftEye, true);
        // p.drawPart(leftEyeBrow, false);
        // p.drawPart(rightEye, true);
        // p.drawPart(rightEyeBrow, false);
      }

      // Get mouth position
      let mouthPosition = detections[0].parts.mouth;

      // Set x position and width of mouth
      let leftXPosition = mouthPosition[0]._x;
      let rightXPosition = mouthPosition[6]._x;
      let mouthWidth = rightXPosition - leftXPosition;

      // Set y position and height of mouth
      let bottomYPosition = mouthPosition[2]._y;
      let topYPosition = mouthPosition[9]._y;
      let mouthHeight = topYPosition - bottomYPosition;

      // Draw mouth as ellipse
      p.push();
      p.fill(255);
      p.noStroke();
      p.ellipse(
        mouthPosition[0]._x + mouthWidth / 2,
        mouthPosition[0]._y + mouthHeight / 2 - 5,
        mouthWidth,
        mouthHeight
      );
      p.pop();
    };

    p.drawPart = function (feature, closed) {
      p.beginShape();
      for (let i = 0; i < feature.length; i++) {
        const x = feature[i]._x;
        const y = feature[i]._y;

        // console.log(y);
        // console.log(`yes`);
        p.vertex(x, y);
      }

      if (closed === true) {
        p.endShape(p.CLOSE);
      } else {
        p.endShape();
      }
    };
  };

  let myp5Mirror = new p5(instanceMirrorSketch);
}
