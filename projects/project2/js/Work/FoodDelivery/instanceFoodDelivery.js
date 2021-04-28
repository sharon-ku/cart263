// Instance: Food delivery canvas
//
// Set to `play` if the delivery game started
let deliveryGame = `stop`;

// Create food delivery canvas
function createFoodDeliveryCanvas() {
  let instanceFoodDeliverySketch = function (p) {
    // Mouse
    let mouse = {
      // position
      x: undefined,
      y: undefined,
      // size
      size: 20,
      // color
      fill: 255,
    };

    // Background color: green
    const BG_FILL = {
      r: 201,
      g: 233,
      b: 168,
    };

    // Customers
    let customers = [];
    // Number of customers
    const NUM_CUSTOMERS = 40;

    // Kay the deliverer
    let deliverer = undefined;
    // Store deliverer images here
    let delivererImages = [];
    // Number of deliverer images
    const NUM_DELIVERER_IMAGES = 2;

    // Number of plates to deliver
    const TOTAL_PLATES = 5;
    // Number of plates sent out
    let numPlatesSentOut = 0;
    // True if time to update numPlatesSentOut
    let updateNumPlates = false;
    // Store previous table number delivered to
    let previousTableDelivered = undefined;

    // Image of plate
    let plateImage = undefined;

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

    // True if time to choose random table
    let chooseNewTable = false;

    // Preload assets
    p.preload = function () {
      // Load deliverer images
      for (let i = 0; i < NUM_DELIVERER_IMAGES; i++) {
        let delivererImage = p.loadImage(
          `assets/images/sceneObjects/deliverer${i}.png`
        );
        delivererImages.push(delivererImage);
      }

      // Load plate image
      plateImage = p.loadImage(`assets/images/sceneObjects/baby-plate.png`);
    };

    // Create canvas and objects
    p.setup = function () {
      // Create canvas
      let foodDeliveryCanvas = p.createCanvas(500, 400);
      foodDeliveryCanvas.parent(`food-delivery-canvas`);

      // Make customers
      for (let i = 0; i < NUM_CUSTOMERS; i++) {
        let customer = new Customer(p);
        customers.push(customer);
      }

      // Make deliverer
      deliverer = new Deliverer(p, delivererImages);

      // Create new tables by iterating through the columns, then through the rows
      for (let i = 0; i < NUM_TABLE_COLUMNS; i++) {
        for (let j = 0; j < NUM_TABLE_ROWS; j++) {
          // Calculate x value of table
          let x = FIRST_TABLE_X + X_DISTANCE_BTW_TABLES * i;
          // Calculate y value of table
          let y = FIRST_TABLE_Y + Y_DISTANCE_BTW_TABLES * j;
          // With the power of math and anime, I calculated the table number using this formula:
          let tableNumber = 3 * i + j + 1;
          // Create new table
          let table = new Table(p, x, y, tableNumber, plateImage);
          // Push to tables array
          tables.push(table);
        }
      }

      // Choose random table to deliver food to
      chooseNewTable = true;
    };

    // Set mouse positions, set background color, update all behaviour of objects
    p.draw = function () {
      // Set background color
      p.background(BG_FILL.r, BG_FILL.g, BG_FILL.b);

      // Set mouse x and y positions
      mouse.x = p.mouseX;
      mouse.y = p.mouseY;

      // Update behaviour of table
      for (let i = 0; i < tables.length; i++) {
        tables[i].update();
      }

      // Look out for when it's time to choose a new table
      p.chooseRandomTable();

      // If game is playing:
      if (deliveryGame === `play`) {
        // Update behaviour of customers
        for (let i = 0; i < customers.length; i++) {
          customers[i].update();
        }

        // Replace cursor with circle
        p.push();
        p.fill(mouse.fill);
        p.noStroke();
        p.ellipse(mouse.x, mouse.y, mouse.size);
        p.noCursor();
        p.pop();

        // Update behaviour of deliverer
        deliverer.update(mouse);

        for (let i = 0; i < customers.length; i++) {
          if (deliverer.intersects(customers[i])) {
            console.log(`touche`);
            // Deliverer drops the food (switch images)
            deliverer.spillsFood();

            // Reset deliverer and update numPlatesSentOut
            p.resetDeliverer();

            // Remove points
            gameScore -= scoreDecreaseRate;
          }
        }

        if (deliverer.intersects(tables[tableToDeliver - 1])) {
          let table = tables[tableToDeliver - 1];

          // Randomize plate position and create a new plate
          table.randomizePlatePosition();
          table.timeToCreatePlate = true;
          console.log(`reached table!`);

          // Choose random table to deliver food to
          chooseNewTable = true;

          // Deliverer delivers the food successfully!
          deliverer.deliversFood();

          // Reset deliverer and update numPlatesSentOut
          setTimeout(() => {
            p.resetDeliverer();
          }, 1000);

          // Add points
          gameScore += scoreIncreaseRate;
        }

        // Update numPlates sent out
        if (updateNumPlates) {
          numPlatesSentOut++;
          updateNumPlates = false;

          if (numPlatesSentOut === TOTAL_PLATES) {
            console.log(`DONE!!!`);
            // getFeedbackFromBoss();

            // 1 less task to do!
            // Mark task is completed
            taskCompleted = true;
            // Remove a task
            removeATask();
          }
        }
      }
    };

    // Reset deliverer and udpate numPlates
    p.resetDeliverer = function () {
      deliverer.reset();

      // Update numPlatesSentOut
      updateNumPlates = true;
    };

    // Choose random table to deliver food to
    p.chooseRandomTable = function () {
      if (chooseNewTable) {
        tableToDeliver = Math.floor(1 + Math.random() * tables.length);
        $(`#table-number`).text(`${tableToDeliver}`);
        // No longer time to choose new table
        chooseNewTable = false;
      }
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
    // Button options
    buttons: {
      "Start delivering!": function () {
        deliveryGame = `play`;
      },
    },
  });
}
