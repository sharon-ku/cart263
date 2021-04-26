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

    // Landmark stroke color
    const LANDMARK_STROKE_FILL = {
      r: 241,
      g: 142,
      b: 48,
    };

    // Landmark stroke weight
    const LANDMARK_STROKE_WEIGHT = 2;

    // Body objects inside mirror
    let mirrorHead = undefined;
    let mirrorMouth = undefined;
    let leftEye = undefined;
    let rightEye = undefined;

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

      // Create new head in mirror
      mirrorHead = new MirrorHead(p);

      // Create new mouth
      mirrorMouth = new MirrorMouth(p);

      // Create new left eye
      const LEFT_EYE_X_OFFSET = -5;
      const LEFT_EYE_Y_OFFSET = 15;
      leftEye = new MirrorEye(p, LEFT_EYE_X_OFFSET, LEFT_EYE_Y_OFFSET);

      // Create new right eye
      const RIGHT_EYE_X_OFFSET = 5;
      const RIGHT_EYE_Y_OFFSET = 15;
      rightEye = new MirrorEye(p, RIGHT_EYE_X_OFFSET, RIGHT_EYE_Y_OFFSET);
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
          // Update behaviour of body parts
          mirrorHead.update(detections);
          mirrorMouth.update(detections);

          let leftEyePosition = detections[0].parts.leftEye;
          leftEye.update(detections, leftEyePosition);

          let rightEyePosition = detections[0].parts.rightEye;
          rightEye.update(detections, rightEyePosition);

          // p.drawBox(detections);
          // p.drawHead(detections);
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
      p.stroke(
        LANDMARK_STROKE_FILL.r,
        LANDMARK_STROKE_FILL.g,
        LANDMARK_STROKE_FILL.b
      );
      p.strokeWeight(LANDMARK_STROKE_WEIGHT);

      // console.log(detections[0].parts.mouth);

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
        p.drawPart(leftEyeBrow, false);
        // p.drawPart(rightEye, true);
        p.drawPart(rightEyeBrow, false);
      }
    };

    p.drawPart = function (feature, closed) {
      p.beginShape();
      for (let i = 0; i < feature.length; i++) {
        const x = feature[i]._x;
        const y = feature[i]._y;
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
