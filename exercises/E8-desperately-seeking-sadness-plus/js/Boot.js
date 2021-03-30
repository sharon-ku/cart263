class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot",
    });
  }

  // Preload assets + switch scene when loaded
  preload() {
    // Load assets here!
    // Load avatar image
    this.load.image(`avatar`, `assets/images/avatar.png`);
    // Load thumbs down image
    this.load.image(`thumbs-down`, `assets/images/thumbs-down.png`);
    // Load thumbs up image
    this.load.image(`thumbs-up`, `assets/images/thumbs-up.png`);
    // Load background music
    this.load.audio(
      `background-music`,
      `assets/sounds/unexpected-distress.mp3`
    );
    // Load arcade sound effect
    this.load.audio(`arcade`, "assets/sounds/arcade.wav");

    // Switch to the scene with the key of "play" once loaded
    this.load.on(`complete`, () => {
      this.scene.start(`title`);
    });
  }

  // Setup
  create() {}

  // Update
  update() {}
}
