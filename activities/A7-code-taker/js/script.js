/**
Code Tacker
Sharon Ku

The user is the Tom-Hanks-in-the-Da-Vinci-Code of classic poetry, seeing coded messages in poems. The user reads a poem and searches it with their mouse to uncover special letters. If they drag the letters in the correct order into a special solution area, they crack the code!
*/

"use strict";

// Created solved dialog box
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
  $(this).addClass(`found`, 500);
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

    // Check if answer is right
    if ($(this).text() === "Theremin") {
      // Open solved dialog box if answer correct
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
