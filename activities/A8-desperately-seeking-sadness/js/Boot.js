class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot",
    });
  }

  // Preload assets
  preload() {
    // Load assets here!

    // Switch to the scene with the key of "play" once loaded
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  // Setup
  create() {}

  // Update
  update() {}
}
