// Volume button that, when clicked, mutes background music

class VolumeButton extends Button {
  constructor(images) {
    super();
    // array of images
    this.images = images;
    // image index in array
    this.imageIndex = {
      current: 0,
      volumeOn: 0,
      volumeOff: 1,
    };
    // size
    this.width = 62;
    this.height = 60;
    // position
    this.x = width - 45;
    this.y = 60;
  }

  // Update all behaviour of button
  update(mouse) {
    // Display button image
    this.display();
  }

  // Display button image
  display() {
    push();
    imageMode(CENTER);
    image(this.images[this.imageIndex.current], this.x, this.y);
    pop();
  }

  // If volume button clicked, toggle between volume on and off
  mousePressed(mouse) {
    if (this.overlapsWith(mouse)) {
      // If music was at its max, then mute
      if (backgroundMusicVolume.current === backgroundMusicVolume.max) {
        backgroundMusicVolume.current = backgroundMusicVolume.min;
        // Set to "volume on" image
        this.imageIndex.current = this.imageIndex.volumeOff;
      }
      // Else, if music was muted, set it to max
      else {
        backgroundMusicVolume.current = backgroundMusicVolume.max;
        // Set to "volume off" image
        this.imageIndex.current = this.imageIndex.volumeOn;
      }
    }
  }
}
