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

    // Set x and y position for thumbs down
    let thumbsDown = {
      x: undefined,
      y: undefined,
    };
    // Assign random x and y positions to thumbs down
    this.setRandomPosition(thumbsDown);

    // Create the thumbs down
    this.sadness = this.physics.add.sprite(
      thumbsDown.x,
      thumbsDown.y,
      `thumbs-down`
    );

    // Create the thumbs up
    this.happiness = this.physics.add.group({
      key: `thumbs-up`,
      quantity: 120,
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50,
    });
    // Get all children of happiness group and put them in random position somewhere inside rectangle defined by canvas
    Phaser.Actions.RandomRectangle(
      this.happiness.getChildren(),
      this.physics.world.bounds
    );

    // Deal with collision between avatar and happiness
    this.physics.add.collider(this.avatar, this.happiness);

    // Deal with collision between happiness group and itself
    this.physics.add.collider(this.happiness, this.happiness);

    // Check for overlap between avatar and sadness
    this.physics.add.overlap(
      this.avatar,
      this.sadness,
      this.getSad,
      null,
      this
    );

    // Create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // Sets random position to provided subject
  setRandomPosition(subject) {
    subject.x = Math.random() * this.sys.canvas.width;
    subject.y = Math.random() * this.sys.canvas.height;
  }

  // Reset sadness position
  getSad(avatar, sadness) {
    this.setRandomPosition(sadness);
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
