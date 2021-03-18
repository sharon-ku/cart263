/**
Activity 6: Raving Redactionist
Sharon Ku

We will create a webpage of text with some passages “redacted” (covered in black bars).
Over time the redactions will disappear, revealing the shocking secret text beneath them.
The user is in charge of keeping the information secret, so they click the secret text to restore the redaction
*/

"use strict";

// Code goes here

/* When user clicks on redacted text, re-redact the text */
$(`.redacted`).on(`click`, function (event) {
  $(this).css(`background`, `black`);
  $(this).css(`user-select`, `none`);
});
