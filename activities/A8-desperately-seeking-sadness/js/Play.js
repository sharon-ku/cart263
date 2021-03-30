class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
    });
  }

  // Setup
  create() {
    // Create the avatar
    this.avatar = this.physics.add.sprite(100, 100, `avatar`);
    // Keep avatar trapped inside canvas
    this.avatar.setCollideWorldBounds(true);

    // Set random x and y position for thumbs down
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;

    // Create the thumbs down
    this.sadness = this.physics.add.sprite(x, y, `thumbs-down`);

    // Create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // Update
  update() {
    // Rotate avatar using left and right arrow keys
    if (this.cursors.left.isDown) {
      this.avatar.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.avatar.setAngularVelocity(150);
    } else {
      this.avatar.setAngularVelocity(0);
    }

    if (this.cursors.up.isDown) {
      // Using up arrow key, changes velocity of avatar based on current rotation
      this.physics.velocityFromRotation(
        this.avatar.rotation,
        200,
        this.avatar.body.acceleration
      );
    } else {
      this.avatar.setAcceleration(0);
    }
  }
}
