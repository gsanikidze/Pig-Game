//starting position
var table0,
  table1,
  diceContainer,
  counter,
  scores = [],
  dice,
  secondDice,
  randomNumberOne,
  randomNumberTwo,
  winnerScore,
  doubleSix,
  doubleActivePlayer;

// custome winner score
winnerScore = prompt("Final Score", 100);
if (winnerScore == null || winnerScore == "") {
  winnerScore = 100;
};
winnerScore = parseInt(winnerScore);

// change Player
function changePlayer() {
  counter === 0
    ? counter = 1
    : counter = 0;
}

// random numbers
  function genRandom(){
    randomNumberOne = Math.round(Math.random() * (6 - 1) + 1);
    randomNumberTwo = Math.round(Math.random() * (6 - 1) + 1);
  }


// hide dice
getElement('.dice').style.display = 'none';
getElement('.secondDice').style.display = 'none';

// get elements easy
function getElement(selector) {
  return document.querySelector(`${selector}`);
}

// reset game
function clean() {
  getElement(`#score-0`).innerHTML = 0;
  getElement(`#score-1`).innerHTML = 0;
  getElement(`#current-0`).innerHTML = 0;
  getElement(`#current-1`).innerHTML = 0;
  diceContainer = 0;
  scores[0] = 0;
  scores[1] = 0;
  counter = 0;
  getElement('.dice').style.display = 'none';
  getElement('.secondDice').style.display = 'none';
  doubleSix = 0;
  doubleActivePlayer = 0;
}

// scart game with clean table
clean();

// active table
table0 = getElement('#table0');
table1 = getElement('#table1');

// starting position
getElement('#score-0').innerHTML = 0;
getElement('#score-1').innerHTML = 0;
getElement(`#current-0`).innerHTML = 0;
getElement(`#current-1`).innerHTML = 0;

// change dice img
getElement('.btn-roll').addEventListener('click', letsPlay);

// on click event
function letsPlay() {
  genRandom();
  dice = randomNumberOne;
  secondDice = randomNumberTwo;
  getElement('.dice').style.display = 'block';
  getElement('.secondDice').style.display = 'block';
  getElement('.dice').src = `dice-${dice}.png`;
  getElement('.secondDice').src = `dice-${secondDice}.png`;

  if (dice !== 1 && secondDice !== 1) {
    diceContainer += dice;
    getElement(`#current-${counter}`).innerHTML = diceContainer;
    if (dice === 6) {
      doubleSix++;
      doubleActivePlayer++;
      if (doubleSix === 2 && doubleActivePlayer === 2) {
        getElement(`#score-${counter}`).innerHTML = 0;
        getElement(`#current-${counter}`).innerHTML = 0;
        diceContainer = 0;
        scores[counter] = 0;
        doubleSix = 0;
        doubleActivePlayer = 0;
        changePlayer();
      }
    } else {
      doubleSix = 0;
      doubleActivePlayer = 0;
    }
  } else {
    diceContainer = 0;
    doubleSix = 0;
    doubleActivePlayer = 0;
    getElement(`#current-${counter}`).innerHTML = 0;
    changePlayer();
  }

  if (counter === 0) {
    table0.className += ' active';
    table1.classList.remove("active");
  } else {
    table1.className += ' active';
    table0.classList.remove("active");
  }
};

// hold btn logic
getElement('.btn-hold').addEventListener('click', function() {
  scores[counter] += diceContainer;
  getElement(`#score-${counter}`).innerHTML = scores[counter];

  if (scores[0] >= winnerScore) {
    alert(`Player 1 is Winner! Scrore = ${scores[0]}`);
    clean();
  } else if (scores[1] >= winnerScore) {
    alert(`Player 2 is Winner! Scrore = ${scores[1]}`);
    clean();
  } else {
    getElement(`#current-${counter}`).innerHTML = 0;
    changePlayer();
    diceContainer = 0;
    letsPlay();
  }
});

// start new game
getElement('.btn-new').addEventListener('click', clean);
