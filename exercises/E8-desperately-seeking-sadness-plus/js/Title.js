class Title extends Phaser.Scene {
  constructor() {
    super({
      key: "title",
    });
  }

  // Setup
  create() {
    // Obtaining canvas's center positions
    const canvasCenter = {
      x: this.cameras.main.worldView.x + this.cameras.main.width / 2,
      y: this.cameras.main.worldView.y + this.cameras.main.height / 2,
    };

    // Create title text
    this.createTitleText(canvasCenter);

    // Add play button
    this.createPlayButton(canvasCenter);

    // // Learned how to create rectangle from this example: https://phaser.io/examples/v3/view/game-objects/shapes/rectangle
    // // Learned how to create filled and rounded rectangle: https://phaser.io/examples/v3/view/game-objects/graphics/fill-rounded-rectangle
    // // // Set rectangular button properties
    // // let rectProperties = {
    // //   x: canvasCenter.x,
    // //   y: canvasCenter.y + 50,
    // //   width: 200,
    // //   height: 100,
    // //   fill: 0x6666ff,
    // // };
    // // // Create rectangular button
    // // let button = this.add.rectangle(
    // //   rectProperties.x,
    // //   rectProperties.y,
    // //   rectProperties.width,
    // //   rectProperties.height,
    // //   rectProperties.fill
    // // );
    //
    // let roundedRect = {
    //   x: canvasCenter.x,
    //   y: canvasCenter.y,
    // };
    //
    // let button = this.add.graphics();
    //
    // button.fillStyle(0x6666ff, 1);
    //
    // button.fillRoundedRect(canvasCenter.x, canvasCenter.y, 400, 200, 32);
    //
    // // Make button interactive
    // button.setInteractive();
    //
    // // Learned how to implement button function: https://phaser.io/examples/v3/view/physics/arcade/restart-physics-scene
    // // Once button clicked on, switch scene to play
    // button.once(
    //   "pointerup",
    //   function () {
    //     this.scene.start(`play`);
    //   },
    //   this
    // );
  }

  // Create title text
  createTitleText(canvasCenter) {
    // Properties for title text
    let titleText = {
      // position offset from center of canvas
      xOffset: 0,
      yOffset: -100,
      // text string
      string: `Desperately Seeking Sadness`,
      // string style
      style: {
        fontFamily: `sans-serif`,
        fontSize: `50px`,
        fill: `#FFFFFF`,
        align: `center`,
      },
    };

    // Add title text
    this.title = this.add
      .text(
        canvasCenter.x + titleText.xOffset,
        canvasCenter.y + titleText.yOffset,
        titleText.string,
        titleText.style
      )
      .setOrigin(0.5);

    // Make title blink
    this.tweens.add({
      targets: this.title,
      alpha: 0.4,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  // Create play button
  createPlayButton(canvasCenter) {
    // Properties for title text
    let playProperties = {
      // position offset from center of canvas
      xOffset: 0,
      yOffset: 50,
      // text string
      string: `Play`,
      // string style
      style: {
        fontFamily: `sans-serif`,
        fontSize: `50px`,
        fill: `#FFFFFF`,
        align: `center`,
        backgroundColor: "#ff00ff",
      },
      padding: 16,
    };

    // Learned how to add padding to text from here: https://phaser.io/examples/v3/view/game-objects/text/text-padding
    // Set properties for "Play" button text
    let playText = this.add
      .text(
        canvasCenter.x + playProperties.xOffset,
        canvasCenter.y + playProperties.yOffset,
        playProperties.string,
        playProperties.style
      )
      .setOrigin(0.5)
      .setPadding(playProperties.padding);

    // Make button interactive
    playText.setInteractive();

    // Learned how to implement button function: https://phaser.io/examples/v3/view/physics/arcade/restart-physics-scene
    // Once button clicked on, switch scene to play
    playText.once(
      "pointerup",
      function () {
        this.scene.start(`play`);
      },
      this
    );

    // Animate "Play" button to change sizes
    this.tweens.add({
      targets: playText,
      scaleX: 0.8,
      scaleY: 0.9,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  // Update
  update() {}
}
