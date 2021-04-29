# Artist Statement: Fogdog

## Sharon Ku

Fogdog is an interactive game about a little circular character named Kay. Kay follows a routine each day: waking up in the morning to check emails, heading to work, doing tasks at work while being judged harshly by Peep the bird, then going home at night and spending some quality time saying affirmations out loud.

My goal is to have the user dive into the world of Kay and experience different interactions that enable them to feel part of the story. For instance, I programmed Kay to be shown through a mirror in the morning and night scenes. Mirror Kay actually mirrors the user’s face! Also, I asked my brother to voice Ladi and Peep so that the characters feel more alive. Clicking on the buttons of the dialogs triggers different events.

For the idea and aesthetics, I was largely inspired by Yoasobi’s music video, Halzion: https://www.youtube.com/watch?v=kzdJkT4kp-A&ab_channel=Ayase%2FYOASOBI.

I incorporated many types of technologies, the main ones being p5.js, jQuery UI, and ml5.js’ FaceApi. I came across various technical challenges in the project. The first is working with p5.js instances and jQuery UI’s dialogs, because I had to figure how to organize my code and have multiple events happening at the same time. I did so by organizing the instances into separate JS files (though this resulted in an abundance of files! Sorry for making you check all of them, Pippin). I also placed the creation of dialogs into its own JS file. The challenge escalated when I had to work with objects from different instances interacting with each other, like Peep the bird and the task canvases. My solution to this was creating global variables that both Peep and the specific task-related canvas can use.

The next greatest feat was modifying FaceApi to execute the behaviour of the user and appearance of Kay. For this, I had to do some trial-and-error to pinpoint which face landmarks I should use to draw the facial features. The result is very fun to engage with, and it reinforces the fact that the user is Kay, the little guy in the mirror! I can imagine adding more filters later on to make the mirror scenes more surprising.

Finally, this project has come a long way. I am happy that the mirror person no longer looks like the evil witch from Snow White:

![Process Picture](/assets/images/process-pics/process1.png")
