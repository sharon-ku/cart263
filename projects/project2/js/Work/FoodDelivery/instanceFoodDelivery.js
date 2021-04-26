// Instance: Food delivery canvas
//
function createFoodDeliveryCanvas() {
  let instanceFoodDeliverySketch = function (p) {
    // Mouse position
    let mouse = {
      x: undefined,
      y: undefined,
    };

    // Tables
    let tables = [];
    const NUM_TABLES = 6;

    const FIRST_TABLE_X = 100;
    const X_DISTANCE_BTW_TABLES = 300;

    const FIRST_TABLE_Y = 75;
    const Y_DISTANCE_BTW_TABLES = 120;

    const NUM_TABLE_COLUMNS = 2;
    const NUM_TABLE_ROWS = NUM_TABLES / NUM_TABLE_COLUMNS;

    // Table number to deliver food to
    let tableToDeliver = undefined;

    // Create canvas and objects
    p.setup = function () {
      // Create canvas
      let foodDeliveryCanvas = p.createCanvas(500, 400);
      foodDeliveryCanvas.parent(`food-delivery-canvas`);

      // // Create new tables
      // for (let i = 0; i < NUM_TABLES; i++) {
      //   let table = new Table(p);
      //   tables.push(table);
      // }
      // Create new tables
      for (let i = 0; i < NUM_TABLE_COLUMNS; i++) {
        for (let j = 0; j < NUM_TABLE_ROWS; j++) {
          let x = FIRST_TABLE_X + X_DISTANCE_BTW_TABLES * i;
          let y = FIRST_TABLE_Y + Y_DISTANCE_BTW_TABLES * j;
          let table = new Table(p, x, y);
          tables.push(table);
        }
      }

      // Choose random table to deliver food to
      p.chooseRandomTable();
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      p.background(0, 0, 0);

      // Update behaviour of table
      for (let i = 0; i < tables.length; i++) {
        tables[i].update();
      }
    };

    // Choose random table to deliver food to
    p.chooseRandomTable = function () {
      tableToDeliver = Math.floor(1 + Math.random() * tables.length);
      $(`#table-number`).text(`${tableToDeliver}`);
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
