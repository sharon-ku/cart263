/**
Code Tacker
Sharon Ku

The user is the Tom-Hanks-in-the-Da-Vinci-Code of classic poetry, seeing coded messages in poems. The user reads a poem and searches it with their mouse to uncover special letters. If they drag the letters in the correct order into a special solution area, they crack the code!

Poem: Encounter by Amanda Jernigan

Music:
Warm Duck Shuffle by arnebhus | https://soundcloud.com/arnebhus
Creative Commons Attribution 3.0 Unported License
https://creativecommons.org/licenses/by/3.0/deed.en_US

*/

"use strict";

// Duration of animation to apply `found` class to secret letter
const FOUND_ANIMATION_DURATION = 500;

// Correct secret message
const CORRECT_ANSWER = "baby in space";
const FIRST_WORD = "baby";
const FIRST_TWO_WORDS = "baby in";

// Victory music
const VICTORY_MUSIC = new Audio("assets/sounds/warm-duck-shuffle.mp3");

// Create instructions dialog box
$(`#instructions`).dialog({
  // Buttons on dialog
  buttons: {
    "YES! ALLONS-Y! LET'S GO!": function () {
      $(this).dialog(`close`);
    },
    "Meh, maybe another day.": function () {
      $(this).dialog(`close`);
    },
  },
});

// Create solved dialog box
$(`#solved-dialog`).dialog({
  // Do not show dialog by default
  autoOpen: false,
  // Button on dialog
  buttons: {
    "I know.": function () {
      $(this).dialog(`close`);
    },
  },
});

// When mouse hovers over secret letter:
$(`.secret`).one(`mouseover`, function (event) {
  // Add `found` class to secret element that is animated
  $(this).addClass(`found`, FOUND_ANIMATION_DURATION);
  // Make secret element draggable
  $(this).draggable({
    // Clone the letter being dragged
    // Note: clone disappears when drag is released
    helper: `clone`,
  });
});

// Defines what happens when letter dropped in answer box
$(`#answer`).droppable({
  drop: function (event, ui) {
    let letter = ui.draggable.text();
    // Add letter to box
    $(this).append(letter);
    // Disable draggable function of poem letter
    ui.draggable.draggable(`disable`);
    // Remove found class from poem letter
    ui.draggable.removeClass(`found`);

    // Add space between each word
    if ($(this).text() === FIRST_WORD || $(this).text() === FIRST_TWO_WORDS) {
      $(this).append(" ");
    }

    // Check if answer is right
    if ($(this).text() === CORRECT_ANSWER) {
      // Open solved dialog box if answer correct
      $(`#solved-dialog`).dialog(`open`);
      // Play victory music
      VICTORY_MUSIC.play();
    }
  },
});
