/**
Exercise 6: Raving Redactionist
Sharon Ku

We will create a webpage of text with some passages “redacted” (covered in black bars).
Over time the redactions will disappear, revealing the shocking secret text beneath them.
The user is in charge of keeping the information secret, so they click the secret text to restore the redaction
*/

"use strict";

// DEFINING VARIABLES -------------------
// Number of leaked secrets (i.e. revealed secrets)
let numLeakedSecrets;

// Total number of secrets
const TOTAL_NUM_SECRETS = $(`.top-secret`).length;

// Probability that secret will be revealed (10% of the time)
const PROBABILITY_OF_SECRET_BEING_REVEALED = 0.1;

// Frequency of the revelation interval
const FREQUENCY_OF_THE_REVELATION_INTERVAL = 500;

// Delay before revealing defeat text
const DELAY_FOR_DEFEAT_TEXT = 5000;

// Text growth duration
const TEXT_GROWTH_DURATION = 2000;

// Text shrink duration
const TEXT_SHRINK_DURATION = 2000;
// -----------------------------------------

// Remove redacted class over time
setInterval(revelation, FREQUENCY_OF_THE_REVELATION_INTERVAL);

// Update number of leaked secrets counter
function updateNumLeakedSecrets() {
  // Set numLeakedSecrets to spans with class revealed
  numLeakedSecrets = $(`.revealed`).length;

  // Update string counter
  $(`#number-of-leaked-secrets`).text(
    `${numLeakedSecrets} / ${TOTAL_NUM_SECRETS}`
  );
}

// When user clicks on redacted text, re-redact the text
$(`.top-secret`).on(`click`, function (event) {
  // Make text decrease in size for 2 seconds
  $(this).animate(
    {
      "font-size": "1.25rem",
    },
    TEXT_SHRINK_DURATION
  );

  // Remove the revealed class
  $(this).removeClass(`revealed`);
  // Add the redacted class
  $(this).addClass(`redacted`);

  // Update number of leaked secrets counter
  updateNumLeakedSecrets();
});

// Attempt revealing the redacted text
function revelation() {
  $(`.redacted`).each(attemptReveal);
}

// Attempt a hack
function attemptReveal() {
  // Hack succeeds 10% of the time
  if (Math.random() < PROBABILITY_OF_SECRET_BEING_REVEALED) {
    // Make text increase in size for 2 seconds
    $(this).animate(
      {
        "font-size": "2rem",
      },
      TEXT_GROWTH_DURATION
    );

    // Remove the redacted class
    $(this).removeClass(`redacted`);
    // Add the revealed class
    $(this).addClass(`revealed`);

    // If all spans in the page have been revealed, then show defeat text
    if ($(`.revealed`).length === TOTAL_NUM_SECRETS) {
      setTimeout(showDefeatText, DELAY_FOR_DEFEAT_TEXT);
    }

    // Update number of leaked secrets counter
    updateNumLeakedSecrets();
  }

  // Show defeat text
  function showDefeatText() {
    $(`#secret-document`).html(
      `<p id="defeat-text">YOU LOST THE COLD WAR!!</p>`
    );
  }
}
