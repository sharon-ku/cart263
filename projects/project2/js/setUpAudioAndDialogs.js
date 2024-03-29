// Load audio and create dialog boxes before story begins

// Ladi's speeches
let welcomeSpeech;
let neutralSpeech;
let madSpeech;
let happySpeech;

// Peep yell
let peepYell;

// Yay sound effect
let yaySFX;
let longerYaySFX;

// Sparkle
let sparkle;

// Relaxing music that plays for title, morning, goToWork, returnHome, and night
let relaxingBackgroundMusic;

// Resturant music that plays in work state
let restaurantBackgroundMusic;

// Load all sounds
function loadAudio() {
  // Relaxing music: ahhh peaceful
  relaxingBackgroundMusic = new Audio(
    `assets/sounds/relaxing-background-music.mp3`
  );
  relaxingBackgroundMusic.volume = 0.5;

  // Restaurant music: snap your fingers to this!
  restaurantBackgroundMusic = new Audio(
    `assets/sounds/restaurant-background-music.mp3`
  );
  restaurantBackgroundMusic.volume = 0.3;

  // Sparkle in title state
  sparkle = new Audio(`assets/sounds/sparkle.wav`);

  // Yay sound effect
  yaySFX = new Audio(`assets/sounds/yay.mp3`);

  // Longer yay sound effect for affirmations
  longerYaySFX = new Audio(`assets/sounds/longer-yay.mp3`);

  // Ladi's welcoming speech
  welcomeSpeech = new Audio(`assets/sounds/ladi-welcome.mp3`);

  // Ladi's feedback speeches
  neutralSpeech = new Audio(`assets/sounds/ladi-neutral.mp3`);
  madSpeech = new Audio(`assets/sounds/ladi-mad.mp3`);
  happySpeech = new Audio(`assets/sounds/ladi-happy.mp3`);

  // Peep's angry yell
  peepYell = new Audio(`assets/sounds/peep-angry.mp3`);
}

// CREATE ALL DIALOG BOXES -----------------------------
// Create internal dialog
function createInternalDialog() {
  $(`#internal-dialog`).dialog({
    // Set position of dialog based on window position
    position: {
      my: "center center",
      at: "center bottom",
      of: window,
    },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "700px",
    // Hide close button and change css of email dialog
    dialogClass: "no-close email",
  });
}

// Create Ladi's welcome dialog
function createLadiWelcomeDialog() {
  $(`#ladi-welcome-dialog`).dialog({
    // Set position of dialog based on window position
    position: {
      my: "center top",
      at: "left top+100",
      of: window,
    },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Change css of email dialog
    dialogClass: " email",
    // Stop playing audio if dialog is closed
    close: function () {
      welcomeSpeech.pause();
      welcomeSpeech.currentTime = 0;
    },
  });
}

// Create Ladi's feedback dialog
function createLadiFeedbackDialog() {
  $(`#ladi-feedback-dialog`).dialog({
    // Set position of dialog based on window position
    position: {
      my: "center top",
      at: "left top+100",
      of: window,
    },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Change css look
    dialogClass: "email",
  });
}

// Create an email dialog
function createEmailDialog() {
  $(`#email-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Don't open automatically
    autoOpen: false,
    // Hide close button and change css of email dialog
    dialogClass: "no-close email",
    // Button options
    buttons: {
      Save: function () {
        $(this).dialog(`close`);
        $(`#workout-dialog`).dialog(`open`);
      },
      Delete: function () {
        $(`#workout-dialog`).dialog(`open`);
        $(this).dialog(`close`);
      },
    },
  });
}

// Create an workout dialog
function createWorkoutDialog() {
  $(`#workout-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Don't open automatically
    autoOpen: false,
    // Hide close button and change css of workout dialog
    dialogClass: "no-close email",
    // Button options
    buttons: {
      Yes: function () {
        $(this).dialog(`close`);
        // Change internal dialog text
        changeInternalDialogText(
          `Maybe another day. I don't feel like it today.`
        );
        // Open question dialog
        $(`#go-to-work-question-dialog`).dialog(`open`);
      },
      No: function () {
        $(this).dialog(`close`);
        // Change internal dialog text
        changeInternalDialogText(`Today's not the day.`);
        // Open question dialog
        $(`#go-to-work-question-dialog`).dialog(`open`);
      },
    },
  });
}

