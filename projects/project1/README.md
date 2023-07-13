# Project 1: Learn English for Food Lovers

## Play it!

https://sharon-ku.github.io/cart263/projects/project1/

## Artist Statement

The goal of this game is to teach Cantonese speakers how to pronounce 10 English words related to emotions.

My game is inspired by Charmy from the anime Black Clover. She professes her love for food day and night and always ensures that not a single crumb goes to waste. Whenever a foe puts her food in harm’s way, she quickly assumes the role of the food’s guardian. Given her adorable yet spunky personality, I thought it would be interesting to place someone like her in a teaching position and use her love for food as a motivational force in the game.

Thus, I created Fwoggy, an avid foodie born from Charmy’s characteristics. Her arch-nemesis, Kit Kat, accompanies her to her lessons and adds a layer of competitiveness to the learning experience.

My original intention was to make a simple flashcard game. However, combining Fwoggy’s character with the game's narrative opened up the opportunity to make the learning process feel more playful. I expanded the flashcard game to be a battle against Kit Kat to see who can eat the hamburger. The player must use the English vocabulary words to defend Fwoggy’s right to that juicy burger. I also created example sentences in the learn state based on food.

For the game, I was inspired by this scene in particular, where Charmy summons a gargantuan sheep to smash the witch because Charmy thought the witch wanted to steal her cake:
https://www.youtube.com/watch?v=FRMS7LErs98&ab_channel=CrunchyrollCollection

My main goal was to have the user practice pronouncing the English words. I achieved this goal by exploring different technologies and approaches, such as p5.js, ResponsiveVoice, annyang!, and JSON files. In the learn state, I used ResponsiveVoice as Fwoggy’s voice to say the words out loud and familiarize the players with the pronunciations. In the game state, I used annyang! to process what the user is saying. Each level is increasingly challenging with the addition of more cats (i.e. more vocabulary words to say in a limited amount of time). I also used JSON files to organize the vocabulary words with their corresponding Cantonese word and example sentences, and also to organize the cats’ positions in each game level.

The greatest challenge was dealing with different technologies together, like using JSON to sort the words and their corresponding sentence examples, then using ResponsiveVoice to say the text strings out loud. It was also challenging to program the chain of events that occur after the player says a correct or incorrect answer. For instance, when the answer is incorrect, I had to send the cat flying away and switch its appearance to a scaredy cat. Then, once the cat flew off the canvas, I had to update the number of lives.

I enjoyed making the end states interactive as well. In the victory state, the player has the opportunity to feed the flying hamburger to Fwoggy by controlling Fwoggy’s mouth movement. In the defeat state, Fwoggy faints after seeing the hamburger fly off to Hamburger Heaven.
