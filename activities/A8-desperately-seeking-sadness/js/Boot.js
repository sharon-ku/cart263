class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot",
    });
  }

  // Preload assets + switch scene when loaded
  preload() {
    // Load assets here!
    this.load.image(`avatar`, `assets/images/avatar.png`);

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
