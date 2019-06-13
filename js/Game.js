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
      new Phrase('Professor Brian Cox'),
      new Phrase('Sir David Attenborough'),
      new Phrase('Chris Packham'),
      new Phrase('Charles Darwin'),
      new Phrase('Steve Irwin')
    ];
    return phrases;
  }

  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  startGame() {
    this.resetGame();
    const overlay = document.getElementById('overlay').style.display = 'none';
    const randomPhrase = game.getRandomPhrase();
    randomPhrase.addPhraseToDisplay();
    this.activePhrase = randomPhrase;
  }

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
