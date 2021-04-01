/**
Project 2 Prototype
Sharon Ku

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let backgroundFill = {
  r: 0,
  g: 0,
  b: 0,
};

// Acknowledgement: Pippin Barr helped with the code for setting up several p5.js instances.

// Create title canvas
let sketch = function (p) {
  let x = 100;
  let y = 100;

  p.setup = function () {
    let titleCanvas = p.createCanvas(300, 410);
    titleCanvas.parent(`title-canvas`);
  };

  p.draw = function () {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

let myp5 = new p5(sketch);

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
  // Do not let user interact with anything else on page until dialog closed
  modal: true,
  // Set position of dialog based on window position
  position: { my: "left+500 top+100", at: "left top", of: window },
  // Adjust size of dialog box based on content it stores
  height: "auto",
  width: "auto",
});

// Create a title dialog
$(`#title-dialog`).dialog({
  // Do not let user interact with anything else on page until dialog closed
  modal: true,
  // Set position of dialog based on window position
  position: { my: "left+100 top+300", at: "left top", of: window },
  // Adjust size of dialog box based on content it stores
  height: "auto",
  width: "auto",
});
