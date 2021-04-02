/**
Project 2 Prototype
Sharon Ku

Experimenting with jQuery dialog and p5.js canvases
*/

"use strict";

// Attribution: Pippin Barr helped with the code for setting up several p5.js instances.

// -------------------------------------------------------------------
// Create welcome canvas
//
let sketch = function (p) {
  // Rectangle properties
  let rect = {
    // position
    x: undefined,
    y: undefined,
    // color
    fill: 255,
    // size + growth
    size: {
      current: 0,
      min: 0,
      max: 300,
      growthRate: {
        initial: 0.005,
        current: 0.005,
      },
      growthAcceleration: 0.01,
    },
  };

  // Background color: light purple
  let bgFill = {
    r: 240,
    g: 170,
    b: 255,
  };

  // Create canvas and set rectangle position
  p.setup = function () {
    // Create a welcome canvas
    let welcomeCanvas = p.createCanvas(300, 300);
    welcomeCanvas.parent(`welcome-canvas`);

    // Set rectangle position to center of canvas
    rect.x = p.width / 2;
    rect.y = p.height / 2;
  };

  // Set background color, draw and make rectangle grow
  p.draw = function () {
    // Set background color
    p.background(bgFill.r, bgFill.g, bgFill.b);

    // Draw rectangle
    p.drawRectangle();

    // Make rectangle grow
    p.rectangleGrows();
  };

  // Draw rectangle
  p.drawRectangle = function () {
    p.push();
    p.rectMode(p.CENTER);
    p.fill(rect.fill);
    p.rect(rect.x, rect.y, rect.size.current);
    p.pop();
  };

  // Make rectangle grow
  p.rectangleGrows = function () {
    // If rectangle has not reached max size yet
    if (rect.size.current < rect.size.max) {
      // Make rectangle grow on infinitely with speed and acceleration
      rect.size.growthRate.current += rect.size.growthAcceleration;
      rect.size.current += rect.size.growthRate.current;
    }
    // Else, if rectangle exceeds max size
    else {
      // Reset size
      rect.size.current = rect.size.min;
      // Reset growth rate
      rect.size.growthRate.current = rect.size.growthRate.initial;
    }
  };
};

let myp5 = new p5(sketch);

// -------------------------------------------------------------------
// Create intro canvas
let sketch2 = function (p) {
  let capture;

  p.setup = function () {
    let introCanvas = p.createCanvas(320, 240);
    capture = p.createCapture(p.VIDEO);
    capture.size(320, 240);
    capture.hide();
    introCanvas.parent(`intro-canvas`);
  };

  p.draw = function () {
    p.background(0);
    p.image(capture, 0, 0, 320, 240);
  };
};

let myp52 = new p5(sketch2);

// CREATE ALL DIALOG BOXES ----------------------------------------------------

// Create an intro dialog
$(`#intro-dialog`).dialog({
  // Set position of dialog based on window position
  position: { my: "left+100 top+100", at: "left top", of: window },
  // Adjust size of dialog box based on content it stores
  height: "auto",
  width: "auto",
});

// Create a welcome dialog
$(`#welcome-dialog`).dialog({
  // Hide close button
  dialogClass: "no-close",
  show: { effect: "fade", duration: 800 },
  // Do not let user interact with anything else on page until dialog closed
  modal: true,
  // Set position of dialog based on window position
  position: { my: "center center", at: "center top+200", of: window },
  // Adjust size of dialog box based on content it stores
  height: "auto",
  width: "auto",
  // Button options
  buttons: {
    "Don't mind if I do!": function () {
      $(this).dialog(`close`);
    },
  },
});
