/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

 /**
  * Creates phrases for use in game
  * @return {array} An array of phrases that could be used in the game
  */
  createPhrases() {
    const phrases = [
      new Phrase('The lead car is unique except for the one behind which is identical'),
      new Phrase('There is nothing wrong with the car except that it is on fire'),
      new Phrase('And now excuse me while I interrupt myself'),
      new Phrase('This will be Williams first win since the last time a Williams won'),
      new Phrase('And the first five places are filled by five different cars')
    ];

    return phrases;
  }

  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  startGame() {
    const overlay = document.getElementById('overlay').style.display = 'none';
    const randomPhrase = game.getRandomPhrase();
    randomPhrase.addPhraseToDisplay();
    this.activePhrase = randomPhrase;
  }

  handleInteraction() {

  }

  removeLife() {
    const lives = document.querySelectorAll('.tries');
    lives[this.missed].firstElementChild.setAttribute('src', 'images/lostHeart.png');
    this.missed += 1;
    if(this.missed > 4) {
      this.gameOver(false);
    }
  }

  checkForWin() {
    let hideCount = 0;
    const letters = document.querySelectorAll('.letter');
    for(let i = 0; i < letters.length; i++) {
      if(letters[i].classList.contains('hide')) {
        hideCount += 1;
      }
    }
    if(hideCount > 0) {
      return false;
    } else {
      return true;
    }
  }

  gameOver(gameWon) {
    const overlay = document.getElementById('overlay');
    const message = document.getElementById('game-over-message');
    if(gameWon) {
      message.textContent = 'Great job!';
      overlay.className = 'win';
    } else {
      message.textContent = 'Sorry, better luck next time!';
      overlay.className = 'lose';
    }
    overlay.style.display = 'block';
  }
}
