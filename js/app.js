/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

//Starts new game when start game button is clicked
document.getElementById('btn__reset').addEventListener('click', () => {
  game = new Game();
  game.startGame();
});

//handleInteraction method is called when an onscreen letter is clicked
document.getElementById('qwerty').addEventListener('click', (e) => {
  if(e.target.className === 'key') {
    game.handleInteraction(e.target);
  }
});

//handleInteraction method is called when a keyboard letter is clicked
document.addEventListener('keydown', (e) => {
  if(e.keyCode > 64 && e.keyCode < 91) {
    const qwertyButtons = document.querySelectorAll('.key');
    for(let i = 0; i < qwertyButtons.length; i++) {
      const button = qwertyButtons[i];
      if(!button.disabled) {
        if(button.textContent === e.key) {
          game.handleInteraction(button);
        }
      }
    }
  }
});
