/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
 class Phrase {
   constructor(phrase) {
     this.phrase = phrase.toLowerCase();
   }

   /**
    * Display phrase on game board
    */
   addPhraseToDisplay() {
     const ul = document.getElementById('phrase').firstElementChild;
     for (let i = 0; i < this.phrase.length; i++) {
       const letter = document.createElement('li');
       if(this.phrase[i] === " ") {
         letter.className = 'space';
       } else {
         letter.className = `hide letter ${this.phrase[i]}`;
       }
       letter.textContent = this.phrase[i];
       ul.appendChild(letter);
     }
   }

   /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
   checkLetter(letter) {
     let existsCount = 0;
     for(let i = 0; i < this.phrase.length; i++) {
       if(letter === this.phrase[i]) {
         existsCount += 1;
       }
     }
     if(existsCount > 0) {
       return true;
     } else {
       return false;
     }
   }

   /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
   showMatchedLetter(letter) {
     const matchedElements = document.querySelectorAll(`li.hide.letter.${letter}`);
     for (let i = 0; i < matchedElements.length; i++) {
        matchedElements[i].className = `show letter ${letter}`;
     }
   }

 }