// Create go-to-work-question dialog
function createGoToWorkQuestionDialog() {
  $(`#go-to-work-question-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "300px",
    // Don't open automatically
    autoOpen: false,
    // Hide close button and change css of dialog
    dialogClass: "no-close email",
    // Button options
    buttons: {
      Yes: function () {
        // Close this dialog box
        $(this).dialog(`close`);
        // Cue goToWork state
        goToWork();
        // Hide current state
        $(`#morning-state`).hide();
        // Change internal dialog text
        changeInternalDialogText(`Off to work I go!`);
      },
      No: function () {
        // Change internal dialog text
        changeInternalDialogText(
          `I can't procrastinate today! I'm going to be late!`
        );
      },
    },
  });
}

// Create choose transportation dialog
function createChooseTransportationDialog() {
  $(`#choose-transportation-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Hide close button and change css of email dialog
    dialogClass: "no-close email",
    // Button options
    // buttons: {
    //   Save: function () {
    //     $(this).dialog(`close`);
    //     $(`#distraction-description`).text(`Tomorrow's going to be a good day`);
    //   },
    //   Delete: function () {
    //     $(this).dialog(`close`);
    //   },
    // },
  });
}

// Create to-do dialog
function createToDoDialog() {
  $(`#to-do-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+80 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Hide close button and change css of email dialog
    dialogClass: "no-close email",
  });
}

// Create sink dialog
function createSinkDialog() {
  $(`#sink-dialog`).dialog({
    // Hide close button
    dialogClass: "no-close",
    show: { effect: "fade", duration: 500 },
    // Set position of dialog based on window position
    position: { my: "center top", at: "center+50 top+150", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Set dialog buttons
    buttons: [
      {
        id: "pour-button",
        text: "Pour!",
        // When button is clicked:
        click: function () {
          // If sink is off:
          if (sinkState === `off`) {
            // Turn it on
            sinkState = `on`;
            // Update button text to "Stop!"
            $("#pour-button").button("option", "label", "Stop!");
          }
          // Else, if sink is on:
          else if (sinkState === `on`) {
            // Turn it off
            sinkState = `off`;
            // It's time to give feedback
            givingFeedbackForPouring = true;
            // Update button text to "Pour!"
            $("#pour-button").button("option", "label", "Pour!");
          }
        },
      },
    ],
  });
}

// Create food delivery dialog
function createFoodDeliveryDialog() {
  $(`#food-delivery-dialog`).dialog({
    // Hide close button
    dialogClass: "no-close",
    show: { effect: "fade", duration: 500 },
    // Set position of dialog based on window position
    position: { my: "left+500 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Button options
    buttons: [
      {
        id: "start-delivering-button",
        text: "Start delivering!",
        // When button is clicked:
        click: function () {
          // Initiate game
          deliveryGame = `play`;
          // Hide button
          $("#start-delivering-button").hide();
        },
      },
    ],
  });
}

// Create return-home-question dialog
function createReturnHomeQuestionDialog() {
  $(`#return-home-question-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Hide close button and change css of dialog
    dialogClass: "no-close email",
    // Button options
    buttons: {
      "I agree": function () {
        // Switch to returnHome state and hide work-state
        $(`#work-state`).hide();
        $(this).dialog(`close`);
        returnHome();
      },
    },
  });
}

// Create affirmations dialog
function createAffirmationsDialog() {
  $(`#affirmations-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Hide close button and change css of email dialog
    dialogClass: "no-close email",
  });
}

// Create say goodnight dialog
function createSayGoodnightDialog() {
  $(`#say-goodnight-dialog`).dialog({
    // Set position of dialog based on window position
    position: { my: "left+100 top+100", at: "left top", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
    // Don't open automatically
    autoOpen: false,
    // Hide close button and change css of email dialog
    dialogClass: "no-close",
    // Button options
    buttons: {
      Goodnight: function () {
        $(this).dialog(`close`);
        $(`#internal-dialog`).dialog("close");
        // Make night state fade out
        $(`#night-state`).fadeOut(5000, function () {
          // // Set switch day to true
          // switchDay = true;
          // // Update state
          // morning();

          // Let end text fade in
          $(`#end-text`).text(`A little star shines brightly in the sky.`);
          $(`#end-text`).fadeIn(1000);
        });
      },
    },
  });
}

// Create a congratulations dialog
function createCongratulationsDialog() {
  $(`#congratulations-dialog`).dialog({
    // Do not let user interact with anything else on page until dialog closed
    modal: true,
    // Don't open automatically
    autoOpen: false,
    // Hide close button
    dialogClass: "no-close",
    show: { effect: "fade", duration: 300 },
    // Set position of dialog based on window position
    position: { my: "center center", at: "center top+200", of: window },
    // Adjust size of dialog box based on content it stores
    height: "auto",
    width: "auto",
  });
}
