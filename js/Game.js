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
      new Phrase('Chris Packham'),
      new Phrase('Sir David Attenborough'),
      new Phrase('Charles Darwin'),
      new Phrase('Steve Irwin'),
      new Phrase('Steve Backshall')
    ];
    return phrases;
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    this.resetGame();
    const overlay = document.getElementById('overlay').style.display = 'none';
    const randomPhrase = game.getRandomPhrase();
    randomPhrase.addPhraseToDisplay();
    this.activePhrase = randomPhrase;
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(button) {
    button.disabled = true;
    const letter = button.textContent;
    if(this.activePhrase.checkLetter(letter) === false) {
      button.className = 'key wrong';
      this.removeLife();
    } else {
      button.className = 'key chosen';
      this.activePhrase.showMatchedLetter(letter);
      if(this.checkForWin()) {
        this.gameOver(true);
      }
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    const lives = document.querySelectorAll('.tries');
    lives[this.missed].firstElementChild.setAttribute('src', 'images/lostHeart.png');
    this.missed += 1;
    if(this.missed > 4) {
      this.gameOver(false);
    }
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't
  won
   */
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

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    const overlay = document.getElementById('overlay');
    const message = document.getElementById('game-over-message');
    if(gameWon) {
      message.textContent = 'Smile, you won!';
      overlay.className = 'win';
    } else {
      message.textContent = "Looks like you're not ready for this game!";
      overlay.className = 'lose';
    }
    overlay.style.display = 'block';
  }

  /**
   * Resets game
   */
  resetGame() {
    const ul = document.getElementById('phrase').firstElementChild;
    while(ul.firstElementChild) {
      ul.removeChild(ul.firstElementChild);
    }
    const letters = document.querySelectorAll('.key');
    for (let i = 0; i < letters.length; i++) {
      letters[i].className = 'key';
      letters[i].disabled = false;
    }
    const lives = document.querySelectorAll('.tries');
    for (let i = 0; i < lives.length; i++) {
      lives[i].firstElementChild.setAttribute('src', 'images/liveHeart.png');
    }
    this.missed = 0;
  }
}
