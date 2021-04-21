// Instance: Food delivery canvas
//
function createFoodDeliveryCanvas() {
  let instanceFoodDeliverySketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Create canvas and objects
    p.setup = function () {
      // Create canvas
      let foodDeliveryCanvas = p.createCanvas(300, 500);
      foodDeliveryCanvas.parent(`food-delivery-canvas`);
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      p.background(0, 0, 0);
    };
  };

  let myp5FoodDelivery = new p5(instanceFoodDeliverySketch);
}

// Create food delivery dialog
function createFoodDeliveryDialog() {
  $(`#food-delivery-dialog`).dialog({
    // Hide close button
    dialogClass: "no-close",
    show: { effect: "fade", duration: 500 },
    // Set position of dialog based on window position
    position: { my: "center center", at: "center center", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
  });
}
