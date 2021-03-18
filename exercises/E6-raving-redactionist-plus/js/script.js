/**
Exercise 6: Raving Redactionist
Sharon Ku

We will create a webpage of text with some passages “redacted” (covered in black bars).
Over time the redactions will disappear, revealing the shocking secret text beneath them.
The user is in charge of keeping the information secret, so they click the secret text to restore the redaction
*/

"use strict";

// When user clicks on redacted text, re-redact the text
$(`.top-secret`).on(`click`, function (event) {
  // Remove the revealed class
  $(this).removeClass(`revealed`);
  // Add the redacted class
  $(this).addClass(`redacted`);
});

// Remove redacted class over time
setInterval(revelation, 500);

// Attempt revealing the redacted text
function revelation() {
  $(`.redacted`).each(attemptReveal);
}

// Attempt a hack
function attemptReveal() {
  // Hack succeeds 10% of the time
  if (Math.random() < 0.1) {
    // Remove the redacted class
    $(this).removeClass(`redacted`);
    // Add the revealed class
    $(this).addClass(`revealed`);

    // If all spans in the page have been revealed, then switch document text
    if ($(`.revealed`).length === $(`.top-secret`).length) {
      setInterval(showDefeatText, 1000);
    }
  }

  // Show defeat text
  function showDefeatText() {
    $(`#secret-document`).html(
      `<p id="defeat-text">YOU LOST THE COLD WAR!!</p>`
    );
  }
}
