/**
Desperately Seeking Sadness
Sharon Ku

We will create metaphor for how we seek out or are drawn to negative emotions.
This will be in the form of a spaceship in a kind of asteroid field! Obvi!
The user will fly around as an emoji, seeking out the single “thumbs down” in a sea of “thumbs ups”.
When they find it, another one will appear somewhere else and the sad saga continues.

SOUND SOURCES ----
Background music:
Unexpected Distress by onlymeith (c) copyright 2020 Licensed under a Creative Commons Attribution Noncommercial  (3.0) license. http://dig.ccmixter.org/files/onlymeith/61318 Ft: Carosone

Arcade sound effect:
Arcade retro game over
https://mixkit.co/free-sound-effects/

*/

"use strict";

// This JavaScript object configurse our Phaser 3 game
let config = {
  // Set display type
  type: Phaser.AUTO,
  // Set canvas size
  width: 1000,
  height: 500,
  // Set physics engine
  physics: {
    default: "arcade",
  },
  // Scenes to load
  scene: [Boot, Title, Play],
};

// Create game using configuration
let game = new Phaser.Game(config);
