'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
console.log(player0, player1);
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

const generateRandomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

let scores, totalScores, activePlayer, playing;
const init = function () {
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0, 0];
  totalScores = [0, 0];
  activePlayer = 0;
  playing = true;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

rollBtn.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    let dice = generateRandomNumber();

    // 2. Display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // 3. Check if roll === 1
    if (dice !== 1) {
      // Add dice to current score
      scores[`${activePlayer}`] += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        scores[`${activePlayer}`];
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to total score

    totalScores[`${activePlayer}`] += scores[`${activePlayer}`];
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[`${activePlayer}`];
    //2. Check if player's total score is >= 100
    if (totalScores[`${activePlayer}`] >= 100) {
      // Finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Switch to the next player
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  scores[`${activePlayer}`] = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
